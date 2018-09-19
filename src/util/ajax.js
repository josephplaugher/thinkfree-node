import axios from 'axios';

function Ajax(url, formData) {
    const baseURL = "http://"+ process.env.HOST + ":" + process.env.PORT + "/";
    this.url = baseURL + url;
    this.formData = formData;
};

Ajax.prototype.get = function() {
    const request = axios({method: 'get', url: this.url,
        responseType:'JSON'
         });
    return request;
}

Ajax.prototype.post = function(url,formData) {
    const request = axios({url:url,
        method: 'post',
        data: formData,
        config: { 
            headers: {"Content-Type": "multipart/form-data"}},
        responseType:'JSON'})  
    return request;
}

export default Ajax;