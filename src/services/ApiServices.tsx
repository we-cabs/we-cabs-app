import axios from "axios";

export const loginApiCall = (loginData:any) => {
    const api = axios.create({
        baseURL: `https://reqres.in/api`
    })
    return api.post("/register", loginData);
}
export const getUserDataById = (id:any) => {
    const api = axios.create({
        baseURL: `https://reqres.in/api`
    })
    return api.get("/users/"+id);
}