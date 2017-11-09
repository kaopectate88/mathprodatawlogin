// load environment variables
require('dotenv').config();

// grab our dependencies
const express    = require('express'),
  app            = express(),
  port           = process.env.PORT || 8080,
  expressLayouts = require('express-ejs-layouts'),
  mongoose       = require('mongoose'),
  bodyParser     = require('body-parser'),
  session        = require('express-session'),
  cookieParser   = require('cookie-parser'),
  passport       = require('passport'),
  passport2       = require('passport'),
  logger         = require('morgan'),
  flash          = require('connect-flash'),


  expressValidator = require('express-validator');

// configure our application ===================
// set sessions and cookie parser
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET, 
  cookie: { maxAge: 60000 },
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}));
app.use(flash());

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

// set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// connect to our database
mongoose.connect(process.env.DB_URI);



//  LOGINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNS


require('./config/passport')(passport); // pass passport for configuration
// set up our express application
app.use(logger('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set('view engine', 'ejs'); // set up ejs for templating
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//END LOGIN CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE



// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// set the routes =============================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// start our server ===========================
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});