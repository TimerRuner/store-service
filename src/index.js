require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const errorMiddleware = require("./error/ApiError")
const router = require("./routes")

const app = express()
const PORT = process.env.PORT || 5000
const UI_ORIGIN = process.env.UI_ORIGIN || "http://localhost:3000"

app.use(require('express-session')({ secret: process.env.JWT_SECRET, resave: true, saveUninitialized: true }));
// app.use(cors({
//     origin: UI_ORIGIN,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use("/api", router)

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Configure the Google Strategy
passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECTRET,
        callbackURL: process.env.CLIENT_CALLBACK // Adjust the URL accordingly
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        return done(null, profile);
    }));

// Serialize and deserialize user data
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
app.use(errorMiddleware)


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () =>
            console.log(`Server starts at http://localhost:${PORT}`)
        )
    } catch (e) {
        console.error(e.message)
    }
}

start()