import { pintarSeries,listaBusquedas } from "./ui.js";

const bucar_input = document.getElementById("buscar-input")
const buscar = document.getElementById("buscar")

const footer = document.getElementById("footer")
const selected = document.getElementsByClassName("selected")

let rango ="0"

footer.addEventListener("click",e=>{

    if (e.target.localName=="div" && Number(e.target.textContent)){
        
        selected[0].classList.remove("selected")
        e.target.classList.add("selected")

        rango = String(Number(e.target.textContent) - 1)
        pintarSeries({rango:rango})

    }
})

buscar.addEventListener("submit",(e)=>{
    e.preventDefault()

    const busqueda = bucar_input.value

    const lista = JSON.parse(localStorage.getItem("listaBusquedas"))||[]

    if (busqueda){
        !lista.includes(busqueda.trim())?lista.push(busqueda.trim()):lista
    }

    localStorage.setItem("listaBusquedas",JSON.stringify(lista))

    listaBusquedas(bucar_input)
    pintarSeries({buscar:busqueda,rango:rango})
    
})

listaBusquedas(bucar_input)
pintarSeries()