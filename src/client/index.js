import Ajax from './../util/ajax';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//get the postid of the first blog post that loads if no specific post was in the url
(function () {
  var id = document.getElementById("postid");
  sessionStorage.setItem('thinkfree-postid', id.innerHTML);
  history.replaceState('','','?postid=' + id.innerHTML);; 
})();

function selectPost() {
  let id = this.getAttribute("id");
  var post = new Ajax("selectedPost/"+ id ,'');
  post.get()
    .then((res) => {
      if(res.data.postdata){
        let data = res.data.postdata;
        history.replaceState('','','?postid=' + data.postid); 
        sessionStorage.setItem('thinkfree-postid',data.postid);
        blogElemPositions(data);
        getComments(data.postid);
      }
    })
}

var bloglistItem = document.getElementsByClassName("bloglist");

for (var i = 0; i < bloglistItem.length; i++) {
    bloglistItem[i].addEventListener('click', selectPost, false);
}

function getComments(blogID) {
  var comment = new Ajax("refreshComments/"+ blogID ,'');
  comment.get()
  .then((res) => {
    let cl = res.data.comments;
      document.getElementById('comments').style.color = "black";
      document.getElementById('comments').style.display = "block";
      document.getElementById("comments").innerHTML = cl; 
  });
}

function blogElemPositions(data) {
  document.getElementById("title").innerHTML = data.title; 
  document.getElementById("description").innerHTML = data.description;
  document.getElementById("body").innerHTML = data.body; 
}

ReactDOM.render(<App />, document.getElementById('root'));