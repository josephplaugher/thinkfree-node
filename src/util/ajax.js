import axios from 'axios';

function Ajax(url, formData) {
    this.url = "http://localhost:8080/" + url;
    this.formData = formData;
};

Ajax.prototype.get = function() {
    //console.log('the token:', sessionStorage.getItem('AppreciateJWT'));
    const request = axios({method: 'get', url: this.url,
        responseType:'JSON'
        //headers:{"authorization": "bearer" + sessionStorage.getItem('AppreciateJWT'),"testing":"123"}
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