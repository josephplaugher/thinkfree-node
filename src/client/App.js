import React from "react";
import { Form, Input, Button } from "reactform-appco";
import User from "./User";
import CommentArea from "./CommentArea";
import Ajax from "./util/Ajax";
import SetUrl from "./util/SetUrl";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      userNotify: {},
      showForm: false,
      authForm: "",
      nativeUser: true,
      postid: sessionStorage.getItem("thinkfree-postid")
    };
    this.logout = this.logout.bind(this);
    // this.getNativeUser = this.getNativeUser.bind(this);
    this.signInResponse = this.signInResponse.bind(this);
    this.updateSubscribed = this.updateSubscribed.bind(this);
    this.showUserForm = this.showUserForm.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount = () => {
    if (sessionStorage.getItem("thinkfree-username")) {
      this.setState({
        userData: {
          username: sessionStorage.getItem("thinkfree-username"),
          email: sessionStorage.getItem("thinkfree-email"),
          subscribed: sessionStorage.getItem("thinkfree-sub")
        }
      });
    }
  };

  signInResponse = resp => {
    if (resp.success === true) {
      sessionStorage.setItem("thinkfree-username", resp.userData.username);
      sessionStorage.setItem("thinkfree-email", resp.userData.email);
      sessionStorage.setItem("thinkfree-sub", resp.userData.subscribe);
      this.setState({
        userData: resp.userData,
        userNotify: resp.userNotify,
        subscribed: true,
        showForm: false
      });
    } else {
      this.setState({ userNotify: resp.userNotify });
    }
  };

  closeUserForm = () => {
    this.setState({ showForm: false });
  };

  logout = () => {
    sessionStorage.removeItem("thinkfree-username");
    sessionStorage.removeItem("thinkfree-email");
    sessionStorage.removeItem("thinkfree-sub");
    this.setState({ userData: {} });
  };

  updateSubscribed = () => {
    if (this.state.userData.subscribe === true) {
      let data = { email: this.state.userData.email, subscribe: false };
      Ajax.post(SetUrl() + "/updateSubscribed", data).then(res => {
        let newUserData = Object.assign({}, this.state.userData);
        newUserData.subscribe = false;
        this.setState({ userData: newUserData });
        sessionStorage.setItem("thinkfree-sub", "false");
      });
    } else {
      let data = { email: this.state.userData.email, subscribe: true };
      Ajax.post(SetUrl() + "/updateSubscribed", data).then(res => {
        let newUserData = Object.assign({}, this.state.userData);
        newUserData.subscribe = true;
        this.setState({ userData: newUserData });
        sessionStorage.setItem("thinkfree-sub", "true");
      });
    }
  };

  showUserForm = form => {
    this.scrollToTop();
    this.setState({ showForm: true, authForm: form });
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  render() {
    return (
      <div>
        <div id="login-status">
          {this.state.userData.email || this.state.showForm ? (
            <User
              user={this.state.userData}
              signInResponse={this.signInResponse}
              userNotify={this.state.userNotify}
              authForm={this.state.authForm}
              logout={this.logout}
              close={this.closeUserForm.bind(this)}
              updateSubscribed={this.updateSubscribed}
            />
          ) : (
            <div>
              <Button
                id="login"
                value="Sign In To Comment"
                className=""
                onClick={() => this.showUserForm("sign-in")}
              />
              <Button
                id="signup"
                value="Create Username To Comment"
                className=""
                onClick={() => this.showUserForm("new-user")}
              />
            </div>
          )}
        </div>
        <div>
          <CommentArea user={this.state.userData} postid={this.state.postid} />
        </div>
      </div>
    );
  }
}

export default App;
