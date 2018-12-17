import SetUrl from './util/SetUrl';
import Ajax from 'util/ajax';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//get the postid of the first blog post that loads if no specific post was in the url
(function () {
  var id = document.getElementById("postid");
  var url = parseInt(id.innerText);
  sessionStorage.setItem('thinkfree-postid', url);
  history.replaceState('','','?postid=' + url);
})();

function selectPost() {
  let id = this.getAttribute("id");
  var post = new Ajax(SetUrl() + "selectedPost/"+ id ,'');
  post.get()
    .then((res) => {
        let data = res.data.postdata;
        history.replaceState('','','?postid=' + data.postid); 
        sessionStorage.setItem('thinkfree-postid',data.postid);
        blogElemPositions(data);
        toggleBlogList();
    })
}

document.getElementById('menu-button').addEventListener("click", toggleBlogList);
var bloglistItem = document.getElementsByClassName("bloglist");

for (var i = 0; i < bloglistItem.length; i++) {
    bloglistItem[i].addEventListener('click', selectPost, false);
}

function blogElemPositions(data) {
  document.getElementById("title").innerHTML = data.title; 
  document.getElementById("description").innerHTML = data.description;
  document.getElementById("body").innerHTML = data.body; 
}

function toggleBlogList() {
  var e = document.getElementById('bloglist-container');
  if(e.style.display == 'block' && window.innerWidth < 700)
     e.style.display = 'none';
  else
     e.style.display = 'block';
}

//render the react portion of the site
ReactDOM.render(<App />, document.getElementById('root'));