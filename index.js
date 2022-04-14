/*    ***** VARIABLES ***** */
const botonNuevaOperacion = document.getElementById("nueva-operacion");
const seccionNuevaOperacion = document.getElementById("cont-operaciones");
const botonCancelarNuevaOperacion = document.getElementById("cancelar-nueva-operacion");
const botonAgregarNuevaOperacion = document.getElementById("agregar-nueva-operacion");
const inputDescripcionOperacion = document.getElementById("descripción-operación");
const inputMontoOperacion = document.getElementById("monto-operación");
const selectTipoOperacion = document.getElementById("tipo-operacion");
const selectCategoriaOperacion = document.getElementById("categoria-operacion");
const inputFechaNuevaOperacion = document.getElementById("fecha-operación");
//

/*  ***** ARRAYS  ***** */
const seccionesArray = [
  seccionNuevaOperacion,
];  //Creo un array con las distintas secciones de la pagina (**ir agregando**)

const categorias = [
  "Comida",
  "Servicios",
  "Salidas",
  "Educación",
  "Transporte",
  "Trabajo",
];

// FILTROS SECCION PRINCIPAL 
const toggleFiltros = () => {
  const toggle = document.getElementById('toggle-filtros')
  const formulario = document.getElementById('formulario')
    if (toggle.innerText === 'Ocultar filtros') {
      toggle.innerText = 'Mostrar filtros'
      formulario.classList.add('is-hidden')
    } else {
      toggle.innerText = 'Ocultar filtros'
      formulario.classList.remove('is-hidden')
    }
  }
//  NUEVA OPERACION  
botonNuevaOperacion.onclick = () => {
  seccionNuevaOperacion.classList.remove('is-hidden')
};

let operacion = {
  descripcion: inputDescripcionOperacion.value,
  categoria: selectCategoriaOperacion.value,
  fecha: inputFechaNuevaOperacion.value,
  monto: inputMontoOperacion.value,
  tipo: selectTipoOperacion.value,
}; //para traer elementos del formulario
