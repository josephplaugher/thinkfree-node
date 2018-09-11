import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import User from './User';
import LoginGoogleUser from './LoginGoogleUser';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {},
    };
  }
  
  componentDidMount = () => {
    if(sessionStorage.getItem('thinkfree-username')) {
      this.setState({ userData: 
          {
          username: sessionStorage.getItem('thinkfree-username'),
          email: sessionStorage.getItem('thinkfree-email')
          }
      });
    }
  }

  responseGoogle = (googleUser) => {
    var id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: 'get', url: 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+id_token,
        responseType: 'json'
      }).then(resp => {
        if(resp.data.email_verified) {
          this.getGoogleUser(resp.data.email);          
        }else{
          alert(`Google says your email addres has not been verified. Please correct this and try again.`);
        }
      });
  }

  getGoogleUser = (email) => {
    var Googleuser = new LoginGoogleUser(email);
    let promise = Googleuser.fetchUser();
      promise.then( (data) => {        
        sessionStorage.setItem('thinkfree-username',data.username);
        sessionStorage.setItem('thinkfree-email', data.email);
        this.setState({ userData: data});
      });  
  }

  render() {
    return (
      <div>
      {this.state.userData.username ? (
          <User user={this.state.userData} />
      ) : (
        <div>
        <GoogleLogin socialId="682669909656-oq0efd66585ha1r0e3vvtk6e4oj1mn1r.apps.googleusercontent.com"
        className="google-login"
        scope="profile"
        fetchBasicProfile={false}
        responseHandler={this.responseGoogle}
        buttonText="Sign In To Comment"/>
        </div>
        )}
      </div>
    )
  }
}

export default App;