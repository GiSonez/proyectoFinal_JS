// INICIALIZAR ARRAYS Y VARIABLES ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

let arrayExcursiones = [];
let arrayUsuario = [];
let arrayDefault;
let usuarioAccedido;

let usuario;
let botonMiLista;
let botonSalir;
let inicio;
let menu;
let principal;
let miLista;
let nombreUsuario;
let formulario;
let botonContratar;
let botonVaciar;
let botonFinalizar;
let modalExcursiones;
let totalLista;
let resumenCompra;
let modalResumen;
let totalResumen;
let MiListaBotonAgregar;
let modalResumenLabel;

// ==================================== FUNCIONES AUXILIARES =================================================

// ENLAZAR ID DEL DOM ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function enlazarDom() {
    usuario = document.getElementById("usuario");
    botonMiLista = document.getElementById("botonMiLista");
    botonSalir = document.getElementById("botonSalir");
    inicio = document.getElementById("inicio");
    menu = document.getElementById("menu");
    principal = document.getElementById("principal");
    miLista = document.getElementById("miLista");
    nombreUsuario = document.getElementById("nombreUsuario");
    formulario = document.getElementById("formulario");
    botonContratar = document.getElementById("botonContratar");
    botonVaciar = document.getElementById("botonVaciar");
    botonFinalizar = document.getElementById("botonFinalizar");
    modalExcursiones = new bootstrap.Modal(document.getElementById("modalExcursiones"));
    totalLista = document.getElementById("totalLista");
    resumenCompra = document.getElementById("resumenCompra");
    modalResumen = new bootstrap.Modal(document.getElementById("modalResumen"));
    totalResumen = document.getElementById("totalResumen");
    MiListaBotonAgregar = document.getElementById("MiListaBotonAgregar");
    modalResumenLabel = document.getElementById("modalResumenLabel");
}

// OBTENER EXCURSIONES DE LA API |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function excursionesApi(){
    fetch("https://634413ca2dadea1175b45887.mockapi.io/excursiones/excursiones")
    .then((response) => response.json())
    .then((data) => arrayDefault = [...data])
    .catch(() => mensajeErrorConexion())
}

// // // MENSAJE ERROR DE CONEXION |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function mensajeErrorConexion(){
    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        position: 'center',
        icon: 'error',
        title: `Disculpas, tenemos un error de conexión.`,
        text: '¡Volvé a intentarlo!',
        showConfirmButton: true,
        confirmButtonColor: '#AFCF48',
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            location.reload();
        }
      })
}

// VALIDAR SESION ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function validarSesion(){
    if (localStorage.getItem("usuarioAccedido")){
        inicio.hidden = true; 
        usuario.hidden = false;
        nombreUsuario = localStorage.getItem("usuarioAccedido");
        nombreSesion.innerHTML = nombreUsuario;
    }
}

// VALIDAR MI LISTA ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function validarMiLista(){
    arrayUsuario = localStorage.getItem("arrayUsuario")
    if(arrayUsuario){
        arrayUsuario = JSON.parse(arrayUsuario);
        miListaFn(miLista);
        listarExcursiones();
    } else arrayUsuario = [];
}

// VALIDAR EXCURSIONES DISPONIBLES |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function validarDisponibles() {
    arrayExcursiones = localStorage.getItem("arrayExcursiones");
    if(arrayExcursiones){
        arrayExcursiones =  JSON.parse(arrayExcursiones);
        excursionesDisponibles(principal);
        listarExcursiones();
    }
}

// VALIDAR FORMULARIO DE INGRESO DE USUARIO ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function validarFormulario(e) {
    e.preventDefault();
    usuarioAccedido = nombreUsuario.value.toUpperCase();
    localStorage.setItem("usuarioAccedido",usuarioAccedido);
    mensajeBienvenida(usuarioAccedido)
    storageArrays();
    validarSesion();
    validarDisponibles();
    validarMiLista();
    }

// // // MENSAJE BIENVENIDA ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function mensajeBienvenida(usuario){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
        })
        
        Toast.fire({
        icon: 'success',
        title: `Bienvenid@ ${usuario}`
        });    
}

// FUNCIÓN BOTON SALIR CON ALERTA DE SEGURIDAD |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function salir(){
    Swal.fire({
        position: 'top',
        title: '¿Realmente deseas salir?',
        text: "Se eliminará tu sesión y excursiones elegidas",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#AFCF48',
        cancelButtonColor: '#CD8576',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            location.reload();
        }
      })
}

// FUNCIÓN QUE LISTE LAS EXCURSIONES DISPONIBLES Y EN MILISTA ||||||||||||||||||||||||||||||||||||||||||||||||

function listarExcursiones () {
    principal.innerHTML ="";
    if(arrayExcursiones.length === 0){
        (principal.innerHTML = "<h4>Felicidades!! <br> Ya agregaste todas las excursiones disponibles. ¡Dirigite a 'Mi Lista' y finalizá tu contratación!</h4>");
        MiListaBotonAgregar.hidden = true;
    } 
    if(arrayExcursiones.length > 0) {
        excursionesDisponibles(principal);
        MiListaBotonAgregar.hidden = false;
    } 
      
    miLista.innerHTML ="";
    if(arrayUsuario.length === 0) {
        (miLista.innerHTML = "<h5>Tu lista de excursiones está vacía. ¡Agregá tus excursiones favoritas!</h5>");
        botonContratar.hidden = true;
        botonVaciar.hidden = true;
    }
    if(arrayUsuario.length > 0){
        miListaFn(miLista);
        botonContratar.hidden = false;
        botonVaciar.hidden = false;
    } 
  }

// // // GENERAR CARDS DE EXCURSIONES DISPONIBLES ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function excursionesDisponibles(etiquetaHTML){
    arrayExcursiones.sort(function(a, b){return a.posicion - b.posicion}); 
    menu.hidden = false;
    arrayExcursiones.forEach((excursion) => {
    let cardExcursiones = document.createElement("div");
    cardExcursiones.id = `${excursion.id}`;
    cardExcursiones.className = "col-sm-12 col-md-6 col-lg-4";
    cardExcursiones.innerHTML = `
                        <div class="card w-75 cardExcursion mx-auto d-block">
                                        <div class="content">
                                        <div class="content-overlay"></div>
                                        <img src="img/${excursion.id}.webp" class="card-img-top" alt="${excursion.nombre}">
                                        <div class="content-details fadeIn-bottom">
                                        <h3 class="content-title">${excursion.nombre}</h3>
                                        <p class="content-text">${excursion.descripcion}</p>
                                        </div>
                                        </div>
                                    <div class="card-body">
                                    <h3 class="card-title">${excursion.nombre}</h3>
                                    <p class="card-text">${excursion.duracion}</p>
                                    <h4>$ ${parseFloat(excursion.precio)}</h4>
                                    <button class="btnAgregar" id="${excursion.id}Add">
                                        <span>Agregar</span>
                                        <svg viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                        </svg>
                                    </button>
                                </div>
                        </div>`;
    etiquetaHTML.append(cardExcursiones);
   
   let botonAgregar = document.getElementById(`${excursion.id}Add`);
   botonAgregar.onclick = () => agregarExcursiones(excursion);
        })
}

// // // GENERAR CARDS DE MI LISTA DE EXCURSIONES ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function miListaFn(etiquetaHTML){
    arrayUsuario.sort(function(a, b){return a.posicion - b.posicion});
    if(arrayUsuario.length > 0){
    arrayUsuario.forEach((excursion) => {
    let cardExcursiones = document.createElement("div");
    cardExcursiones.id = `${excursion.id}`;
    cardExcursiones.className = "col-sm-12 col-md-6 col-lg-4";
    cardExcursiones.innerHTML = `
                        <div class="card w-75 cardExcursion mx-auto d-block">
                                        <div class="content">
                                        <div class="content-overlay"></div>
                                        <img src="img/${excursion.id}.webp" class="card-img-top" alt="${excursion.nombre}">
                                        <div class="content-details fadeIn-bottom">
                                        <h3 class="content-title">${excursion.nombre}</h3>
                                        <p class="content-text">${excursion.descripcion}</p>
                                        </div>
                                        </div>
                                    <div class="card-body">
                                    <h3 class="card-title">${excursion.nombre}</h3>
                                    <p class="card-text">${excursion.duracion}</p>
                                    <h4>$ ${parseFloat(excursion.precio)}</h4>
                                <button class="btnEliminar" id="${excursion.id}Delete">
                                    <span>Eliminar</span>
                                    <svg viewBox="0 0 13 10">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>`;
   etiquetaHTML.append(cardExcursiones);
   
   let botonEliminar = document.getElementById(`${excursion.id}Delete`);
   botonEliminar.onclick = () => quitarExcursiones(excursion);
   })
   totalLista.innerHTML = `Total $${parseFloat(costoTotal())}`
    }
}

// // // MODIFICAR ARRAYS DE EXCURSIONES |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function agregar(elemento){
    arrayUsuario.push(arrayExcursiones[arrayExcursiones.indexOf(elemento)]);
    arrayExcursiones.splice(arrayExcursiones.indexOf(elemento),1)
}

function eliminar(elemento){
    arrayExcursiones.push(arrayUsuario[arrayUsuario.indexOf(elemento)]);
    arrayUsuario.splice(arrayUsuario.indexOf(elemento),1)
}

// FUNCIÓN QUE GUARDA EXCURSIONES EN STORAGE |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function storageArrays() {
    if(localStorage.getItem("arrayExcursiones") === null ){
        localStorage.getItem("usuarioAccedido") != null && (arrayExcursiones = arrayDefault);
    }
    let arrayExcursionesJSON = JSON.stringify(arrayExcursiones)
    localStorage.setItem ("arrayExcursiones", arrayExcursionesJSON)
    let arrayUsuarioJSON = JSON.stringify(arrayUsuario)
    localStorage.setItem ("arrayUsuario", arrayUsuarioJSON)
}

// FUNCIÓN QUE AGREGUE EXCURSION A MILISTA Y RE-LISTE CARDS ||||||||||||||||||||||||||||||||||||||||||||||||||

function agregarExcursiones(excursion){
        agregar(excursion);
        storageArrays();
        listarExcursiones ();
        alertAgregar(excursion.nombre);
}

// // // MENSAJE AGREGAR |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function alertAgregar(excursion) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Agregaste ${excursion} a tu lista`,
        showConfirmButton: false,
        timer: 1500
      }) 
}

// FUNCIÓN QUE ELIMINE EXCURSION DE MILISTA Y RE-LISTE CARDS |||||||||||||||||||||||||||||||||||||||||||||||||

function quitarExcursiones(excursion){
        eliminar(excursion);
        storageArrays();
        listarExcursiones ();
        alertQuitar(excursion.nombre);
}

// // // MENSAJE ELIMINAR |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function alertQuitar(excursion) {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Eliminaste ${excursion} de tu lista`,
        showConfirmButton: false,
        timer: 1500
      }) 
}

// FUNCIÓN QUE VACÍE MI LISTA DE EXCURSIONES |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function vaciarMiLista(){
    arrayUsuario = [];
    arrayExcursiones = arrayDefault;
    storageArrays();
    listarExcursiones ();
    totalLista.innerHTML = '';
}

// // // MENSAJE ALERTA. DESEA VACIAR LISTA? |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function alertaVaciar(){
    Swal.fire({
        title: '¿Realmente deseas vaciar tu lista?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#AFCF48',
        cancelButtonColor: '#CD8576',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            vaciarMiLista();
            modalExcursiones.hide();
        }
      })
}

// FUNCIÓN QUE RESUMA LAS EXCURSIONES CONTRATADAS ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function resumenCompraFn(){
    botonMiLista.hidden = true;
    botonSalir.hidden = true;
    modalResumenLabel.innerHTML = `
                    <h2>¡Gracias ${nombreUsuario}, por elegir Paraná!</h2> 
                    <h3>Estas son tus excursiones contratadas:</h3>` ;
    arrayUsuario.forEach((excursion) => {
    let cardExcursiones = document.createElement("div");
    cardExcursiones.id = `${excursion.id}`;
    cardExcursiones.className = "col-sm-12 col-md-6 col-lg-4";
    cardExcursiones.innerHTML = `
                <div class="card w-75 cardExcursion mx-auto d-block">
                        <div class="content">
                            <div class="content-overlay"></div>
                            <img src="img/${excursion.id}.webp" class="card-img-top" alt="${excursion.nombre}">
                            <div class="content-details fadeIn-bottom">
                            <h3 class="content-title">${excursion.nombre}</h3>
                            <p class="content-text">${excursion.descripcion}</p>
                            </div>
                            </div>
                            <div class="card-body">
                            <h3 class="card-title">${excursion.nombre}</h3>
                            <p class="card-text">${excursion.duracion}</p>
                            <h4>$ ${parseFloat(excursion.precio)}</h4>
                        </div>
                </div>`;
    resumenCompra.append(cardExcursiones);
    })
    
    totalResumen.innerHTML = `El costo total de tu paquete es $${parseFloat(costoTotal())}`;
    localStorage.clear();
}

// // // TOTALIZAR LAS EXCURSIONES CONTRATADAS |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function costoTotal(){
    let suma = 0;
    arrayUsuario.forEach((elemento) => {
        suma = suma + elemento.precio
        })
    return suma
}   

// // // MENSAJE ALERTA. DESEAS FINALIZAR COMPRA? ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function contratar(){
    Swal.fire({
        title: '¿Confirmás tu paquete?',
        text: `Vas a contratar ${arrayUsuario.length} excursión(es) por un total de $${parseFloat(costoTotal())}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#AFCF48',
        cancelButtonColor: '#CD8576',
        confirmButtonText: '¡Contratar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            resumenCompraFn();
            modalExcursiones.hide();
            principal.hidden = true;
            modalResumen.show();
        }
      })
}

// FUNCION MAIN ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function main(){
    excursionesApi();
    enlazarDom();
    validarSesion();
    validarDisponibles();
    validarMiLista();
    formulario.onsubmit = (e) => validarFormulario(e);
    (localStorage.getItem("arrayExcursiones") === undefined) && mensajeErrorConexion();
    botonVaciar.onclick = () => alertaVaciar();
    botonContratar.onclick = () => contratar();
    botonFinalizar.onclick = () => location.reload();
    botonSalir.onclick = () => salir();
   }

main()