import express from "express";
import { ensureLoggedIn } from "../config/passport.js";
const routes = express.Router();

routes.get("/home", ensureLoggedIn(), function (req, res) {
  res.contentType("text/html");
  res.send(`<html>
  <body>
    <h1>Welcome ${req.user.displayName}!</h1>
    <img src="${req.user.photos.length > 0 ? req.user.photos[0].value : ""}"/>
    <h3>Logged with ${req.user.provider}</h3>
    <a href="/logout">logout</a>
  </body>
</html>`);
});

routes.get("/logout", ensureLoggedIn(), function (req, res) {
  req.logout();
  res.redirect("/");
});

routes.get("/fail", function (req, res) {
  res.contentType("text/html");
  res.send(`<html>
  <body>
    Failed!
  </body>
</html>
`);
});

routes.get("/", function (req, res) {
  res.contentType("text/html");
  res.send(`<html>
  <body>
    <div>
      <h1>Custom</h1>
      <form action="/auth/local" method="post">
        <div>
          <label>Username:</label>
          <input type="text" name="username"/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password"/>
        </div>
        <div>
          <input type="submit" value="Log In"/>
        </div>
      </form>
    </div>
    <ul>
     <li>
      <a href="/auth/google">Sign In with Google</a>
     </li>
     <li>
      <a href="/auth/facebook">Sign In with Facebook</a>
     </li>
    </ul>
  </body>
</html>
`);
});

export default routes;
