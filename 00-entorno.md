# Fase 0 — Entorno y límites del proyecto

## Objetivo

Preparar una web estática de WonderHands que funcione en GitHub Pages. La carpeta actual puede contener solo documentación. Antes de instalar o crear archivos, inventaria lo que existe y verifica si hay un repositorio de Git.

## Comprobaciones

- Lista archivos y subcarpetas; localiza fotos, logo, catálogo y referencias. No trates los ejemplos HSTLRS como material de WonderHands.
- Comprueba si Git está disponible cuando toque publicar. HTML, CSS y JavaScript sin compilación no requieren Node ni Shopify CLI.
- Si se necesitan pruebas automatizadas, usa una herramienta que ya esté instalada; evita añadir dependencias sin necesidad.
- Nunca solicites una cuenta Shopify, una clave de OpenAI o permisos de una tienda para esta web.

## Forma de trabajo

El código de la web se mantendrá en docs/. En su raíz habrá index.html. Los documentos de trabajo quedan fuera de esa carpeta. GitHub Pages publicará /docs de la rama principal, salvo que el repositorio del usuario ya tenga otra estructura que debamos respetar.

Para comprobar el sitio localmente, sirve la carpeta publicada con un servidor HTTP sencillo. No confíes en abrir index.html mediante file:// si el catálogo se carga desde un JSON con fetch, pues algunos navegadores lo bloquean.

## Salida de esta fase

Inventario del material, lista concreta de datos que faltan y decisión de estructura de publicación. El proyecto puede avanzar al diseño visual sin cuenta de GitHub, pero la implementación de productos comprables espera un número de WhatsApp y un catálogo confirmado.
