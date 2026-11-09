# Solución de problemas — WonderHands

Consulta esta guía cuando una comprobación concreta falle. Registra el síntoma, la causa encontrada y la corrección; no conviertas errores de Shopify de los documentos originales en tareas de este proyecto.

## La página aparece vacía

- Comprueba que index.html está en la raíz de la carpeta que GitHub Pages publica.
- Si el catálogo usa fetch y se abrió el archivo mediante file://, usa un servidor HTTP local.
- Revisa la consola del navegador y comprueba que datos/catalogo.json existe y es JSON válido.
- Muestra un aviso visible al visitante si los datos no pueden cargarse, en vez de dejar la página en blanco.

## Imágenes o estilos no cargan en GitHub Pages

- Comprueba mayúsculas, minúsculas, espacios y extensión exacta del archivo. GitHub Pages distingue el nombre real del archivo.
- Usa rutas relativas desde el documento, como ./imagenes/productos/archivo.jpg.
- Reproduce la URL pública con el prefijo /repositorio/; las rutas que empiezan por / apuntan a la raíz del dominio y suelen fallar en sitios de proyecto.
- Comprueba que la imagen está dentro de la fuente publicada, no solo en la carpeta de trabajo.

## El botón de WhatsApp falla

- El número debe incluir código de país y solo dígitos, sin + ni espacios.
- Verifica que el enlace comienza por https://wa.me/NUMERO?text=.
- Codifica el mensaje con encodeURIComponent para preservar espacios, tildes y símbolos.
- Comprueba que nombre, identificador y variantes vienen de la ficha actual, no de un texto fijo antiguo.
- Si el chat se abre sin mensaje, inspecciona el parámetro text. Si no se abre, verifica con el usuario que el número tiene WhatsApp activo.

## Variante o precio incorrectos

- Deriva los selectores de combinaciones reales del catálogo.
- Al cambiar una opción, busca la variante correspondiente antes de activar el botón.
- Muestra el precio de la variante si difiere del precio principal.
- Si faltan datos, detén esa acción y señala la carencia. No completes combinaciones ni precios por deducción.

## Las imágenes de IA parecen productos diferentes

- Compara cada imagen con la ficha visual aprobada: cuello, silueta, patrón, color y detalles.
- Usa una imagen principal aprobada como referencia al generar vistas adicionales.
- Rechaza errores de anatomía, tejido o accesorios que cambien entre vistas.
- Si no se puede representar la prenda de forma coherente, usa la imagen solo como pieza editorial y no como vista comercial.

## Problemas visuales

- Desplazamiento horizontal en celular: revisa anchos fijos, imágenes y elementos decorativos.
- Prenda recortada: cambia a object-fit: contain o usa una imagen adecuada, después revisa la tarjeta y la ficha.
- Texto ilegible sobre foto: traslada el texto o usa un fondo de contraste.
- Contenido invisible: comprueba si una animación lo oculta cuando JavaScript falla o el usuario reduce el movimiento.

## Publicación incompleta

Comprueba Settings → Pages y la ejecución de publicación del repositorio. Verifica que la rama y la carpeta elegidas existen y contienen index.html. La URL puede tardar unos minutos en reflejar la subida; usa la URL indicada por Pages para confirmar el resultado.
