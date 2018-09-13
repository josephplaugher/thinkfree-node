import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import { browserHistory } from 'react-router';
import * as ReactForm from 'reactform-appco';
import Ajax from './../util/ajax';
import CommentList from './CommentList';

const Form = ReactForm.Form;
const TextArea = ReactForm.TextArea;
const Button = ReactForm.Button;

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
        console.log('postid: ', postid);
       // let postdata = {postid: postid};
        const ajax = new Ajax("getComments/"+postid,'');
            ajax.get()
            .then(resp => {
                this.setState({comments: resp.data.comments});
                console.log('comments: ', resp.data.comments);
            })
    }

    watch = () => {
        console.log('watch...');
        let oldID = this.state.postid;
        let newID = sessionStorage.getItem('thinkfree-postid');
        if(newID !== oldID) {
            this.setState({postid: newID });
            this.updateComments(newID);
        }
    }

    componentDidMount = () => {
        setInterval( this.watch, 1000);
    }

    render() {
        const extraData = {
            postid: sessionStorage.getItem('thinkfree-postid'),
            username: sessionStorage.getItem('thinkfree-username')
        }

        return (
            <div>
                <div>
                    {this.props.user.username ? (
                        <Form formTitle="Comment" action="http://localhost:8080/newComment" response={this.response} extraData={extraData}>
                            <TextArea name="comment" label="" />
                            <div className="buttondiv">
                                <Button id="submit" value="Enter Comment" />
                            </div>
                        </Form>
                    ) : (null)}
                </div>
                <div>
                    <CommentList comments={this.state.comments} />
            </div>
            </div>
        )
    }
}

export default User;