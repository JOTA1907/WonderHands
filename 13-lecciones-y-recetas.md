# Fase 13 — Lecciones para implementar y mantener WonderHands

## Cambios del usuario

Una corrección sobre precio o variante se aplica en la fuente única de datos. Una corrección de diseño puede exigir regenerar las imágenes relacionadas para mantener coherencia. Después se verifica la tarjeta, la ficha y el enlace de WhatsApp. Anota en el README cualquier regla de mantenimiento que haya cambiado.

## Diseño adaptable

- En celular, prioriza foto, nombre, precio, variantes y botón de consulta. La información adicional debe seguir siendo accesible sin ocultar la acción principal.
- Usa unidades fluidas y puntos de ajuste según el contenido real, no únicamente según un dispositivo concreto.
- Evita desplazamiento horizontal en toda la página; una galería o tabla interna puede desplazarse si lo anuncia claramente.
- Muestra foco visible y controles suficientemente grandes para tocar.
- Si hay movimiento, respeta prefers-reduced-motion. El contenido debe ser visible aunque falle JavaScript.

## Fotografías

- La imagen principal generada debe mostrar el diseño completo o su parte más relevante de manera inequívoca.
- Revisa recortes en tarjetas y portada tanto en escritorio como en celular.
- Mantén texto alternativo útil y nombres de archivo legibles.
- Optimiza dimensiones y peso, conservando una calidad suficiente para apreciar tejido y detalles.
- Revisa que todas las vistas de una prenda mantengan la misma silueta, patrón, color y detalles aprobados.
- Identifica las imágenes conceptuales; no las presentes como prueba de una prenda física o de un proceso de fabricación.

## Catálogo

- Los datos de precio y variantes se toman de un solo archivo.
- Una variante se identifica por la combinación completa de opciones. No deduzcas stock de otras combinaciones.
- Si hay precios por variante, la pantalla y el mensaje corresponden a la variante elegida.
- No muestres un estado de agotado si no está confirmado.
- No escribas una promesa de envío o un material en el texto genérico del sitio.

## WhatsApp

- El enlace usa el número internacional de la marca en dígitos.
- El mensaje se compone al momento del clic a partir del producto y las opciones actuales.
- Las tildes y signos se codifican antes de añadirlos a la URL.
- El chat abierto no equivale a un pedido enviado; la redacción del botón debe describir una consulta.

## GitHub Pages

- Un sitio de proyecto vive bajo un prefijo /repositorio/. Usa rutas relativas en HTML, CSS, JavaScript y JSON.
- El documento de entrada debe estar en la raíz de la carpeta publicada.
- Tras cambiar el catálogo o las imágenes, comprueba primero localmente y luego en la URL pública.
- Mantén fuera de la carpeta publicada los documentos de trabajo y el respaldo de la skill Shopify.

## Criterios para terminar

La web muestra diseños aprobados que WonderHands confirmó que puede ofrecer, sus datos coinciden con el catálogo comercial confirmado, las imágenes conceptuales se identifican, las variantes funcionan, los mensajes de WhatsApp son precisos, la versión móvil es usable y las rutas cargan bajo el prefijo de GitHub Pages. Entrega instrucciones de actualización breves para la persona que mantendrá el catálogo.
