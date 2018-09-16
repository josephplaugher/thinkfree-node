import React from 'react';
import * as ReactForm from 'reactform-appco';
import 'css/lightbox.css';
import 'css/form.css';

const Form = ReactForm.Form;
const Input = ReactForm.Input;
const Button = ReactForm.Button;
const ReadOnlyInput = ReactForm.ReadOnlyInput;

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: {}};
    }

    response = (resp) => {
        console.log('data', resp.data);
        if(resp.data.user === 'success')
        this.setState({ user: resp.data.user});
    }

    componentWillMount = () => {
        this.setState({ 
            user: this.props.user
        });
    }

    render() {
        return (
            <div>
                {this.state.user.username ? (
                    <div>
                        <p id="userstate">Signed in as {this.state.user.username} <span className="signout-button" onClick={this.props.logout} >(Sign Out)</span></p>
                    </div>
                ) : (
                    <div className="lightbox-background">                  
                    <div className="lightbox">
                    <div className="form-container">
                            <Form formTitle="Create Username" action="http://localhost:8080/newUser" response={this.response} extraData={ {email: this.state.user.email} } >
                                <Input name="username" label="User name" className="textinput" labelClass="label" errorClass="input-error" />
                                <div className="buttondiv">
                                    <Button id="submit" value="Create Username" className="submit-button"/>
                                </div>

                            </Form>
                            </div>
                        </div>
                        </div>
                    )}
            </div>
        )
    }

}

export default User;