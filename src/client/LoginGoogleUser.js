import axios from 'axios';

class LoginGoogleUser {
    constructor(email) {
        this.email = email;
    }
    fetchUser = () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get', url: 'http://localhost:8080/checkGoogleUser?email=' + this.email,
                responseType: 'json'
            }).then(resp => {
                resolve(resp.data.user);
            });
        });
    }
}

export default LoginGoogleUser;