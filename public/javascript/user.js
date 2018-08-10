function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    validateGoogleUser(id_token);
  }

function validateGoogleUser(id_token) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+id_token);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        var body = JSON.parse(xhr.responseText);
        loginGoogleUser(body.email);
    };
    xhr.send({'id_token':id_token});
}

function loginGoogleUser(email) {
    var newUserEmail = email;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../../model/sscont.php?class=user&method=loginGoogleUser&email='+ email);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        resp = JSON.parse(xhr.responseText);
        if(resp.existingGoogleUser === false){
            showUserNameField(newUserEmail);
        }else if(resp.existingGoogleUser.username){
            setUserField(resp.existingGoogleUser.username);
            setCommentArea();
        }
    };
    xhr.send();
}

    function showUserNameField(email) {
        console.log('showing username form...');
        document.getElementById('authenticate').style.display = 'block';
        document.getElementById('New_User').style.display = 'block';
        document.getElementById('email').value = email;
    }

    function setUserField(username) {
        document.getElementById('currentUser').innerHTML = 'signed in as ' + username + ' <div id="signout">(sign out)</div>';
        document.getElementById('signout').addEventListener('click', signOut);
    }

    function signOut() {
        user = new ajaxCall('user','signOut','json');
        var signOut = user.execQuery();
        signOut.then(function(data){  
            document.getElementById('currentUser').innerHTML = '';
            setCommentArea();
        });

        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        });
    }

function validateGoogleUser(id_token) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+id_token);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        var body = JSON.parse(xhr.responseText);
        loginGoogleUser(body.email);
    };
    xhr.send({'id_token':id_token});
}

function loginGoogleUser(email) {
    var newUserEmail = email;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../../model/sscont.php?class=user&method=loginGoogleUser&email='+ email);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        resp = JSON.parse(xhr.responseText);
        if(resp.existingGoogleUser === false){
            showUserNameField(newUserEmail);
        }else if(resp.existingGoogleUser.username){
            setUserField(resp.existingGoogleUser.username);
            setCommentArea();
        }
    };
    xhr.send();
}
    
    function showUserNameField(email) {
        document.getElementById('authenticate').style.display = 'block';
        document.getElementById('New_User').style.display = 'block';
        document.getElementById('email').value = email;
    }

    document.getElementById('createAccount').addEventListener('click', function() {
        var email = document.getElementById('email').value;
        var username = document.getElementById('username').value;
        var subscribe = document.getElementById('subscribe').value;
        if(!(email && username)){
            document.getElementById('usernotify').style.color = "red";
            document.getElementById('usernotify').innerHTML = 'Username and email are required';
        }else{
        var xhr = new XMLHttpRequest();
            var input = 'email='+ email 
            +'&username='+ username
            +'&subscribe='+ subscribe;
            xhr.open('POST', '../../model/sscont.php?class=newuser&method=createUserName');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(input);
            xhr.onload = function() {   
                var body = JSON.parse(xhr.responseText);
                onSigninAttempt(body);
            };
        }
    });

    function onSigninAttempt(resp){
        if(typeof resp.success !== 'undefined'){
            document.getElementById('usernotify').style.color = "green";
            document.getElementById('usernotify').style.fontSize = "20px";
            document.getElementById('usernotify').style.display = "block";
            document.getElementById('usernotify').innerHTML = resp.success;
            document.getElementById('currentUser').innerHTML = 'signed in as ' + resp.username + ' <div id="signout">(sign out)</div>';
            document.getElementById('signout').addEventListener('click', signOut);
            setCommentArea();
        }else if(typeof resp.error !== 'undefined'){
            document.getElementById('usernotify').style.color = "red";
            document.getElementById('usernotify').innerHTML = resp.error;
        }
    }

    function setUserField(username) {
        document.getElementById('currentUser').innerHTML = 'signed in as ' + username + ' <div id="signout">(sign out)</div>';
        document.getElementById('signout').addEventListener('click', signOut);
    }

function signOut() {
    user = new ajaxCall('user','signOut','json');
    var signOut = user.execQuery();
    signOut.then(function(data){  
        document.getElementById('currentUser').innerHTML = '';
        setCommentArea();
    });

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
}

document.getElementById('closeNewUserForm').addEventListener('click', function(){
    document.getElementById('New_User').style.display = "none";
    document.getElementById('authenticate').style.display = "none";
    document.getElementById('usernotify').innerHTML = '';
    document.getElementById('email').value = '';
})
