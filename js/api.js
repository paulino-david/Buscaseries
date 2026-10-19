
const API = "https://api.tvmaze.com/show?page="

export const getDatas= async(pagina)=>{

    const respuesta = await axios.get(API+pagina)

    return respuesta.data
}

