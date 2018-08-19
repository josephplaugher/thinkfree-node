import Ajax from './../util/ajax';


function selectPost() {
  let id = this.getAttribute("id");
  var post = new Ajax("http://localhost:8081/selectedPost/"+ id ,'');
  post.get()
    .then((res) => {
      if(res.data.postdata){
        let data = res.data.postdata;
        history.replaceState('','test title','?postid=' + data.postid); 
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
  var comment = new Ajax("http://localhost:8081/refreshComments/"+ blogID ,'');
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