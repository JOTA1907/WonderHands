# WonderHands — sitio estático

La web está lista para servirse desde `docs/` en GitHub Pages. No necesita compilación ni dependencias. El catálogo y la configuración pública viven en `datos/catalogo.json`.

## Estado de esta versión

Los cuatro diseños, sus imágenes generadas con IA, textos, tallas y precios son **muestras sintéticas** creadas para revisar la web. No describen productos confirmados. Por eso `modoMuestra` es `true`, cada producto tiene `aprobado: false` y `ofrecible: false`, y los enlaces de consulta por WhatsApp están desactivados. Las imágenes se identifican como conceptuales en la ficha.

## Probar localmente

Desde la raíz del repositorio, inicia el servidor local con Node:

```powershell
node scripts/serve.mjs
```

Abre la URL que imprima el servidor. El prefijo `/WonderHands/` simula GitHub Pages. No abras `index.html` con `file://`, porque el navegador puede bloquear la lectura del JSON.

## Actualizar el catálogo

Edita `datos/catalogo.json` y conserva esta estructura:

```json
{
  "marca": "WonderHands",
  "whatsapp": "NUMERO_REAL_CON_CODIGO",
  "moneda": "PEN",
  "modoMuestra": false,
  "productos": [
    {
      "id": "identificador-estable",
      "nombre": "Nombre confirmado",
      "tipo": "Tipo de prenda",
      "descripcion": "Descripción confirmada",
      "precio": 100,
      "aprobado": true,
      "ofrecible": true,
      "imagenes": [
        {"src": "./imagenes/productos/foto.jpg", "alt": "Descripción específica de la imagen", "conceptual": false}
      ],
      "variantes": [
        {"opciones": {"Talla": "S", "Color": "Marfil"}, "disponible": true},
        {"opciones": {"Talla": "M", "Color": "Marfil"}, "disponible": true, "precio": 110}
      ]
    }
  ]
}
```

Sustituye el marcador por el número real de WonderHands con código de país, solo dígitos, y comprueba que recibe mensajes. `moneda` debe ser el código ISO confirmado. Cada variante es una combinación real; no se generan todas las combinaciones posibles. Si una prenda no tiene variantes, usa `"variantes": []`. Para un producto aprobado, fija `modoMuestra: false`, `aprobado: true` y `ofrecible: true` solo después de verificar nombre, descripción, precio, imágenes y disponibilidad. Si una imagen sigue siendo conceptual, conserva `"conceptual": true`.

Las tarjetas y fichas leen el mismo archivo; no dupliques precios ni descripciones en `index.html`. Coloca las imágenes dentro de `imagenes/productos/`, con nombres legibles y comprimidas. No cambies el `id` de un producto publicado porque forma parte de su enlace y del mensaje de WhatsApp.

## Verificar antes de publicar

1. Revisa cada dato comercial y cada imagen con WonderHands.
2. Comprueba que los archivos indicados en `imagenes[].src` existen dentro de `docs/`.
3. Prueba la vista en celular y escritorio, abre cada ficha, selecciona las variantes y verifica el mensaje de WhatsApp sin enviarlo.
4. Prueba la web bajo una ruta con prefijo como `/WonderHands/`, no solo en la raíz del servidor. Todas las rutas de recursos son relativas.
5. En GitHub, publica la carpeta `/docs` de la rama principal en **Settings → Pages → Deploy from a branch**.

Las imágenes de muestra están en `imagenes/productos/`. Fueron generadas con la herramienta integrada de imágenes a partir de los conceptos Nube, Raíz, Trama y Alba de `PROPUESTA-CONCEPTOS.md`; no representan prendas físicas verificadas.
