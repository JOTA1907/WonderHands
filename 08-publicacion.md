# Fase 8 — Verificar y publicar en GitHub Pages

## Antes de publicar

1. Verifica que la carpeta publicable contiene index.html, CSS, JavaScript, catálogo e imágenes referenciadas.
2. Comprueba que no entraron archivos privados, copias del material original, claves ni el respaldo de las guías antiguas.
3. Revisa productos, precios, moneda, fotos, variantes y número de WhatsApp contra lo confirmado por el usuario.
4. Abre la web mediante un servidor HTTP local y prueba escritorio y celular.
5. Prueba la web también bajo una ruta con prefijo de repositorio, porque un sitio de proyecto se sirve desde /repositorio/. Todas las rutas internas deben ser relativas.
6. Revisa cada enlace de WhatsApp y el mensaje codificado. Abrir el chat no envía automáticamente el mensaje.

## Publicación simple desde una rama

GitHub Pages permite usar la raíz o /docs de una rama. Para este proyecto se recomienda mantener la web en docs/ y publicar desde main, carpeta /docs, si el repositorio lo permite.

1. Crea o elige un repositorio de GitHub.
2. Sube los archivos de la web dentro de docs/.
3. En el repositorio, abre Settings → Pages.
4. En Build and deployment, elige Deploy from a branch; selecciona main y /docs; guarda.
5. Espera a que Pages muestre la URL, ábrela y repite las pruebas de rutas, imágenes y WhatsApp en la URL pública.

Si el usuario prefiere una rama o estructura distinta, adapta la carpeta, pero conserva index.html en la raíz de la fuente publicada. No añadas una herramienta de compilación solo para desplegar HTML, CSS y JavaScript.

## Revisión visual

Comprueba portada, catálogo, fichas y pie en escritorio y en un celular. Verifica que imágenes y textos no se cortan, que los controles se pueden tocar y usar con teclado, y que no hay desplazamiento horizontal. Revisa al menos una opción de cada tipo de variante presente.

## Actualizaciones

Edita datos/catalogo.json para productos, precios y variantes; añade o sustituye imágenes en docs/imagenes; comprueba localmente; sube los cambios a la misma rama. Pages publicará los cambios de la fuente configurada. Tras cada actualización, revisa la URL pública.

## Fuentes oficiales

- Configuración de la fuente: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Crear un sitio y archivo de entrada: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Enlaces de WhatsApp: https://faq.whatsapp.com/5913398998672934
