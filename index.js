const ocultarFiltro = document.querySelector("#ocultarFiltro")
const ocultarForm = document.querySelector("#formulario")

const mostrarFiltro = document.querySelector("#mostrarFiltro")
const mostrarForm = document.querySelector("#formulario")

ocultarFiltro.onclick = ()=>{
   
    ocultarForm.classList.add("is-hidden")
    document.getElementById('ocultarFiltro').style.display = 'none'
    
}

mostrarFiltro.onclick = ()=>{
    mostrarForm.classList.remove("is-hidden") 
    
}

