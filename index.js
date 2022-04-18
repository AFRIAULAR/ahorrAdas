/*    ***** VARIABLES ***** */
//OPERACIONES
const botonNuevaOperacion = document.getElementById("nueva-operacion");
const seccionNuevaOperacion = document.getElementById("cont-operaciones");
const botonCancelarNuevaOperacion = document.getElementById("cancelar-nueva-operacion");
const contenedorNuevasOperaciones = document.getElementById("contenedor-listado-nuevas-operaciones");
const botonAgregarNuevaOperacion = document.getElementById("agregar-nueva-operacion");
const inputDescripcionOperacion = document.getElementById("descripcion-operacion");
const inputMontoOperacion = document.getElementById("monto-operacion");
const selectTipoOperacion = document.getElementById("tipo-operacion");
const selectCategoriaOperacion = document.getElementById("categoria-operacion");
const inputFechaNuevaOperacion = document.getElementById("fecha-operacion");

//CATEGORIAS
const seccionCategorias = document.querySelector("#seccion-categorias");
const selectCategoria = document.getElementById("select-categoria");
const formAgregarCategoria = document.getElementById("form-agregar-categoria");
const inputAgregarCategoria = document.getElementById("input-agregar-categoria");
const botonAgregarCategoria = document.getElementById("boton-agregar-categoria");
const containerCategoriaAgregada = document.getElementById("container-categorias-agregadas");
const selectTipo = document.getElementById("select-tipo");
const selectOrden = document.getElementById("select-orden");
const seccionEditarCategoria = document.getElementById("seccion-editar-categorias");
const botonEditarCategoria = document.querySelector("#boton-editar-categoria-formulario");
const botonCancelarEditarCategoria = document.querySelector("#boton-cancelar-editar-categoria");
const inputEditarNombreCategoria = document.getElementById("input-editar-nombre-categoria");
const botonEditarCategoriaFormulario = document.getElementById("boton-editar-categoria-formulario");
const formEditarCategoria = document.getElementById("form-editar-categoria");
//

/*  ***** ARRAYS  ***** */
const seccionesArray = [
  seccionNuevaOperacion,
  seccionCategorias,
  seccionEditarCategoria
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

//  ****NUEVA OPERACION***
//FUNCIONES DE LOCAL STORAGE PARA OPERACION
const guardarOperacionLS = (array, clave) => {
  const arrayJSON = JSON.stringify(array);
  localStorage.setItem(clave, arrayJSON);
};
const traerOperacionLS = (clave) => {
  const datosLocalStorage = localStorage.getItem(clave);
  const operacionLS = JSON.parse(datosLocalStorage);
  if (operacionLS === null) {
    return null;
  } else {
    return operacionLS.map((operacion, index) => {
      return { ...operacion, index };
    });
  }
};
let operaciones = traerOperacionLS("operaciones");

// VISTA HTML NUEVA OPERACION
const colorDeMonto = (objeto) => {
  if (objeto.tipo === "gasto") {
    return "has-text-danger";
  } else {
    return "has-text-success";
  }
};
const signoMonto = (objeto) => {
  if (objeto.tipo === "gasto") {
    return "-$";
  } else {
    return "+$";
  }
};
const mostrarOperacionesEnHTML = (array) => {
  const itemsOperaciones = array.reduce((acc, operacion) => {
    return (
      acc +
      `<div id="item-nueva-operacion" class="columns is-mobile">
    <p id="descripcion-item-operacion" class="column is-3 mr-0-mobile has-text-weight-semibold">${
      operacion.descripcion
    }</p>
    <div class="column is-3 is-6-mobile">
      <p id="categoria-item-operacion" class="tag is-light">${
        operacion.categoria
      }</p>
    </div>
    <p id="fecha-item-operacion" class="is-size-7 column is-2 is-hidden-mobile has-text-right">${
      operacion.fecha
    }</p>
    <p id="monto-item-operacion" class="column is-2-desktop is-3-mobile has-text-right has-text-weight-bold ${colorDeMonto(
      operacion
    )}"> ${signoMonto(operacion)}${operacion.monto}
    </p>
    <div class="column is-2-desktop is-3-mobile pt-0 has-text-right">
      <button id="boton-editar-item-operaciones-${
        operacion.index
      }" class="button is-ghost is-small pt-0 pb-0 boton-editar-item-operacion">Editar</button>
      <button id="boton-eliminar-item-operaciones-${
        operacion.index
      }" class="button is-ghost is-small pt-0 boton-eliminar-item-operacion">Eliminar</button> 
    </div>
    </div>`
    );
  }, "");
  contenedorNuevasOperaciones.innerHTML = itemsOperaciones;
};

// NUEVA OPERACION-FORMULARIO
botonNuevaOperacion.onclick = () => {
  seccionNuevaOperacion.classList.remove('is-hidden')
};

botonAgregarNuevaOperacion.onclick = () => {
let operacion = {
  descripcion: inputDescripcionOperacion.value,
  categoria: selectCategoriaOperacion.value,
  fecha: inputFechaNuevaOperacion.value,
  monto: inputMontoOperacion.value,
  tipo: selectTipoOperacion.value,
}; //para traer elementos del formulario
if (
  operacion.descripcion === "" ||
  operacion.monto === "0" ||
  operacion.fecha === ""
) {
  alert("¡Completar todos los campos!");
}else {
  operaciones.push(operacion);
  guardarOperacionLS(operaciones, "operaciones");
  mostrarOperacionesEnHTML(traerOperacionLS("operaciones"));
} }//agrega operacion al array y la renderiza


/*  
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
};    //-->CAPITALIZA NUEVA CATEGORIA

const agregarItemCategoria = (array) => {
  const itemAgregadoEnCategorias = array.reduce((acc, elemento, index) => {
    return (
      acc +
      `<div class="columns is-mobile" id=categoria-agregada>
    <div class="column">
    <p class="tag is-light">${elemento}</p>
  </div>
  <div class="column is-flex is-justify-content-flex-end ">
    <button  id="boton-editar-categoria-${index}"class="button is-ghost is-size-7 boton-editar-item-categoria">Editar</button>
    <button id="boton-eliminar-categoria-${index}"class="button is-ghost is-size-7 boton-eliminar-categoria">Eliminar</button>
  </div> 
  </div>`
    );
  }, "");
  containerCategoriaAgregada.innerHTML = itemAgregadoEnCategorias;
  mostrarCategoriaAEditar();
  ejecutarBotonesEliminarCategoria();
};

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
    agregarCategoriaHTML(traerCategoriaLS("categorias"),selectCategoria);
    agregarCategoriaHTML(traerCategoriaLS("categorias"),selectCategoriaOperacion);
    agregarCategoriaHTML(traerCategoriasDesdeLS("categorias"),selectCategoriaEditarOperacion);    
    agregarItemCategoria(traerCategoriaLS("categorias"));
    inputAgregarCategoria.value = ""; 
  }
  mostrarReportes();
};

//Editar categorías
formEditarCategoria.onsubmit = (event) => {
  event.preventDefault();
};

const mostrarCategoriaAEditar = () => {
  const botonesEditarItemCategoria = document.querySelectorAll(
    ".boton-editar-item-categoria"
  );

  for (let index = 0; index < botonesEditarItemCategoria.length; index++) {
    botonesEditarItemCategoria[index].onclick = () => {
      const id = botonesEditarItemCategoria[index].id.slice(23);
      const idCategoria = Number(id);
      mostrarSeccion(seccionesArray, seccionEditarCategoria);
      let categoriaAEditar = traerCategoriaLS("categorias")[idCategoria];
      inputEditarNombreCategoria.value = categoriaAEditar;

      const categoriasRestantes = traerCategoriaLS("categorias").filter(
        (categoria) => {
          return categoriaAEditar !== categoria;
        }
      );
      guardarCategoriaLS(categoriasRestantes, "categorias");

      botonCancelarEditarCategoria.onclick = () => {
        const categoriaLS = traerCategoriaLS("categorias");
        categoriaLS.push(categoriaAEditar);
        guardarCategoriaLS(categoriaLS, "categorias");
        agregarCategoriaHTML(traerCategoriaLS("categorias"), selectCategoria);
        agregarCategoriaHTML(traerCategoriaLS("categorias"),          selectCategoriaNuevaOperacion);
        agregarCategoriaHTML(traerCategoriaLS("categorias"),
        selectCategoriaEditarOperacion);
        agregarItemCategoria(traerCategoriaLS("categorias"));
        mostrarSeccion(seccionesArray, seccionCategorias);
      };
    };
  }
};

//EDITAR CATEGORIA DEL FORMULARIO
botonEditarCategoriaFormulario.onclick = () => {
  const arrayCategoriaLS = traerCategoriaLS("categorias");
  arrayCategoriaLS.push(inputEditarNombreCategoria.value);
  guardarCategoriaLS(arrayCategoriaLS, "categorias");

  agregarCategoriaHTML(traerCategoriaLS("categorias"), selectCategoria);
  agregarCategoriaHTML(
    traerCategoriaLS("categorias"),
    selectCategoriaNuevaOperacion
  );
  agregarCategoriaHTML(
    traerCategoriaLS("categorias"),
    selectCategoriaEditarOperacion
  );
  agregarItemCategoria(traerCategoriaLS("categorias"));
  mostrarReportes();
  mostrarSeccion(seccionesArray, seccionCategorias);
};
//ADD CAT SELECT
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
    select.innerHTML = categoriasEnHTML();
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

//ELIMINAR CATEGORIA
const ejecutarBotonesEliminarCategoria = () => {
  const botonEliminarCategoria = document.querySelectorAll(
    ".boton-eliminar-categoria"
  );

  for (let i = 0; i < botonEliminarCategoria.length; i++) {
    botonEliminarCategoria[i].onclick = () => {
      idCortado = botonEliminarCategoria[i].id.slice(25);
      console.log(idCortado);
      idDelBoton = Number(idCortado);
      const categoriasNoEliminadas = traerCategoriaLS(
        "categorias"
      ).filter((elemento, index) => {
        return index !== idDelBoton;
      });
      console.log(categoriasNoEliminadas);
      guardarCategoriaLS(categoriasNoEliminadas, "categorias");
      traerCategoriaLS("categorias");
      agregarItemCategoria(traerCategoriaLS("categorias"));
      agregarCategoriaHTML(traerCategoriaLS("categorias"),        selectCategoria);
      agregarCategoriaHTML(traerCategoriaLS("categorias"),
      selectCategoriaNuevaOperacion);
      agregarCategoriaHTML(traerCategoriaLS("categorias"),        selectCategoriaEditarOperacion);
      mostrarReportes();
    };
  }
}
*/