import React from 'react';
import {Button} from 'reactform-appco'
import 'css/lightbox.css';
import 'css/form.css';

class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribedState: ''
        };
        this.setSubscribeState = this.setSubscribeState.bind(this);
        this.setSubscribeState();
    }

    setSubscribeState = () => {
        if(this.props.user.subscribed === true) {
            this.setState({subscribedState: true});
        } else {
            this.setState({subscribedState: true});
        }
    }

    render() {
        
        return (
            <div className="lightbox-background">
                <div className="usermenu-lightbox">
                    <span className="close-button" onClick={this.props.hideMenu}>x</span>
                    <p>
                        {this.props.user.subscribed ? (
                            <p>You are subscribed</p>
                        ) : (
                            <p>You are not subscribed</p>
                        )}
                    </p>
                    <span className="signout-button" 
                        onClick={this.props.updateSubscribed} >
                        {this.props.user.subscribed ? (
                            <Button value="Unsubscribe" className="submit-button"/>
                        ) : (
                            <Button value="Subscribe" className="submit-button"/>
                        )}
                    </span>
                    <Button className="submit-button" onClick={this.props.logout} value="Sign Out"/>
                </div>
            </div>
        )
    }
}

export default UserMenu;