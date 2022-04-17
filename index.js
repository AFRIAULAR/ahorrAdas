/*    ***** VARIABLES ***** */
//OPERACIONES
const botonNuevaOperacion = document.getElementById("nueva-operacion");
const seccionNuevaOperacion = document.getElementById("cont-operaciones");
const botonCancelarNuevaOperacion = document.getElementById("cancelar-nueva-operacion");
const botonAgregarNuevaOperacion = document.getElementById("agregar-nueva-operacion");
const inputDescripcionOperacion = document.getElementById("descripcion-operacion");
const inputMontoOperacion = document.getElementById("monto-operacion");
const selectTipoOperacion = document.getElementById("tipo-operacion");
const selectCategoriaOperacion = document.getElementById("categoria-operacion");
const inputFechaNuevaOperacion = document.getElementById("fecha-operacion");
//

//CATEGORIAS
const selectCategoria = document.getElementById("select-categoria");
const formAgregarCategoria = document.getElementById("form-agregar-categoria");
const inputAgregarCategoria = document.getElementById("input-agregar-categoria");
const botonAgregarCategoria = document.getElementById("boton-agregar-categoria");
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

// AGREGAR CATEGORIAS
const guardarCategoriaLS = (array, clave) => {
  const nuevoObjeto = { categorias: array };
  const objetoJSON = JSON.stringify(nuevoObjeto);
  localStorage.setItem(clave, objetoJSON);
};

const traerCategoriaLS = (clave) => {
  const datosLocalStorage = localStorage.getItem(clave);
  const objetoLS = JSON.parse(datosLocalStorage);
  if (objetoLS === null) {
    return null;
  } else {
    return objetoLS.categorias;
  }
};
const capitalizar = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};    //CAPITALIZA NUEVA CATEGORIA

const agregarCategoriaHTML = (categorias, select) => {
  if (select === selectCategoria) {
    const opcionTodos = `<option value="Todos">Todas</option>`;
    const categoriasEnHTML = categorias.reduce(
      (acc, categoria, index, array) => {
        return (
          acc +
          `<option value="${categoria}" id="categoria-${index}">${categoria}</option>`
        );
      },
      opcionTodos
    );
    select.innerHTML= categoriasEnHTML;
  } else {
    const categoriasEnHTML = categorias.reduce(
      (acc, categoria, index, array) => {
        return (
          acc +
          `<option value="${categoria}" id="categoria-${index}">${categoria}</option>`
        );
      },
      ""
    ); select.innerHTML = categoriasEnHTML;
  }}

//FORMULARIO AGREGAR CATEGORIA
formAgregarCategoria.onsubmit = (event) => {
  event.preventDefault();
}
botonAgregarCategoria.onclick = () => {
  const categoriaCapitalizada = capitalizar(inputAgregarCategoria.value);
  const arrayDesdeLS = traerCategoriaLS("categorias");

  if (arrayDesdeLS.includes(categoriaCapitalizada)) {
    alert("Ésta categoría ya existe");
  } else if (categoriaCapitalizada === "") {
    alert("La categoría debe tener un nombre");
  } else {
    arrayDesdeLS.push(categoriaCapitalizada);
    guardarCategoriaLS(arrayDesdeLS, "categorias");
    agregarCategoriaHTML(
      traerCategoriaLS("categorias"),
      selectCategoriaNuevaOperacion
    );
    agregarCategoriaHTML(
      traerCategoriaLS("categorias"),
      selectCategoriaEditarOperacion
    );
    agregarItemCategoria(traerCategoriaLS("categorias"));
    inputAgregarCategoria.value = "";
  }
}
