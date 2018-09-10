import React from 'react';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = this.props.user;
        return (
            <p id="userstate">Logged in as {user.username}</p>
    )}

}   

export default User;