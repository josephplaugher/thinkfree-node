import axios from 'axios';

const LoginGoogleUser = (email) => {
    console.log('logging in google user...');
    axios({
        method: 'get', url: 'http://localhost:8080/checkGoogleUser?email=' + email,
        responseType: 'json'
    }).then(resp => {
        if (resp.exists) {
            console.log('the user data...', resp.user);
            return resp.user;
        } else {
            return false;
        }
    });

}

export default LoginGoogleUser;