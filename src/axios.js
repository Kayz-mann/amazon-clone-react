import axios from "axios"

const instance = axios.create({
    // API cloud func url
    baseURL: "..."     
})

export default instance