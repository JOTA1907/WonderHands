# Fase 2 — Estructura de la web estática

## Objetivo

Crear una estructura pequeña y mantenible para WonderHands, compatible con GitHub Pages y sin proceso de pago.

## Organización propuesta

    docs/
      index.html
      estilos.css
      app.js
      datos/
        catalogo.json
      imagenes/
        productos/
        marca/
      .nojekyll
      README.md

El archivo catalogo.json será la fuente única para configuración pública y productos. La carpeta docs/ es la fuente publicable en la rama principal. No copies los archivos de guía ni el respaldo de la antigua skill dentro de la carpeta publicada.

## Convenciones

- HTML semántico para estructura y contenido fijo; CSS para diseño; JavaScript sin dependencias para filtros, variantes, galería y enlaces de WhatsApp.
- Los recursos se enlazan de forma relativa: ./estilos.css, ./app.js, ./datos/catalogo.json y ./imagenes/....
- El catálogo se solicita con una URL basada en document.baseURI o una ruta relativa. Evita enlaces internos que empiecen por /: fallan cuando la web se aloja bajo /repositorio/.
- Usa identificadores de producto estables y únicos. Si hay enlaces a fichas, considera anclas como #producto-id o rutas relativas que funcionen en GitHub Pages. No dependas de reescritura de rutas de servidor.
- No incluyas tokens, claves, teléfonos personales ajenos ni datos internos. El número de WhatsApp de la marca será público.
- Incluye .nojekyll en la fuente publicada si se usa publicación directa desde una rama sin Jekyll.

## Mantenimiento

El README debe explicar cómo añadir una prenda al JSON, colocar sus fotos, actualizar precio/variantes, comprobar la web y publicar. La validación debe avisar si falta algún campo obligatorio o si una ruta de imagen no existe. No dupliques textos de producto en HTML y JSON.

## Antes de escribir código

Confirma los materiales de la fase 1 y fija una ficha de estilo de la fase 3. La estructura puede ajustarse al repositorio real cuando el usuario lo comparta.
