import axios from 'axios';

axios.defaults.baseURL="http://localhost:8000";


axios.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    if (error.response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
        window.location.reload();
    }
    return Promise.reject(error);
})

export default axios;