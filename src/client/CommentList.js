import React from 'react';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const comments = this.props.comments.map( (row) => 
            <div>
            <p key={row.username + "-" + row.commentid}>{row.username}</p>
            <p key={row.commentid}>{row.body}</p>
            </div>
        );

        return (
            comments
    )}

}   

export default CommentList;