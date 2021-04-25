# passportexpress
passport.js + express usage example

## Project Structure 
- app.js: main entry point
- db.js: inmemory mock db
- config/passport: configures passport.js authentication providers and add ensure loggin middle ware
- config/session: configuration for session
- routes/ui.js: express routes for a silly ui to test auth callback
- routes/auth.js: express routes for authentication and callbacks

## Run

Create a .env file or add the following envars
```
GOOGLE_CLIENT_SECRET=your_google_client_id
GOOGLE_CLIENT_ID=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_secret
```
Since .env file contains sensitive information it is ignored by .gitignore

Enviroment defaults(that should not be sensitive information) can be configured in .env.defaults

Then run with npm o yarn

## Run with Yarn
```
yarn install
node app.js
```

## Run with NPM
```
npm install
node app.js
```

## Auth flow 
```
get localhost/login (on click sign in) 
get localhost/auth/provider
redirect to provider login prompt -(on provider login success)-> 
get localhost/auth/provider/callback
redirect to localhost/home

```

# TODO/IMPORTANT

* Building and auth service may require finetuned cors configuration between frontend and authservice. In this example ui & auth are under the same domain, so I skip it. 
* Depending on your production enviroment session configuration might require more fine tunning.


# References
For more concrete examples of passport.js usage look at https://github.com/passport passport.js examples like: 
https://github.com/passport/express-4.x-twitter-example et al.


