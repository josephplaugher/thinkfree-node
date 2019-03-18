import React from "react";
import { FormClass, Input, Button } from "reactform-appco";
import ValRules from "util/ValRules";
import "css/lightbox.css";
import "css/form.css";

class NewUser extends FormClass {
  constructor(props) {
    super(props);
    this.useLiveSearch = false;
    this.route = "/newUser";
    this.valRules = ValRules;
    this.state = {
      username: "",
      email: "",
      password: "",
      formData: {
        username: "",
        email: "",
        password: ""
      },
      userNotify: {}
    };
  }

  response(res) {
    // delagate the response to the parent User component
    this.props.response(res.data);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.rfa_onSubmit}>
          <Input
            name="username"
            label="User name"
            className="textinput"
            labelClass="label"
            errorClass="input-error"
            value={this.state.username}
            onChange={this.rfa_onChange}
            error={this.props.userNotify.username}
          />
          <Input
            name="email"
            label="Email"
            className="textinput"
            labelClass="label"
            errorClass="input-error"
            value={this.state.email}
            onChange={this.rfa_onChange}
            error={this.props.userNotify.email}
          />
          <Input
            name="password"
            label="Password"
            className="textinput"
            labelClass="label"
            errorClass="input-error"
            value={this.state.password}
            onChange={this.rfa_onChange}
            error={this.props.userNotify.password}
          />
          <div className="buttondiv">
            <Button
              id="submit"
              value="Create Username"
              className="submit-button"
            />
          </div>
          <br />
          <p className="text">
            We will never share your information without your consent.
          </p>
        </form>
      </div>
    );
  }
}

export default NewUser;
