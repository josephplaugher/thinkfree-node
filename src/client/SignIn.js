import React from "react";
import { FormClass, Input, Button } from "reactform-appco";
import ValRules from "util/ValRules";
import "css/lightbox.css";
import "css/form.css";

class SignIn extends FormClass {
  constructor(props) {
    super(props);
    this.useLiveSearch = false;
    this.route = "/signIn";
    this.valRules = ValRules;
    this.state = {
      email: "",
      password: "",
      formData: {
        email: "",
        password: ""
      },
      userNotify: {
        success: "",
        email: "",
        password: "",
        message: ""
      },
      user: {}
    };
    this.response = this.response.bind(this);
  }

  response(res) {
    // delagate the response to the parent User component
    this.props.response(res.data);
  }

  render() {
    return (
      <div>
        {/* prettier-ignore*/}
        <form onSubmit={this.rfa_onSubmit} >
            <Input name="email" label="Email" value={this.state.email} onChange={this.rfa_onChange} /> 
            <Input name="password" label="Password" value={this.state.password} onChange={this.rfa_onChange} /> 
            <div className="buttondiv">
                <Button id="submit" value="Sign In" className="submit-button" />
            </div>
        </form>
        <p className="input-error">{this.state.userNotify.message}</p>
      </div>
    );
  }
}

export default SignIn;
