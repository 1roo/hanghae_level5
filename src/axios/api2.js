import axios from "axios";


const api2 = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api2;