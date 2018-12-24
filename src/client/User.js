import React from 'react';
import GoogleAuth from './GoogleAuth'
import SignIn from './SignIn'
import NewUser from './NewUser'
import UserMenu from './UserMenu'
import SetUrl from './util/SetUrl'
import 'css/lightbox.css';
import 'css/form.css';
import 'css/usermenu.css';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showUserMenu: false};
        this.showUserMenu = this.showUserMenu.bind(this);
        this.hideUserMenu = this.hideUserMenu.bind(this);
    }

    showUserMenu = () => {
        this.setState({showUserMenu: true});
    }

    hideUserMenu = () => {
        this.setState({showUserMenu: false});
    }
    render() {
        const url = SetUrl();
        
        return (
            <div>
            {this.props.user.username ? (
                <div>
                    <div>
                        <p id="userstate" className="user-menu-area">Signed in as {this.props.user.username}</p>
                        <div id="user-menu-button" className="user-menu-area" onClick={this.showUserMenu}>
                            <div className="user-menu-bar"></div>
                            <div className="user-menu-bar"></div>
                        </div>
                    </div>
             
                    {this.state.showUserMenu ? (
                        <div>
                        <UserMenu 
                            hideMenu={this.hideUserMenu}
                            logout={this.props.logout}
                            user={this.props.user}
                            updateSubscribed={this.props.updateSubscribed}
                        />
                        </div>
                    ) : (null)}
                </div>
            ) : (
            <div>
            <div className="lightbox-foundation">
            {/*this div intentionally empty. Allows the light box content to scroll */}     
            </div>  
            <div className="lightbox-background">
                <div className="lightbox">
                    <span className="close-button" onClick={this.props.close}>x</span>
                    <div>
                    {this.props.authForm === 'sign-in' ? ( <SignIn response={this.props.signInResponse} userNotify={this.props.userNotify}/> )
                    : this.props.authForm === 'new-user' ? ( <NewUser url={url} response={this.props.signInResponse} userNotify={this.props.userNotify}/> )
                    : this.props.authForm === 'google' ? ( <GoogleAuth url={url} response={this.props.signInResponse} userNotify={this.props.userNotify}/> ) 
                    : null
                    }
                    </div>
                </div>
            </div>
            </div>
                    )}
            </div>
        )
    }

}

export default User;