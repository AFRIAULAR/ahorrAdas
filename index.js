/* ******* FILTROS ******** */
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


