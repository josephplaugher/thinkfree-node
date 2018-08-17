import Ajax from './../util/ajax';

function selectPost() {
  let id = this.getAttribute("id");
  console.log('the clicked id: ', id);
  var ajax = new Ajax('selectPost','');
  ajax.get("http://localhost:8081/"+ this.url + "/")
    .then((res) => {
      if(res.data.success){
        
      }
    })
}

var bloglistItem = document.getElementsByClassName("bloglist");
console.log('elem', bloglistItem);
var getId = function() {

  var id = this.getAttribute("id");
    alert('id clicked: ',id);
};

for (var i = 0; i < bloglistItem.length; i++) {
    bloglistItem[i].addEventListener('click', selectPost, false);
}