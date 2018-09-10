import axios from 'axios';

class LoginGoogleUser {
    constructor(email) {
        this.email = email;
    }
    fetchUser = () => {
        console.log('logging in google user...');
        return new Promise((resolve, reject) => {
            axios({
                method: 'get', url: 'http://localhost:8080/checkGoogleUser?email=' + this.email,
                responseType: 'json'
            }).then(resp => {
                console.log('the user data...', resp.data.user);
                resolve(resp.data.user);
            });
        });
    }
}

export default LoginGoogleUser;