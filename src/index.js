require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")

const errorMiddleware = require("./error/ApiError")
const router = require("./routes")

const app = express()
const PORT = process.env.PORT || 5000
const UI_ORIGIN = process.env.UI_ORIGIN || "http://localhost:3000"

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