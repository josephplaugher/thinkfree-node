import Ajax from './../util/ajax';
//import User from './user';

//const onSignIn = User.onSignIn();

//onSignIn(googleUser);

function onSignIn(googleUser) {
  console.log('getting token...');
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
};


function selectPost() {
  let id = this.getAttribute("id");
  var post = new Ajax("selectedPost/"+ id ,'');
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
