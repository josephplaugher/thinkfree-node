import React from 'react';
import {Form, Input, Button} from 'reactform-appco';
import { GoogleLogin } from 'react-google-login-component';
import User from './User';
import CommentArea from './CommentArea';
import LoginGoogleUser from './LoginGoogleUser';
import Ajax from './util/Ajax';
import SetUrl from './util/SetUrl';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      userNotify: '',
      showForm: false,
      authForm: '',
      nativeUser: true,
      postid: sessionStorage.getItem('thinkfree-postid')
    };
    this.logout = this.logout.bind(this);
    this.getGoogleUser = this.getGoogleUser.bind(this);
   // this.getNativeUser = this.getNativeUser.bind(this);
    this.signInResponse = this.signInResponse.bind(this);
    this.updateSubscribed = this.updateSubscribed.bind(this);
  }
  
  componentDidMount = () => {
    if(sessionStorage.getItem('thinkfree-username')) {
      this.setState({ userData: 
          {
          username: sessionStorage.getItem('thinkfree-username'),
          email: sessionStorage.getItem('thinkfree-email'),
          subscribed: sessionStorage.getItem('thinkfree-sub')
          }
      });
    }
  }

  responseGoogle = (googleUser) => {
    var id_token = googleUser.getAuthResponse().id_token;
    Ajax.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token)
      .then(resp => {
        if (resp.data.email_verified) {
          this.getGoogleUser(resp.data.email);
        } else {
          alert(`Google says your email addres has not been verified. Please correct this and try again.`);
        }
      });
  }

  getGoogleUser = (email) => {
    var Googleuser = new LoginGoogleUser(email);
    let promise = Googleuser.fetchUser();
      promise.then( (resp) => {  
        if(resp.data.user){
          let User = resp.data.user;
          sessionStorage.setItem('thinkfree-username',User.username);
          sessionStorage.setItem('thinkfree-email', User.email);
          sessionStorage.setItem('thinkfree-sub', User.subscribed);
          this.setState({ userData: User});
        }
        if(typeof resp.data.user === 'undefined'){
          this.setState({ userData: {email: email}, showForm: true, authForm: 'google'});
        }
      });  
  }
  /*

  getNativeUser = (email) => {
    var Googleuser = new LoginGoogleUser(email);
    let promise = Googleuser.fetchUser();
      promise.then( (resp) => {  
        if(resp.data.user){
          let User = resp.data.user;
          sessionStorage.setItem('thinkfree-username',User.username);
          sessionStorage.setItem('thinkfree-email', User.email);
          sessionStorage.setItem('thinkfree-sub', User.subscribed);
          this.setState({ userData: User});
        }
        if(typeof resp.data.user === 'undefined'){
          this.setState({ userData: {email: email}});
        }
      });  
  }
*/
  signInResponse = (resp) => {
    if (resp.success) {
        this.setState({ 
          userData: resp.userData,
          userNotify: resp.userNotify,
          subscribed: true,
          showForm: false,
         });
        sessionStorage.setItem('thinkfree-username', resp.userData.username);
        sessionStorage.setItem('thinkfree-email', resp.userData.email);
        sessionStorage.setItem('thinkfree-sub', resp.userData.subscribed);
    } else {
      this.setState({ userNotify: resp.userNotify})
    }
}

  closeUserForm = () => {
    this.setState({showForm: false});
  }

  logout = () => {
      sessionStorage.removeItem('thinkfree-username');
      sessionStorage.removeItem('thinkfree-email');
      sessionStorage.removeItem('thinkfree-sub');
      this.setState({userData: {} });
  }

  updateSubscribed = () => {
    console.log('change subscribe')
    if(this.state.userData.subscribed === true) {
        let data = {email: this.state.userData.email, subscribe: false}
        Ajax.post(SetUrl() + "/updateSubscribed", data)
        .then( res => {
            let newUserData = Object.assign({}, this.state.userData);
            newUserData.subscribed = false;
            this.setState({userData: newUserData})
            sessionStorage.setItem('thinkfree-sub', 'false');
        })
    
    } else {
        let data = {email: this.state.userData.email, subscribe: true}
        Ajax.post(SetUrl() + "/updateSubscribed", data)
        .then( res => {
          let newUserData = Object.assign({}, this.state.userData);
          newUserData.subscribed = true;
          this.setState({userData: newUserData})
          sessionStorage.setItem('thinkfree-sub', 'true');
        })
    }
    
}

  render() {
    return (
      <div>
        <div className="login-status">
          {this.state.userData.email || this.state.showForm ? (
            <User user={this.state.userData} 
              signInResponse={this.signInResponse}
              userNotify={this.state.userNotify}
              authForm={this.state.authForm} 
              logout={this.logout}
              close={this.closeUserForm.bind(this)}
              updateSubscribed={this.updateSubscribed}
            />
          ) : (
            <div>
              <div>
                 {/*//turning off google login for now
                <GoogleLogin socialId="682669909656-oq0efd66585ha1r0e3vvtk6e4oj1mn1r.apps.googleusercontent.com"
                  className="google-login"
                  scope="profile"
                  fetchBasicProfile={false}
                  responseHandler={this.responseGoogle}
                  buttonText="Sign In With Google To Comment" 
                  className="submit-button"/>
                  */}
              </div>
              <div>
                <Button id="native-login" value="Sign In To Comment" className="submit-button" onClick={() => { this.setState({showForm: true, authForm: 'sign-in'}) }} />
                <Button id="native-signup" value="Create Username To Comment" className="submit-button" onClick={() => { this.setState({showForm: true, authForm: 'new-user'}) }} />
              </div>
            </div>
            )}
        </div>
        <div>
          <CommentArea user={this.state.userData} postid={this.state.postid} />
        </div>
      </div>
    )
  }
}

export default App;