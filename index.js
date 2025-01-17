import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import userRouter from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: "auto" },
  })
);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(userRouter);
app.use(authRouter);

// store.sync();

app.listen(PORT, () => {
  console.log("Server running on port");
});
