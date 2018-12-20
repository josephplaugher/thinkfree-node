import React from 'react';
import * as ReactForm from 'reactform-appco';
import ValRules from 'util/ValRules'
import SetUrl from './util/SetUrl'
import 'css/lightbox.css';
import 'css/form.css';

const Form = ReactForm.Form;
const Input = ReactForm.Input;
const Button = ReactForm.Button;

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
    }

    render() {
        const url = SetUrl() + "/signIn";

        return (
            <div>
                <p className="input-error">{this.props.userNotify}</p>
                <Form formTitle="Sign In"
                    action={url}
                    response={this.props.response}
                    valrules={ValRules} >
                    <Input name="email" label="Email" className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="password" label="Password" className="textinput" labelClass="label" errorClass="input-error" />
                    <div className="buttondiv">
                        <Button id="submit" value="Sign In" className="submit-button" />
                    </div>
                </Form>
            </div>
        )
    }

}

export default SignIn;