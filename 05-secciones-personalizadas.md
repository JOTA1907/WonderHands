# Fase 5 — Construir las secciones de WonderHands

## Objetivo

Crear una interfaz atractiva, adaptable y fácil de mantener con HTML, CSS y JavaScript sencillos. Las secciones toman los productos del catálogo real. No se utiliza Liquid, Dawn ni el editor de Shopify.

## Componentes

- Cabecera: marca, enlace al catálogo y contacto.
- Apertura: mensaje de la marca e imagen aprobada, con alternativa tipográfica si no hay foto apropiada.
- Catálogo: tarjetas con foto, nombre, precio y enlace a la ficha.
- Vista de producto: galería, descripción, precio, variantes y acción Consultar por WhatsApp.
- Bloque artesanal: texto confirmado por el usuario, sin hechos añadidos.
- Pie: contacto y enlaces relevantes.

Usa solo los componentes que tengan contenido real. El catálogo se pinta desde datos/catalogo.json; la ficha y la tarjeta no deben contener copias separadas de precio o variantes.

## Diseño adaptable

- Diseña primero para una pantalla pequeña y amplía la composición con CSS.
- Usa retículas fluidas y tamaños de texto con límites; evita anchos fijos que provoquen desplazamiento horizontal.
- Mantén botones y selectores fáciles de tocar en celular.
- Reserva el espacio de cada foto con aspect-ratio o dimensiones declaradas para reducir saltos de página.
- Para fotos de prendas, usa object-fit: contain cuando un recorte ocultaría detalles; object-fit: cover solo si el encuadre fue revisado.
- El texto sobre una imagen necesita contraste suficiente. Si una foto no deja espacio legible, coloca el texto fuera de ella.
- El color de fondo y los espaciados de cada sección deben formar una transición visual coherente.

## Accesibilidad

Usa encabezados en orden, enlaces y botones con nombres claros, etiquetas de formulario visibles, foco perceptible y texto alternativo específico para las fotos. El selector de variantes debe poder usarse con teclado. Respeta prefers-reduced-motion y evita que el contenido dependa de animaciones para ser visible.

## Comportamiento

- Carga el catálogo una vez y muestra un aviso comprensible si no puede cargarse.
- No inventes tarjetas de ejemplo en la página publicada.
- Cuando cambie una variante, actualiza el precio mostrado si el catálogo incluye precio particular y prepara el mensaje de WhatsApp con la selección actual.
- Si una combinación no existe o está marcada como no disponible, no ofrezcas su consulta como compra de esa variante.
- El botón de WhatsApp se genera con el número y datos del catálogo, nunca con un mensaje fijo separado que pueda quedar desactualizado.

## Rendimiento

Usa tamaños de imagen adecuados, carga diferida para fotos fuera de la primera pantalla y evita bibliotecas pesadas para tareas que resuelve JavaScript nativo. Las animaciones, si se usan, deben ser discretas y no bloquear la interacción.

## Verificación

Revisa escritorio y celular, con y sin imágenes largas, un producto de una sola variante y otro con varias opciones si el catálogo los incluye. Comprueba que no hay contenido recortado ni desplazamiento horizontal.
