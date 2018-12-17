import React from 'react';
import {Form, Input, Button} from 'reactform-appco';
import ValRules from 'util/ValRules'
import 'css/lightbox.css';
import 'css/form.css';

class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div>
                <Form formTitle="Create Username"
                    action={this.props.url}
                    response={this.props.response}
                    valrules={ValRules} >
                    <Input name="username" label="User name" className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="email" label="Email" className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="password" label="Password" className="textinput" labelClass="label" errorClass="input-error" />
                    <div className="buttondiv">
                        <Button id="submit" value="Create Username" className="submit-button" />
                    </div>
                </Form>
            </div>
        )
    }

}

export default NewUser;