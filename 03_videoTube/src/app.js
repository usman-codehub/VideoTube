import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express()

// CORS (common Middlewares)

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// Import Routes

import healthCheckRouter from "./routes/healthCheck.route.js"


// Routes

app.use("/api/v1/healthcheck", healthCheckRouter)

export { app };