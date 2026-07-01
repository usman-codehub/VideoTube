import { app } from "./app.js"
import connectDB from "./db/index.js"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 4000
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Listening at Port:http://127.0.0.1:${port}`);
        })
    })
    .catch((err) => {
        console.log("MongoDb connection error", err);
    })

