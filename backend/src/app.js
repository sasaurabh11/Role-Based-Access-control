import Express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = Express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//middlewares
app.use(Express.json({limit: "16kb"}))
app.use(Express.urlencoded({extended: true, limit: "16kb"}))
app.use(Express.static("Public"))
app.use(cookieParser()) 

//route import
import userRouter from "./routes/user.router.js"
import rolesRouter from "./routes/roles.router.js"
import accountRouter from "./routes/account.router.js"

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/roles", rolesRouter)
app.use("/api/v1/account", accountRouter)

app.get('/', (req, res) => {
    res.send("@saurabh")
})

export { app } 