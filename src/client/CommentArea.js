import React from 'react';
import {Form, Input, Button} from 'reactform-appco';
import Ajax from 'util/ajax';
import SetUrl from './util/SetUrl';
import CommentList from './CommentList';
import 'css/comments.css'

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postid: this.props.postid,
            comments: []
        };
        this.watch = this.watch.bind(this);
    }

    response = (res) => {
        this.updateComments(this.state.postid);
    }

    updateComments = (postid) => {
        const ajax = new Ajax("getComments/"+postid,'');
            ajax.get()
            .then(resp => {
                this.setState({comments: resp.data.comments});
            })
    }

    watch = () => {
        let oldID = this.state.postid;
        let newID = sessionStorage.getItem('thinkfree-postid');
        if(newID !== oldID) {
            this.setState({postid: newID });
            this.updateComments(newID);
        }
    }

    componentDidMount = () => {
        this.updateComments(this.state.postid);
        setInterval( this.watch, 1000);
    }

    render() {
        const extraData = {
            postid: sessionStorage.getItem('thinkfree-postid'),
            username: sessionStorage.getItem('thinkfree-username')
        }

        const url = SetUrl();

        return (
            <div id="comment-container">
                <div>
                    {this.props.user.username ? (
                        <Form formTitle="" action={url} response={this.response} extraData={extraData}>
                            <TextArea name="comment" label="" className="comment-box"/>
                            <div className="buttondiv">
                                <Button id="submit" value="Enter Comment" className="submit-button"/>
                            </div>
                        </Form>
                    ) : (null)}
                </div>
                <div id="comment-list">
                    <CommentList comments={this.state.comments} />
            </div>
            </div>
        )
    }
}

export default User;