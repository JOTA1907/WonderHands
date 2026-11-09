# Fase 7 — Catálogo, fichas y enlace de compra

## Objetivo

Mostrar los productos reales de WonderHands con fotos, descripciones, precios y variantes disponibles. Cada producto tiene una acción que abre el WhatsApp de la marca con un mensaje predefinido. No hay carrito ni pago en la web.

## Fuente única de datos

Mantén la configuración pública y los productos en datos/catalogo.json. Estructura prevista:

- Configuración: nombre de marca, número de WhatsApp en formato internacional de solo dígitos, moneda y, si procede, texto de presentación confirmado.
- Producto: id estable, nombre, descripción, precio numérico confirmado, imágenes locales, texto alternativo de cada imagen y variantes.
- Variante: conjunto de opciones (por ejemplo Talla y Color), disponibilidad confirmada y precio propio solo cuando difiera del precio principal.

La implementación debe validar campos obligatorios y evitar publicar datos de ejemplo. Si no hay variantes, la ficha no muestra un selector vacío. Si existen, los valores se derivan de combinaciones reales. Un nombre de archivo de imagen se registra una sola vez por producto y se reutiliza en tarjeta y galería.

## Tarjeta de catálogo

La tarjeta muestra imagen principal, nombre, precio con la moneda correcta y un enlace a la ficha. Las categorías y filtros se añaden solo si ayudan a explorar un catálogo suficientemente amplio y si están sustentados por datos reales.

## Ficha de producto

- Galería de fotos reales; funciona con una foto o con varias.
- Nombre, precio y descripción fieles al catálogo.
- Selectores de talla, color u otra opción solo cuando existan.
- Selección clara de la combinación disponible. Si una variante tiene un precio distinto, actualiza el precio visible.
- Botón Consultar por WhatsApp junto a las opciones. Si falta una selección obligatoria, pide elegirla antes de abrir el enlace.

No declares stock, plazos, cuidado o composición si el usuario no los confirmó. No muestres reseñas sin reseñas reales y permiso para publicarlas.

## Mensaje y enlace de WhatsApp

El mensaje debe identificar la intención del cliente y el producto. Fórmula:

    Hola, me interesa el producto «NOMBRE» de WonderHands (ref. ID). Variante: Talla VALOR, Color VALOR. Quisiera consultar su disponibilidad.

Incluye únicamente opciones que tenga el producto y valores seleccionados. La palabra disponibilidad expresa una consulta, no una promesa de stock. Si no hay variantes, omite la frase de variante. La URL se forma como:

    https://wa.me/NUMERO?text=MENSAJE_CODIFICADO

NUMERO contiene solo dígitos y el mensaje se codifica con encodeURIComponent. Usa target="_blank" y rel="noopener noreferrer" si abres una pestaña nueva. El texto visible del botón y su nombre accesible deben explicar que se abrirá WhatsApp.

## Verificación obligatoria

Para cada producto, comprueba que la tarjeta llega a la ficha correcta y que el mensaje incluye el nombre y la variante elegida. Prueba caracteres como tildes y espacios. Comprueba también una prenda sin variantes, una variante agotada si existe y precios diferentes por variante si se proporcionaron.
