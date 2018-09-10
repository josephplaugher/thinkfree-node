import React from 'react';

class User extends React.Component {
    render() {
        return (
            <p id="userstate">Logged in as {this.props.userData.username}</p>
    )}

}   

export default User;