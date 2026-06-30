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
            console.log(`Running at Port:${port}`);
        })
    })
    .catch((err) => {
        console.log("MongoDb connection error", err);
    })

