---
name: wonderhands-github-pages-whatsapp
description: Guía de trabajo para diseñar, construir, verificar y mantener WonderHands, un catálogo de ropa tejida a mano publicado en GitHub Pages con consultas de compra por WhatsApp.
---

# WonderHands — guía principal

## Alcance

WonderHands es un escaparate estático para mostrar ropa tejida a mano. La compra comienza en WhatsApp con un mensaje que identifica el producto y las variantes elegidas. No hay carrito, cobro, cuentas de clientes ni integración con Shopify. El catálogo visual se diseñará desde cero y sus imágenes se generarán con IA; cada diseño debe ser revisado por el usuario antes de presentarse como producto.

Los requisitos expresos del usuario prevalecen sobre este documento. Nunca reutilices nombres, precios, fotos, plazos, materiales o promesas del ejemplo HSTLRS incluido en el respaldo original. No inventes datos de productos.

## Orden de trabajo

1. Lee 00-entorno.md y comprueba el contenido real de la carpeta.
2. Usa 01-conexion-y-sondeo.md para reunir los datos indispensables. La primera propuesta está en PROPUESTA-CONCEPTOS.md y sigue pendiente de revisión. No conviertas una propuesta en característica comercial confirmada. Antes de implementar, presenta las carencias concretas al usuario.
3. Sigue 03-lectura-de-referencias.md para definir la dirección visual a partir de la marca y de las imágenes que se generen. Usa 04-brief-y-propuesta.md para ordenar la página.
4. Prepara la estructura estática de 02-proyecto-tema.md. Implementa las secciones con 05-secciones-personalizadas.md, el catálogo con 07-catalogo-producto-y-paginas.md y los bloques pertinentes de 11-catalogo-bloques-moda.md.
5. Usa 06-fotos-ia-moda.md para planear imágenes generadas con IA a partir de conceptos aprobados. Mantén una representación coherente de cada prenda y distingue la imagen conceptual de una fotografía del producto final.
6. Aplica los criterios de revisión de 08-publicacion.md y consulta 09-solucion-problemas.md y 13-lecciones-y-recetas.md cuando corresponda.
7. Usa 10-admin-api.md para el contrato de datos estáticos; su nombre se conserva del material original, pero no requiere Shopify. Usa 12-ejemplo-hstlrs.md como ejemplo de verificación sin copiar contenido ajeno.

## Datos indispensables

- WhatsApp de WonderHands en formato internacional, con código de país, y confirmación de que recibe mensajes.
- Por cada producto aprobado: nombre, descripción comercial confirmada, precio y moneda, variantes que realmente se ofrecerán y confirmación de que la prenda puede elaborarse o venderse.
- Imágenes conceptuales generadas para cada diseño y relación explícita entre cada imagen y su producto. Antes de usarlas como representación de venta, el usuario revisa su fidelidad al diseño aprobado.
- Identidad visual existente, si la hay. Si no la hay, se puede proponer una dirección visual, pero no atribuir a la marca una historia o características no confirmadas.

La cuenta o el repositorio de GitHub se necesitan para publicar, no para empezar a programar. Pide su enlace cuando llegue la fase de publicación si el usuario quiere que la realices.

## Decisiones técnicas

- Web estática sin proceso de compilación obligatorio: HTML, CSS, JavaScript y un archivo de datos del catálogo. La fuente prevista es docs/ en la rama principal de GitHub Pages.
- Rutas relativas para CSS, JavaScript, imágenes y catálogo. No usar rutas que empiecen por / para recursos internos, pues un sitio de proyecto vive bajo /nombre-del-repositorio/.
- Un único origen de verdad para productos y configuración. Las tarjetas y fichas se generan desde esos datos.
- El enlace de compra se construye con https://wa.me/ seguido del número internacional en dígitos y el parámetro text codificado con encodeURIComponent. El mensaje incluye nombre del producto, identificador y cada opción seleccionada.
- Si faltan datos reales, no mostrar un producto como comprable. Los conceptos propuestos no se convierten en hechos hasta que el usuario los aprueba. No usar precios ficticios ni texto que implique disponibilidad sin confirmación.
- Diseño adaptable a celular, navegación accesible, imágenes optimizadas y controles utilizables con teclado.

## Resultado esperado

Código listo para GitHub Pages, catálogo sencillo de actualizar, enlaces de WhatsApp verificados, revisión de rutas bajo la carpeta de un repositorio, e instrucciones claras para publicar y cambiar productos.

## Fuentes operativas

- Publicación de GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Enlaces de WhatsApp: https://faq.whatsapp.com/5913398998672934
