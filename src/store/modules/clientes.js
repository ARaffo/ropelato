import axios from "axios";


const api_geo_url = "https://apis.datos.gob.ar/georef/api"
const api_firebase_url = "https://ropelato-a631f-default-rtdb.firebaseio.com"

const state = {
    clientes: [],
    provincias: [],
    departamentos: [],
    ciudades: [] 
}

const getters = {
    getProvincias: state => state.provincias,
    getDepartamentos: state => state.departamentos,
    getCiudades: state => state.ciudades,
    getClientes: state => state.clientes
}

const actions = {
addCliente({commit},{idCliente,cuil,nombre,apellido,documento,telefono,
    correo,direccion,provincia,departamento,ciudad}){
        return new Promise((resolve,reject) => {
            axios
            .post(`${api_firebase_url}/cliente/.json`, {
                cuil: cuil,
                nombre: nombre,
                apellido: apellido,
                documento: documento,
                telefono: telefono,
                correo: correo,
                direccion: direccion,
                provincia: provincia,
                departamento: departamento,
                ciudad: ciudad
            })
            .then(response => {
                commit("newCliente",response.data)
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response.data);
            })
        })
    },

    fetchClientes({commit}){
        return new Promise((resolve, reject) => {
            axios
            .get(`${api_firebase_url}/cliente/.json`)
            .then(response => {
                const arrayClientes = []

                for(let id in response.data){
                    arrayClientes.push(response.data[id])

                }
                commit("setClientes",arrayClientes)
                resolve(response)
            })
            .catch(error => {
                reject(error.response.data)
            })
        })
    },

    fetchProvincias({commit}) {
        return new Promise((resolve,reject) => {
            axios
            .get(`${api_geo_url}/provincias?aplanar=true&campos=basico&max=100&exacto=true`)
            .then(response => {
                commit("setProvincias",response.data.provincias)
                resolve(response)
            })
            .catch(error => {
                reject(error.response.data)
            })
        })
    },

    fetchDepartamentos({commit}, id){
        return new Promise((resolve,reject) => {
            axios
            .get(`${api_geo_url}/departamentos?provincia=${id}&aplanar=true&campos=basico&max=200&exacto=true`)
            .then(response => {
                commit("setDepartamentos", response.data.departamentos)
                resolve(response)
            })
            .catch(error => {
                reject(error.response.data)
            })
        })
    },

    fetchCiudades({commit}, id){
        return new Promise((resolve,reject) => {
            axios
            .get(`${api_geo_url}/localidades?departamento=${id}&aplanar=true&campos=basico&max=200&exacto=true`)
            .then(response => {
                commit("setCiudades",response.data.localidades)
                resolve(response)
            })
            .catch(error => {
                reject(error.response.data)
            })
        })
    }
}

const mutations = {
    setProvincias: (state, provincias) => state.provincias = provincias,
    setDepartamentos : (state, departamentos) => state.departamentos = departamentos,
    setCiudades : (state, ciudades) => state.ciudades = ciudades,
    newCliente: (state, cliente) => state.clientes.push(cliente),
    setClientes: (state, clientes) => state.clientes = clientes
}

export default {
    state,
    getters,
    actions,
    mutations
};