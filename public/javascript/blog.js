
    /*this block retrieves a list of recent blog entries and displays
    it to the right. Then it checks the url for a blog id and fetches it. 
    on the server side. it fetches the entry if it exists. If it doesn't,
    it fetches the most recent one and displays that instead.  */
    blog = new ajaxCall('blog','getPublishedBlogList','html');
    var bloglist = blog.execQuery();
    bloglist.then(function(data){  
        var urlID = getURLID();
        setCommentArea();
        if(urlID){
            var initData = ({"postid":urlID});
            selectEntry(initData);
        }else{
            selectLatestEntry();
        }
        document.getElementById('bloglist').style.display = "block";
        document.getElementById("bloglist").innerHTML = data; 
    });

    function setCommentArea() {
        user = new ajaxCall('user','isLoggedIn','json');
        var userCheck = user.execQuery();
        userCheck.then(function(data){  
            if(data.loggedin == 'true'){
                console.log('loggining in');
                setUserField(data.username);
                document.getElementById("login-status").style.display = "none";
                document.getElementById("comment-box").style.display = "inline";
            }else{
                document.getElementById("login-status").style.display = "inline";
                document.getElementById("comment-box").style.display = "none";
            }
        })
    }

    function getURLID() {
        var url = new URL(window.location.href);
        var urlID = url.searchParams.get("postid");
        return urlID;
    }

    $(document).on('click','.selectEntry', function() {
        var blogID = ({"postid":$(this).attr('id')});
        selectEntry(blogID);
    });

    document.getElementById("enter-comment").addEventListener("click", enterComment);
    document.getElementById('menu-button').addEventListener("click", toggleBlogList);

    function selectLatestEntry() {
        view = new ajaxCall('blog','getLatestEntry','json');
        var select = view.execQuery();
        select.then(function(data){  
            history.replaceState('','test title','?postid=' + data.entry.postid);
            document.getElementById('viewblog').style.color = "black";
            document.getElementById('viewblog').style.display = "block";
            blogElemPositions(data.entry);
            getComments(data.entry.postid);
        });
    }

    function selectEntry(event) {
        console.log(event.target.id);
        /*
        view = new ajaxCall('blog','getBlogById','json');
        var select = view.execQuery(blogID);
        select.then(function(data){  
            history.replaceState('','test title','?postid=' + data.entry.postid);
            document.getElementById('viewblog').style.color = "black";
            document.getElementById('viewblog').style.display = "block";
            blogElemPositions(data.entry);
            getComments(data.entry.postid);
            if(window.innerWidth < 700) {closeBlogList();}
        });
        */
    }

    function getComments(blogID) {
        var id = ({"postid":blogID});
        comment = new ajaxCall('blog','getComments','html');
        var cl = comment.execQuery(id);
        cl.then(function(data){  
            document.getElementById('comments').style.color = "black";
            document.getElementById('comments').style.display = "block";
            document.getElementById("comments").innerHTML = data; 
        });
    }

    function blogElemPositions(data) {
        document.getElementById("title").innerHTML = data.title; 
        document.getElementById("description").innerHTML = data.description;
        document.getElementById("body").innerHTML = data.body; 
    }

    function enterComment() {
        var input = ({});
        input.text = document.getElementById("newcomment").value; 
        input.postid = getURLID();
        if(input.text){//makes sure there is a comment entered
            comment = new ajaxCall('blog','newComment','json');
            var c = comment.execQuery(input);
            c.then(function(data){  
                var urlID = getURLID();
                getComments(urlID);
                document.getElementById("newcomment").value = '';
            });
        }
    }

    function toggleBlogList() {
        var e = document.getElementById('bloglist-container');
        if(e.style.display == 'block' && window.innerWidth < 700)
           e.style.display = 'none';
        else
           e.style.display = 'block';
     }

    function closeBlogList() {
        document.getElementById ('bloglist-container').style.display = "none";
    }