import axios from "axios";

const connection = axios.create({
    baseURL: "http://localhost:8080"
})

export default connection;