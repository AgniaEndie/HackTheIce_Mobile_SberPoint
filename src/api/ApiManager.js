import axios from "axios";

const ApiManager = axios.create({
    baseURL: 'http://hakatonspring.ml/api',
    responseType: 'json',
    withCredentials: true,
})
export default ApiManager