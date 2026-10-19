import { getDatas } from "./api.js";

const div_series = document.getElementById("series")
const cantidad_total = document.getElementById("total")

const busquedas = document.getElementById("busquedas")

const footer = document.getElementById("footer")
const selected = document.getElementsByClassName("selected")


let rango = JSON.parse(localStorage.getItem("paginacion")) || "0"

export const listaBusquedas = (input) => {

    const lista = JSON.parse(localStorage.getItem("listaBusquedas")) || []

    busquedas.innerHTML = ""
    lista.map(valor => {
        busquedas.innerHTML += `
                    <busqueda class="categoria">${valor} <i class="fa-solid fa-xmark"></i></busqueda>
    
        `


    })

    busquedas.addEventListener("click", (e) => {
        e.preventDefault()


        let listaStorage = JSON.parse(localStorage.getItem("listaBusquedas"))

        if (e.target.localName == "i") {

            const texto_eliminar = e.target.parentElement.textContent
            listaStorage = listaStorage.filter(valor => valor !== texto_eliminar.trim())

            localStorage.setItem("listaBusquedas", JSON.stringify(listaStorage))

            listaBusquedas(input)
        }

        else if (e.target.localName == "busqueda") {

            input.value = e.target.textContent.trim()
            pintarSeries(input.value.trim())

        }


    })

}

export const pintarSeries = (buscar = "") => {

    const listaDiv = Array.from(footer.children)

    console.log(listaDiv)

    listaDiv.map(value => {

        if (value.textContent == String(Number(JSON.parse(localStorage.getItem("paginacion"))) + 1)) {

            selected[0].classList.remove("selected")
            value.classList.add("selected")
            // rango = String(Number(JSON.parse(localStorage.getItem("paginacion"))) + 1)

        }

        // console.log(value.textContent== String(Number(JSON.parse(localStorage.getItem("paginacion")))+1))

        // console.log(value.textContent == rango)

    })

    getDatas(JSON.parse(localStorage.getItem("paginacion")) )
    
    .then(datos => {
            // localStorage.setItem("paginacion", JSON.stringify(rango))

            let series = datos.filter(serie => serie.network !== null && serie.rating.average!==null)

            console.log(rango)

            buscar ? series = datos.filter(dato => dato.name.toLowerCase().trim().startsWith(buscar.toLowerCase().trim())) : series = datos
            cantidad_total.textContent = buscar ? `${series.length} resultados de <<${buscar.toLowerCase().trim()}>>` : `${series.length} resultados de series`

            div_series.innerHTML = ""

            series.map(valor => {


                valor.network ?
                    div_series.innerHTML += `
            
            <div class="card">

                <div class="card-img">

                    <img src=${valor.image.medium} alt="">

                </div>

                <div class="info-card">

                    <div class="top-card-info">
                        <h3>
                            ${valor.name}
                        </h3>
                        <p>
                            ${valor.network.name} · ${valor.network.country.name ? valor.network.country.name : "Desconocido"} · 2025
                        </p>
                    </div>

                    <div class="down-card-info">
                        <div class="categoria rate">
                            <i class="fa-solid fa-star"></i> ${valor.rating.average}
                        </div>

                        <div class="categoria">
                            Crimen
                        </div>
                    </div>

                </div>
            </div>

            `: null
            })

        })

        .catch(error => {
            console.error("Error: ", error)
        })

}