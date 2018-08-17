import axios from 'axios';

function Ajax(url, formData) {
    this.url = url;
    this.formData = formData;
};

Ajax.prototype.get = function(url) {
    //console.log('the token:', sessionStorage.getItem('AppreciateJWT'));
    const request = axios({method: 'get', url: url,
        responseType:'JSON'
        //headers:{"authorization": "bearer" + sessionStorage.getItem('AppreciateJWT'),"testing":"123"}
        });
    request
        .then(result => console.log('ajax firing: '+ result))
        .catch(error => console.log('ajax error: '+ error))
    return request;
}

Ajax.prototype.post = function(url,formData) {
    const request = axios({url:url,
        method: 'post',
        data: formData,
        config: { 
            headers: {"Authorization": 'Bearer'+ sessionStorage.getItem('AppreciateJWT'),
                      "Content-Type": "multipart/form-data"}},
        responseType:'json'})  
        request
            .then(result => console.log('ajax firing: '+ result))
            .catch(error => console.log('ajax error: '+ error))
    return request;
}

export default Ajax;