import React from 'react';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <p id="userstate">Signed in as {this.props.user.username}</p>
            <p>Sign Out</p>
            </div>
    )}

}   

export default User;