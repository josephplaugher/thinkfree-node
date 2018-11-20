import React from 'react';
import * as ReactForm from 'reactform-appco';
import ValRules from 'util/ValRules'
import 'css/lightbox.css';
import 'css/form.css';

const Form = ReactForm.Form;
const Input = ReactForm.Input;
const Button = ReactForm.Button;

class GoogleAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
    }

    response = (resp) => {
        if (resp.success) {
            this.setState({ user: resp.user });
        }
    }

    componentWillMount = () => {
        this.setState({
            user: this.props.user
        });
    }

    render() {

        return (
            <div>
                <Form formTitle="Create Username"
                    action={this.props.url}
                    response={this.props.response}
                    extraData={{ email: this.state.user.email }}
                    valrules={ValRules} >
                    <Input name="username" label="User name" className="textinput" labelClass="label" errorClass="input-error" />
                    <div className="buttondiv">
                        <Button id="submit" value="Create Username" className="submit-button" />
                    </div>
                </Form>
            </div>
        )
    }

}

export default GoogleAuth;