import React from 'react';
import 'css/comments.css';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const comments = this.props.comments.map( (row) => 
            <div>
            <p key={row.username + "-" + row.commentid} className="userLabel">{row.username}</p>
            <p key={row.commentid} className="commentBody">{row.body}</p>
            </div>
        );

        return (
            comments
    )}

}   

export default CommentList;