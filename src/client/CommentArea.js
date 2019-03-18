import React from "react";
import { FormClass, Input, Button, TextArea } from "reactform-appco";
import Ajax from "./util/Ajax";
import SetUrl from "./util/SetUrl";
import ValRules from "util/ValRules";
import CommentList from "./CommentList";
import "css/comments.css";

class CommentArea extends FormClass {
  constructor(props) {
    super(props);
    this.useLiveSearch = false;
    this.route = "/newComment";
    this.valRules = ValRules;
    this.state = {
      postid: this.props.postid,
      comments: [],
      comment: "",
      formData: { comment: "" }
    };
    this.extraData = {
      postid: sessionStorage.getItem("thinkfree-postid"),
      username: sessionStorage.getItem("thinkfree-username")
    };
    this.watch = this.watch.bind(this);
  }

  response = res => {
    this.updateComments(this.state.postid);
  };

  updateComments = postid => {
    Ajax.get(SetUrl() + "/getComments/" + postid).then(resp => {
      this.setState({ comments: resp.data.comments });
    });
  };

  watch = () => {
    let oldID = this.state.postid;
    let newID = sessionStorage.getItem("thinkfree-postid");
    if (newID !== oldID) {
      this.setState({ postid: newID });
      this.updateComments(newID);
    }
  };

  componentDidMount = () => {
    this.updateComments(this.state.postid);
    setInterval(this.watch, 1000);
  };

  render() {
    return (
      <div id="comment-container">
        <>
          {this.props.user.username ? (
            <>
              {/* prettier-ignore */}
              <form onSubmit={this.rfa_onSubmit} >
              <TextArea name="comment" label="" className="comment-box" value={this.state.comment} onChange={this.rfa_onChange}/>
              <div className="buttondiv">
                <Button id="submit" value="Enter Comment" className="submit-button" />
              </div>
            </form>
            </>
          ) : null}
        </>
        <div id="comment-list">
          <CommentList comments={this.state.comments} />
        </div>
      </div>
    );
  }
}

export default CommentArea;
