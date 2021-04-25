import passport from "passport";
import express from "express";

const routes = express.Router();

routes.post(
  "/auth/local",
  passport.authenticate("local", { failureRedirect: "/fail.html" }),
  function (req, res) {
    res.redirect("/home");
  }
);

// GOOGLE
routes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

routes.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/fail" }),
  function (req, res) {
    res.redirect("/home");
  }
);

// FACEBOOK
routes.get("/auth/facebook", passport.authenticate("facebook"));

routes.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/fail" }),
  function (req, res) {
    res.redirect("/home");
  }
);

export default routes;
