import axios from 'axios'

const get = (url) => {
    return request = axios({
        method: 'get', 
        url: url,
        responseType:'JSON' });
}

const post = (url, formData) => {

    return request = axios({url:url,
        method: 'post',
        data: formData,
        config: { 
            headers: {"Authorization": 'Bearer'+ sessionStorage.getItem('AppreciateJWT'),
                      "Content-Type": "multipart/form-data"}},
        responseType:'json'})  
}


export default {get, post};