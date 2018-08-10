const routes = require('express').Router();
const blog = require('model/blog');
const renderBlog = blog.main;
const viewPostByID = blog.byId;
try{
    routes.get('*', renderBlog);
}catch(Error){
    console.log('error',Error);
}

try{
    routes.get('/postid', viewPostByID);
}catch(Error){
    console.log('error',Error);
}


module.exports = routes;