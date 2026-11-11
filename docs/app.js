const $ = (selector) => document.querySelector(selector);
const grid = $('#catalogo-grid');
const emptyState = $('#catalogo-estado');
const catalogNote = $('#catalogo-nota');
const categoryMenus = [...document.querySelectorAll('.category-nav')];
const collectionButtons = [...document.querySelectorAll('.category-menu button')];
const dialog = $('#producto-dialogo');
let catalog = null;
let activeProduct = null;
const categorySlug = { Mujer: 'mujer', Hombre: 'hombre', 'Niños': 'ninos' };
const subcategorySlug = { 'Niño': 'nino', 'Niña': 'nina', 'Bebé': 'bebe' };

function viewFromUrl() {
  const params = new URLSearchParams(location.search);
  const category = { mujer: 'Mujer', hombre: 'Hombre', nino: 'Niños', ninos: 'Niños' }[params.get('categoria')] || 'Mujer';
  const subcategory = category === 'Niños'
    ? { nino: 'Niño', nina: 'Niña', bebe: 'Bebé' }[params.get('subcategoria')] || 'Niño'
    : null;
  const season = params.get('temporada') === 'verano' ? 'Verano' : 'Invierno';
  return { category, season, subcategory };
}

function viewForProduct(product) {
  return { category: product.categoria, season: product.temporada, subcategory: product.subcategoria || null };
}

function sameView(first, second) {
  return first.category === second.category && first.subcategory === second.subcategory && first.season === second.season;
}

function setViewUrl(url, view) {
  url.searchParams.set('categoria', categorySlug[view.category]);
  if (view.category === 'Niños') url.searchParams.set('subcategoria', subcategorySlug[view.subcategory]);
  else url.searchParams.delete('subcategoria');
  url.searchParams.set('temporada', view.season.toLowerCase());
}

let activeView = viewFromUrl();

$('#year').textContent = new Date().getFullYear();
$('#dialogo-cerrar').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  activeProduct = null;
  if (location.hash.startsWith('#producto-')) history.replaceState(null, '', `${location.pathname}${location.search}#coleccion`);
});

function imageUrl(src) {
  if (typeof src !== 'string' || !src.startsWith('./imagenes/')) return null;
  const url = new URL(src, document.baseURI);
  const base = new URL('./imagenes/', document.baseURI);
  return url.origin === base.origin && url.pathname.startsWith(base.pathname) ? url.href : null;
}

function validProduct(product) {
  if (!product || !/^[a-z0-9-]+$/.test(product.id || '') || !product.nombre?.trim() || !product.descripcion?.trim()) return false;
  if (!Object.hasOwn(categorySlug, product.categoria)) return false;
  if (product.categoria === 'Niños' ? !Object.hasOwn(subcategorySlug, product.subcategoria) : product.subcategoria != null) return false;
  if (!['Invierno', 'Verano'].includes(product.temporada)) return false;
  const hasPrice = Number.isFinite(product.precio) && product.precio >= 0;
  const unpricedConcept = product.precio == null && product.aprobado === false && product.ofrecible === false;
  if (!hasPrice && !unpricedConcept) return false;
  if (!Array.isArray(product.imagenes) || !product.imagenes.length || !product.imagenes.every(image => imageUrl(image.src) && image.alt?.trim())) return false;
  if (!Array.isArray(product.variantes)) return false;
  const keys = product.variantes.length ? Object.keys(product.variantes[0].opciones || {}).sort().join('|') : '';
  const combinations = new Set();
  for (const variant of product.variantes) {
    if (!variant.opciones || !Object.keys(variant.opciones).length || Object.keys(variant.opciones).sort().join('|') !== keys) return false;
    if (Object.values(variant.opciones).some(value => typeof value !== 'string' || !value.trim())) return false;
    if (variant.precio != null && (!Number.isFinite(variant.precio) || variant.precio < 0)) return false;
    const key = JSON.stringify(Object.entries(variant.opciones).sort());
    if (combinations.has(key)) return false;
    combinations.add(key);
  }
  return true;
}

function currency(amount) {
  try {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: catalog.moneda, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return String(amount);
  }
}

function priceText(product, amount = product.precio) {
  if (amount == null) return 'Precio por confirmar';
  return `${catalog.modoMuestra || !product.aprobado ? 'Precio de muestra · ' : ''}${currency(amount)}`;
}

function contactReady(product) {
  const approvedProduct = !catalog.modoMuestra && product.aprobado === true && product.ofrecible === true;
  const conceptualInquiry = catalog.modoMuestra && product.consultaConceptual === true && product.aprobado === false && product.ofrecible === false;
  return /^\d{8,15}$/.test(catalog.whatsapp) && Number.isFinite(product.precio) && (approvedProduct || conceptualInquiry);
}

function whatsappUrl(product, variant) {
  const details = [
    `Sección: ${[product.categoria, product.subcategoria, product.temporada].filter(Boolean).join(' / ')}`,
    product.tipo && `Prenda: ${product.tipo}`,
    product.color && `Color: ${product.color}`,
    ...Object.entries(variant?.opciones || {}).map(([name, value]) => `${name}: ${value}`)
  ].filter(Boolean).join(', ');
  const concept = catalog.modoMuestra && product.consultaConceptual === true;
  const price = variant?.precio ?? product.precio;
  const message = concept
    ? `Hola, me interesa el diseño «${product.nombre}» de WonderHands (ref. ${product.id}). ${details}. Precio de muestra: ${currency(price)}. Quisiera consultar si se puede elaborar con estas características y confirmar el precio final y la disponibilidad.`
    : `Hola, me interesa el producto «${product.nombre}» de WonderHands (ref. ${product.id}).${details ? ` ${details}.` : ''} Quisiera consultar su disponibilidad.`;
  return `https://wa.me/${catalog.whatsapp}?text=${encodeURIComponent(message)}`;
}

function showError(message) {
  emptyState.querySelector('.eyebrow').textContent = 'CATÁLOGO';
  emptyState.querySelector('h3').textContent = 'No pudimos cargar la colección.';
  emptyState.querySelector('p:last-child').textContent = message;
  emptyState.hidden = false;
  grid.hidden = true;
}

function renderCollection() {
  if (!catalog) return;
  const products = catalog.productos.filter(product => sameView(viewForProduct(product), activeView));
  $('#collection-context').textContent = [activeView.category, activeView.subcategory, activeView.season].filter(Boolean).join(' / ').toUpperCase();
  categoryMenus.forEach(menu => menu.classList.toggle('is-active', menu.dataset.navCategory === activeView.category));
  collectionButtons.forEach(button => {
    const selected = button.dataset.category === activeView.category &&
      (button.dataset.subcategory || null) === activeView.subcategory && button.dataset.season === activeView.season;
    button.setAttribute('aria-pressed', String(selected));
  });
  grid.replaceChildren(...products.map(createCard));
  grid.hidden = !products.length;
  emptyState.hidden = !!products.length;
  catalogNote.hidden = !catalog.modoMuestra || !products.length;
}

collectionButtons.forEach(button => button.addEventListener('click', () => {
  activeView = {
    category: button.dataset.category,
    season: button.dataset.season || 'Invierno',
    subcategory: button.dataset.subcategory || null
  };
  const url = new URL(location.href);
  setViewUrl(url, activeView);
  url.hash = 'coleccion';
  if (url.href !== location.href) history.pushState(null, '', url);
  renderCollection();
  categoryMenus.forEach(menu => { menu.open = false; });
  $('#collection-title').focus({ preventScroll: true });
  $('#coleccion').scrollIntoView();
}));

categoryMenus.forEach(menu => {
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  menu.addEventListener('toggle', () => {
    if (menu.open) categoryMenus.forEach(other => { if (other !== menu) other.open = false; });
  });
});
document.addEventListener('click', event => {
  if (!categoryMenus.some(menu => menu.contains(event.target))) categoryMenus.forEach(menu => { menu.open = false; });
});

function createCard(product, index) {
  const article = document.createElement('article');
  article.className = 'product-card';
  const link = document.createElement('a');
  link.href = `#producto-${product.id}`;
  link.setAttribute('aria-label', `Ver detalles de ${product.nombre}`);
  const photo = document.createElement('div');
  photo.className = 'product-photo';
  const image = document.createElement('img');
  image.src = imageUrl(product.imagenes[0].src);
  image.alt = product.imagenes[0].alt;
  image.loading = index < 2 ? 'eager' : 'lazy';
  image.width = 1024;
  image.height = 1280;
  photo.append(image);
  if (catalog.modoMuestra || !product.aprobado) {
    const badge = document.createElement('span');
    badge.className = 'product-badge';
    badge.textContent = product.temporada === 'Verano' ? 'Verano · concepto' : 'Concepto';
    photo.append(badge);
  }
  const meta = document.createElement('div');
  meta.className = 'product-meta';
  const name = document.createElement('h3');
  name.textContent = product.nombre;
  const arrow = document.createElement('span');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  meta.append(name, arrow);
  const price = document.createElement('p');
  price.className = 'product-price';
  price.textContent = `${product.tipo ? `${product.tipo} · ` : ''}${priceText(product)}`;
  link.append(photo, meta, price);
  link.addEventListener('click', (event) => {
    event.preventDefault();
    history.pushState(null, '', `#producto-${product.id}`);
    openProduct(product);
  });
  article.append(link);
  return article;
}

function showImage(product, index) {
  const image = product.imagenes[index];
  $('#dialogo-imagen').src = imageUrl(image.src);
  $('#dialogo-imagen').alt = image.alt;
  $('#dialogo-imagen-nota').hidden = !image.conceptual;
  document.querySelectorAll('#dialogo-miniaturas button').forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
}

function renderGallery(product) {
  const thumbnails = $('#dialogo-miniaturas');
  thumbnails.replaceChildren();
  thumbnails.hidden = product.imagenes.length < 2;
  product.imagenes.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Ver imagen ${index + 1} de ${product.nombre}`);
    const thumb = document.createElement('img');
    thumb.src = imageUrl(item.src);
    thumb.alt = '';
    button.append(thumb);
    button.addEventListener('click', () => showImage(product, index));
    thumbnails.append(button);
  });
  showImage(product, 0);
}

function renderOptions(product) {
  const container = $('#dialogo-opciones');
  container.replaceChildren();
  const keys = product.variantes.length ? Object.keys(product.variantes[0].opciones) : [];
  keys.forEach(key => {
    const label = document.createElement('label');
    label.className = 'option-field';
    label.textContent = key;
    const select = document.createElement('select');
    select.dataset.option = key;
    const placeholder = new Option(`Elige ${key.toLowerCase()}`, '');
    select.add(placeholder);
    const values = [...new Set(product.variantes.map(variant => variant.opciones[key]))];
    values.forEach(value => select.add(new Option(value, value)));
    select.addEventListener('change', () => updateSelection(product));
    label.append(select);
    container.append(label);
  });
  updateSelection(product);
}

function updateSelection(product) {
  const selects = [...document.querySelectorAll('#dialogo-opciones select')];
  const selected = Object.fromEntries(selects.map(select => [select.dataset.option, select.value]));
  const allSelected = selects.every(select => select.value);
  const variant = allSelected ? product.variantes.find(item => Object.entries(selected).every(([key, value]) => item.opciones[key] === value)) : null;
  const status = $('#dialogo-estado');
  const action = $('#dialogo-whatsapp');
  const help = $('#dialogo-ayuda');
  help.hidden = true;
  const price = variant?.precio ?? product.precio;
  $('#dialogo-precio').textContent = priceText(product, price);
  action.hidden = true;
  action.removeAttribute('href');

  if (!contactReady(product)) {
    status.textContent = 'Diseño conceptual: precio, variantes y disponibilidad por confirmar.';
  } else if (!selects.length) {
    status.textContent = '';
    action.href = whatsappUrl(product, null);
    action.hidden = false;
    help.hidden = false;
  } else if (!allSelected) {
    status.textContent = catalog.modoMuestra ? 'Selecciona la talla para consultar por WhatsApp.' : 'Selecciona todas las opciones para consultar.';
  } else if (!variant) {
    status.textContent = 'Esa combinación no está disponible.';
  } else if (variant.disponible === false) {
    status.textContent = 'Esa variante no se ofrece actualmente.';
  } else {
    status.textContent = catalog.modoMuestra ? 'Diseño conceptual: confirma el precio final y la disponibilidad por WhatsApp.' : '';
    action.href = whatsappUrl(product, variant);
    action.hidden = false;
    help.hidden = false;
  }
}

function openProduct(product) {
  activeProduct = product;
  $('#dialogo-titulo').textContent = product.nombre;
  $('#dialogo-descripcion').textContent = product.descripcion;
  renderGallery(product);
  renderOptions(product);
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
}

function openFromHash() {
  if (!catalog) return;
  const id = location.hash.match(/^#producto-([a-z0-9-]+)$/)?.[1];
  const product = catalog.productos.find(item => item.id === id);
  if (product) {
    const productView = viewForProduct(product);
    if (!sameView(activeView, productView)) {
      activeView = productView;
      const url = new URL(location.href);
      setViewUrl(url, activeView);
      history.replaceState(null, '', url);
      renderCollection();
    }
    openProduct(product);
  }
  else if (dialog.open) dialog.close();
}

window.addEventListener('hashchange', openFromHash);
window.addEventListener('popstate', () => {
  activeView = viewFromUrl();
  renderCollection();
  openFromHash();
});

async function loadCatalog() {
  try {
    const response = await fetch(new URL('./datos/catalogo.json', document.baseURI));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.marca !== 'WonderHands' || !Array.isArray(data.productos)) throw new Error('Formato de catálogo inválido');
    const ids = new Set();
    const products = data.productos.filter(product => {
      const valid = validProduct(product) && !ids.has(product.id);
      if (valid) ids.add(product.id);
      else console.warn('Producto omitido por datos incompletos o duplicados:', product?.id);
      return valid;
    });
    catalog = { ...data, productos: products };
    if (data.productos.length && !products.length) {
      showError('Los productos tienen datos incompletos. Revisa el archivo del catálogo.');
      return;
    }
    const contact = $('#contacto-whatsapp');
    if (/^\d{8,15}$/.test(catalog.whatsapp)) {
      contact.href = `https://wa.me/${catalog.whatsapp}`;
      contact.hidden = false;
      const phone = catalog.whatsapp.replace(/^51(\d{3})(\d{3})(\d{3})$/, '+51 $1 $2 $3');
      $('#contacto-texto').textContent = `¿Tienes alguna pregunta? Escríbenos por WhatsApp al ${phone}.`;
    }
    if (products.length) {
      renderCollection();
      openFromHash();
    }
  } catch (error) {
    console.error('No se pudo cargar el catálogo:', error);
    showError('Intenta actualizar la página en unos momentos.');
  }
}

loadCatalog();
