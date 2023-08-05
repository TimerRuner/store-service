const {Router} = require("express")
const Auth = require("../controller/auth.controller")
const passport = require('passport');

const authRoute = new Router()

authRoute.post("/login", Auth.login)
authRoute.post("/registration", Auth.registration)
authRoute.post("/logout", Auth.logout)
authRoute.get("/refresh", Auth.refresh)
authRoute.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRoute.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), Auth.googleCallback);

module.exports = authRoute