# WonderHands — sitio estático

La web está lista para servirse desde `docs/` en GitHub Pages. No necesita compilación ni dependencias. El catálogo y la configuración pública viven en `datos/catalogo.json`.

## Estado de esta versión

Los 40 diseños y sus imágenes son **propuestas visuales** creadas para revisar la web. Hay colecciones de Mujer, Hombre y Niños. Dentro de Niños están Niño, Niña y Bebé, cada uno con Invierno y Verano. Cada vista muestra cuatro prendas. No describen productos confirmados. Los precios y tallas del catálogo son ejemplos. `modoMuestra` es `true` y cada producto tiene `aprobado: false` y `ofrecible: false`. Las fichas permiten enviar una consulta por WhatsApp después de elegir talla, sin afirmar disponibilidad ni precio final. El contacto general por WhatsApp también está activo. Las imágenes se identifican como referencias visuales en la ficha.

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
      "categoria": "Mujer",
      "temporada": "Invierno",
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

Las tarjetas y fichas leen el mismo archivo; no dupliques precios ni descripciones en `index.html`. Cada producto debe tener `categoria` (`Mujer`, `Hombre` o `Niños`) y `temporada` (`Invierno` o `Verano`). Los productos de `Niños` también deben tener `subcategoria` (`Niño`, `Niña` o `Bebé`). Los menús del encabezado filtran por sección, subsección y temporada, y conservan la selección en la URL. Coloca las imágenes dentro de `imagenes/productos/`, con nombres legibles y comprimidas. No cambies el `id` de un producto publicado porque forma parte de su enlace y del mensaje de WhatsApp.

## Verificar antes de publicar

1. Revisa cada dato comercial y cada imagen con WonderHands.
2. Comprueba que los archivos indicados en `imagenes[].src` existen dentro de `docs/`.
3. Prueba la vista en celular y escritorio, abre cada ficha, selecciona las variantes y verifica el mensaje de WhatsApp sin enviarlo.
4. Prueba la web bajo una ruta con prefijo como `/WonderHands/`, no solo en la raíz del servidor. Todas las rutas de recursos son relativas.
5. En GitHub, publica la carpeta `/docs` de la rama principal en **Settings → Pages → Deploy from a branch**.

Las imágenes de muestra están en `imagenes/productos/`. Las cuatro imágenes iniciales se documentan en `IMAGENES-CONCEPTUALES.md`, las cuatro de verano para Mujer en `VERANO-CONCEPTOS.md`, las veinte anteriores de Hombre, Niño y Bebé en `HOMBRE-NINO-BEBE-CONCEPTOS.md` y las doce nuevas de Niña y Bebé en `NINA-Y-BEBE-CONCEPTOS.md`; no representan prendas físicas verificadas. Los conceptos sin precio pueden usar `"precio": null` únicamente mientras `aprobado` y `ofrecible` sean `false`. `consultaConceptual: true` habilita la consulta de una propuesta aunque el catálogo siga en modo muestra; el mensaje indica que el precio mostrado es referencial y pide confirmar la disponibilidad.
