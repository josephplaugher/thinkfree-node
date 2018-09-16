import * as ReactForm from 'reactform-appco';
import React from 'react';
import 'css/form.css'
import 'css/lightbox.css'

const Form = ReactForm.Form;
const Input = ReactForm.Input;
const ReadOnlyInput = ReactForm.ReadOnlyInput;
const Button = ReactForm.Button;

class Login extends React.Component {
  state = {loggedIn:''};


  render() {

    if(this.props.userData) {
      this.setState({ loggedIn: true});
    }

    
    
    return (
      <div className="lightbox-background">
        <div className="lightbox">
          <Form formTitle="Log in to comment" >
            <ReadOnlyInput name="email" label="Email" /><br/>
            <Input name="username" label="Username" />
            <div className="buttondiv">
              <Button id="submit" value="Create Username" />
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login;