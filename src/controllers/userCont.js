const routes = require('express').Router();
const user = require('./model/login');
const newAccount = require('./model/newUser');
const login = user.login;
const logout = user.logout;
const newUser = newAccount.newUser;

routes.post('/login', login);
routes.post('/logout', logout);
routes.post('/newUser', newUser);

module.exports = routes;