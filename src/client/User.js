import React from 'react';
import GoogleAuth from './GoogleAuth'
import SignIn from './SignIn'
import NewUser from './NewUser'
import 'css/lightbox.css';
import 'css/form.css';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const url = process.env.BASE_URL + "/newUser";

        return (
            <div>
                {this.props.user.username ? (
                    <div>
                        <p id="userstate">Signed in as {this.props.user.username} <span className="signout-button" onClick={this.props.logout} >(Sign Out)</span></p>
                    </div>
                ) : (
                        <div className="lightbox-background">
                            <div className="lightbox">
                            <span className="close-button" onClick={this.props.close}>x</span>
                                <div>
                                    {this.props.authForm === 'sign-in' ? ( <SignIn response={this.props.signInResponse}/> )
                                    : this.props.authForm === 'new-user' ? ( <NewUser url={url} response={this.props.signInResponse}/> )
                                    : this.props.authForm === 'google' ? ( <GoogleAuth url={url} response={this.props.signInResponse}/> ) 
                                    : null
                                    }
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        )
    }

}

export default User;