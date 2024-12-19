import axios from 'axios'

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const getP = ()=>{
    return api.get("/posts")
}

export const idser = (id) =>{
    return api.get(`/posts?id=${id}`)
}
export const stP = (val)=>{
    return api.get(`/posts?_sort=${val}&_order=asc`)
}
