import axios from "axios";
//import { reject, resolve } from "core-js/fn/promise";

const api_url = "https://ropelato-a631f-default-rtdb.firebaseio.com/articulo.json"

const state = {
    articulos: []
}

const getters = {
    getArticulos: state => state.articulos
}

const actions = {

    fetchArticulos({commit, dispatch }){
        return new Promise((resolve, reject) => {
            axios
            .get(`${api_url}`)
            .then(response => {

                const arrayDatos = []


                for (let id in response.data)
                {
 
                    arrayDatos.push(response.data[id])

                }
               

                commit("setArticulos",arrayDatos)
                resolve(response)
         
            })
            .catch(error => {
                reject(error.response.data)
            })
        })
    },

    addArticulo({ commit, dispatch },
        {idArticulo,formaDePResentacion,nombre,cantidadDisponible,
            precio,bajoDemanda, localizacion}){
            return new Promise((resolve,reject) => {
                axios
                .post(`${api_url}`,{
                    idArticulo: idArticulo,
                    nombre: nombre,
                    formaDePResentacion: formaDePResentacion,
                    cantidadDisponible: cantidadDisponible,
                    precio: precio,
                    bajoDemanda: bajoDemanda,
                    localizacion: localizacion
                }
                ).then(response => {
                    commit("newArticulo", response.data);
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response.data);
                })
            })
        }
}

const mutations = {
    newArticulo: (state, articulo) => state.articulos.push(articulo),
    setArticulos: (state, articulos) => state.articulos = articulos
}

export default {
    state,
    getters,
    actions,
    mutations
};