PROYECTO FINAL PARA EL CURSO DE JAVASCRIPT DE CODERHOUSE

Simulador para contratar excursiones destinado a visitantes de la ciudad de Paraná, Entre Ríos, Argentina.

Se presentan las siguientes validaciones:
-	Inicialmente, chequea que la API que devuelve las excursiones disponibles esté funcional (alerta al usuario si existe alguna falla). Incluí esto, debido a que en ocasiones fallaba la API y dejaba en el storage un array undefined, por ende, no corregía aunque recargaba la página.
-	No permite el ingreso al sitio si no se ha ingresado el nombre de usuario.
-	Si ya existe un login previo, expone el usuario logueado y todo lo que haya hecho hasta entonces. Solo al “Salir” o “Contratar”, vuelve a iniciar.
-	Si el usuario agregó todas las excursiones disponibles, le informa dicha situación.
-	Si el usuario no agregó ninguna excursión, en la sección “Mi Lista”, aparece dicha información. En este caso, además, oculta los botones “Vaciar Lista” y “Contratar”.
-	Al contratar, desaparece el botón “Mi Lista” y “Salir”, dando por finalizada la sesión e impidiendo la edición del paquete contratado.

Recursos utilizados:
-	Mockapi
-	Sweet Alert
-	Bootstrap
-	Uiverse.io
