import passport from "passport";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import uiRoutes from "./routes/ui.js";
import { configurePassport } from "./config/passport.js";
import { configureSession } from "./config/session.js";
import dotenv from "dotenv-defaults";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
configureSession(app);
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", uiRoutes, authRoutes);

app.listen(port, () => {
  console.log(`listening http://localhost:${port}`);
});
