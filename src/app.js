import express, { urlencoded } from 'express';
import cors from 'cors';

const app = express();

//  (Middleware)


// Basci Config
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


// CORS Config


app.use(
    cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
}))

app.get('/', (req, res) => {
    res.send("Welcome to app.js")
})

export default app;