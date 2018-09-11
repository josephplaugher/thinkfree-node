import React from 'react';
import CommentArea from './CommentArea';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = this.props.user;
        return (
            <div>
            <p id="userstate">Logged in as {user.username}</p>
            <CommentArea user={this.props.userData} />
            </div>
    )}

}   

export default User;