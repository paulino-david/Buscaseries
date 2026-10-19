import { pintarSeries, listaBusquedas } from "./ui.js";

const bucar_input = document.getElementById("buscar-input")
const buscar = document.getElementById("buscar")

const footer = document.getElementById("footer")
const selected = document.getElementsByClassName("selected")
const pagins = document.querySelectorAll(".pagin")

localStorage.setItem("paginacion", JSON.stringify("0"))

footer.addEventListener("click", e => {
    let rango = JSON.parse(localStorage.getItem("paginacion")) || "0"

    if (e.target.localName == "div" && Number(e.target.textContent)) {

        selected[0].classList.remove("selected")
        e.target.classList.add("selected")

        rango = String(Number(e.target.textContent) - 1)
        localStorage.setItem("paginacion", JSON.stringify(rango))

        pintarSeries()

    }
    else if (e.target.localName == "i") {

        const elemnto = e.target
        const pagina = JSON.parse(localStorage.getItem("paginacion"))

        if (Array.from(e.target.classList).includes("fa-angle-right")) {

            if (Number(pagina) == 2) {
                let paginaciones = Array.from(pagins)

                paginaciones.map(valor => {
                    valor.textContent = String(Number(valor.textContent) + 3)
                })
                // console.log(pagins)
            }

            rango = String(Number(pagina) + 1)
            localStorage.setItem("paginacion", JSON.stringify(rango))

            pintarSeries()


        }

        else {

            let paginaciones = Array.from(pagins)

            if (Number(pagina)>0){

                if (Number(pagina)%3 == 0) {
    
                    paginaciones.map(valor => {
                        valor.textContent = String(Number(valor.textContent) - 3)
                    })
                    // console.log(pagins)
                }
    
    
                rango = String(Number(pagina) - 1)
                localStorage.setItem("paginacion", JSON.stringify(rango))
    
                pintarSeries()
                
            }


        }

    }

})

buscar.addEventListener("submit", (e) => {
    e.preventDefault()

    const busqueda = bucar_input.value

    const lista = JSON.parse(localStorage.getItem("listaBusquedas")) || []

    if (busqueda) {
        !lista.includes(busqueda.trim()) ? lista.push(busqueda.trim()) : lista
    }

    localStorage.setItem("listaBusquedas", JSON.stringify(lista))

    listaBusquedas(bucar_input)
    pintarSeries(busqueda)

})

listaBusquedas(bucar_input)
pintarSeries()