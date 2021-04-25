import session from "express-session";

export function configureSession(app) {
  const heroku = process.env.PROD || false;
  let cookie = null;
  if (heroku) {
    app.set("trust proxy", 1);
    cookie = { secure: true, httpOnly: true, sameSite: "none", path: "/" };
  }

  app.use(
    session({
      secret: "cats",
      saveUninitialized: true,
      resave: true,
      proxy: true,
      cookie: cookie,
    })
  );
}
