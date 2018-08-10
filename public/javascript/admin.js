
    var loggedIn = sessionStorage.getItem('thinkfree-username');
    if(loggedIn === 'Friedman Smith'){
        document.getElementById('authenticate').style.display = "none";
        document.getElementById('Sign_In').style.display = "none";
        document.getElementById('container').style.display = "inline";
    }

    function getBlogs() {
    blog = new ajaxCall('blog','getAllBlogList','html');
    var bloglist = blog.execQuery();
    bloglist.then(function(data){  
        document.getElementById("bloglist").display = 'block';
        document.getElementById("bloglist").style.color = 'black';
        document.getElementById("bloglist").innerHTML = data; 
    });
    }

    getBlogs();

    $(document).on('click','.selectEntry', function() {
        var blogID = ({"postid":$(this).attr('id')});
        selectEntry(blogID);
    });

    document.getElementById('publishPost').addEventListener('click',function publishPost() {
        console.log('publish...');
        var postID = document.getElementById('postid').value;
        var input = ({"postid": postID}); 
        view = new ajaxCall('blog','publish','json');
        var select = view.execQuery(input);
        select.then(function(data){  
            document.getElementById("postid").value = data.postid; 
            document.getElementById("usernotify").style.display = "block";
            blogElemPositions(data);
        });
    });

    document.getElementById('savePost').addEventListener('click',function savePost() {
        console.log('saving...');
        tinyMCE.triggerSave();
        var data = ({
            postid:document.getElementById("postid").value,
            title:document.getElementById("title").value,
            description:document.getElementById("description").value,
            body:document.getElementById("body").value});
        
        var postID = document.getElementById('postid').innerHTML;
        view = new ajaxCall('blog','saveBlogPost','json');
        var select = view.execQuery(data);
        select.then(function(data){  
            document.getElementById("postid").value = data.postid; 
            document.getElementById("usernotify").style.display = "block";
            document.getElementById("usernotify").innerHTML = data.newpost;
        });
    });

    function selectEntry(blogID) {
        view = new ajaxCall('blog','getBlogById_admin','json');
        var select = view.execQuery(blogID);
        select.then(function(data){  
            document.getElementById("viewblog").style.color = 'black';
            document.getElementById("viewblog").style.display = 'block';
            blogElemPositions(data.entry);
        });
    }

    function blogElemPositions(data) {
        document.getElementById("postid").value = data.postid; 
        document.getElementById("published").value = data.published; 
        document.getElementById("title").value = data.title; 
        document.getElementById("description").value = data.description;
        tinyMCE.activeEditor.setContent(data.body);
    }