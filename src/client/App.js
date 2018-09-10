import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login-component';
import LoginGoogleUser from './LoginGoogleUser';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    //this.LoginGoogleUser = this.LoginGoogleUser.bind(this);
  }
  state = {
    user: '',
  };

  responseGoogle(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    
    console.log({ googleId });
    console.log({accessToken: id_token});
    //this.getUserData(id_token);
      axios({
        method: 'get', url: 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+id_token,
        responseType: 'json'
      }).then(resp => {
        console.log('the user data: ', resp.data.email);
        console.log('verified?: ', resp.data.email_verified);
        if(resp.data.email_verified) {
          var userData = LoginGoogleUser(resp.data.email);
          if(userData) {
            this.setState({ user: userData});
          } else {
            //this.setState({ newUser: true});
          }
        }else{
          console.log('email not verified');
          //do something to tell the use their email is verified
        }
      })
  }

  render() {
    return (
      <div>{this.state.userData ? (
        <User user={this.state.user} />
      ) : (
        <GoogleLogin socialId="682669909656-oq0efd66585ha1r0e3vvtk6e4oj1mn1r.apps.googleusercontent.com"
        className="google-login"
        scope="profile"
        fetchBasicProfile={false}
        responseHandler={this.responseGoogle}
        buttonText="Login With Google"/>
        )}
      </div>
    )
  }
}

export default App;