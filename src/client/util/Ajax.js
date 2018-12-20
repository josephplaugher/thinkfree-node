import axios from 'axios'

const get = (url) => {
    const request = axios({
        method: 'get',
        url: url,
        config: {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        },
        responseType: 'JSON'
    });
    request.catch(e => { 
        console.error(e)
        APILogger(e) })
    return request;
}

const post = (url, formData) => {
    const request = axios({
        url: url,
        method: 'post',
        data: formData,
        config: {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        },
        responseType: 'json'
    })
    request.catch(e => { 
        console.error(e)
        APILogger(e) })
    return request
}

const APILogger = (error) => {
    console.error('api error logger: ', error)
    /*
    axios({url: SetUrl(),
        method: 'post',
        data: {error: error},
        config: { 
            headers: {"Authorization": 'Bearer'+ sessionStorage.getItem('AppreciateJWT'),
                      "Content-Type": "multipart/form-data"}},
        responseType:'json'})  
        */
}

export default {get, post, APILogger};