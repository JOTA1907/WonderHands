# Fase 10 — Contrato de datos del catálogo

Este nombre de archivo se conserva para mantener las referencias entre guías. WonderHands no utiliza Shopify Admin API ni necesita una API propia. El archivo define los datos estáticos que leerá la página.

## Archivo de datos

La fuente única será docs/datos/catalogo.json cuando se publique desde docs/. Estructura mínima:

    {
      "marca": "WonderHands",
      "whatsapp": "",
      "moneda": "",
      "productos": []
    }

Los campos vacíos indican que faltan datos reales; este ejemplo no es un catálogo publicable.

## Producto

Cada entrada de productos contiene:

- id: texto corto, único y estable para enlaces y mensajes.
- nombre: nombre confirmado de la prenda.
- descripcion: información que el usuario proporcionó o aprobó.
- precio: número confirmado en la moneda global; si se muestra un precio distinto por variante, regístralo en esa variante.
- imagenes: lista de objetos con src relativo a docs/ y alt descriptivo. La primera es la imagen principal generada y aprobada; registra que es conceptual mientras no haya una foto del producto final.
- variantes: lista de combinaciones reales. Cada combinación tiene opciones como objeto de pares nombre/valor; puede llevar precio específico y disponible si el usuario confirmó ese estado. Cuando no hay opciones, usa una lista vacía y el precio del producto.

No crees automáticamente el producto cartesiano de tallas y colores: podrían existir combinaciones que la marca no ofrece. La interfaz debe derivar las opciones de las combinaciones registradas.

## Validaciones

Antes de mostrar o publicar:

1. La marca, WhatsApp y moneda existen; WhatsApp contiene solo dígitos y se confirmó que recibe mensajes.
2. Cada id es único, cada precio es un número válido y mayor o igual que cero solo si ese cero fue confirmado como precio real. Un campo ausente es distinto de cero.
3. Cada producto tiene nombre, descripción comercial aprobada, confirmación de que puede ofrecerse y al menos una imagen generada aprobada.
4. Los nombres de opción se escriben de forma consistente entre variantes del mismo producto.
5. No hay combinaciones duplicadas ni opciones vacías.
6. Si disponible es false, la interfaz informa que esa combinación no se ofrece actualmente y evita abrir la consulta como si fuera elegible.
7. La moneda se muestra con Intl.NumberFormat y el código confirmado. No se deduce por el número de WhatsApp.

## Mensaje de compra

La construcción del mensaje toma siempre la selección actual del producto visible. Incluye id, nombre y todas las opciones seleccionadas; codifica el texto para wa.me. Mantén una función única para este enlace y pruébala con tildes, espacios y caracteres especiales.

## Cambios

Para añadir o actualizar una prenda, modifica solo el catálogo y sus fotos. No copies precios ni variantes a plantillas HTML. Registra en el README cómo validar el JSON antes de publicar.
