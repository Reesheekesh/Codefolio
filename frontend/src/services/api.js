import axios from "axios";
const API = axios.create({
    baseURL: "https://codefolio-89x6.onrender.com/api"
});

export const createUser = (data) => API.post("/create-user",data);