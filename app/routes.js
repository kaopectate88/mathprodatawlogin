// create a new express router
const express      = require('express'),
  router           = express.Router(),
  mainController   = require('./controllers/main.controller'),
  eventsController = require('./controllers/events.controller');
  profileController = require('./controllers/profile.controller');
var passportOptions = {
	successRedirect: '/profile',
	failureRedirect: '/login'
};

//Function to return user to link they clicked before the login prompted
function complete() {
	if (options.successReturnToOrRedirect) {
		var url = options.successReturnToOrRedirect;
		if (req.session && req.session.returnTo) {
		url = req.session.returnTo;
		delete req.session.returnTo;
		}
		return res.redirect(url);
		}
	if (options.successRedirect) {
	return res.redirect(options.successRedirect);
	}
	next();
}


// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	req.session.returnTo = req.url;
	res.redirect('/login');
}

// route middleware to make sure
function isLoggedIn2(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	req.session.returnTo = req.url;
	res.redirect('/login2');
}


// export router
module.exports = function(app, passport){

// define routes
// main routes



app.get('/', mainController.showHome);







//EXPERT CODE

// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successReturnToOrRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});



// event routes
	app.get('/events', isLoggedIn, require ('permission') (['Expert']), eventsController.showEvents, function(req,res){
		res.render('events.ejs', {
			users: req.user
		});
	});

	// event routes
	app.get('/events', isLoggedIn, require ('permission') (['Expert']), eventsController.showEvents, function(req,res){
		res.render('events.ejs', {
			users: req.user
		});
	});
	

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});



//Customer CODE

// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login2', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login2.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login2', passport.authenticate('local-login', {
		successReturnToOrRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login2', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup2', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});


	// event routes
	app.get('/create', isLoggedIn2, require('permission') (['Customer']), eventsController.showCreate, function(req,res){
		res.render('create.ejs', {
			users: req.user
		});
	});
	

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});






// seed events
app.get('/events/seed',  eventsController.seedEvents);

// create events

app.post('/create', eventsController.processCreate);

// edit events
app.get('/events/:slug/edit', eventsController.showEdit);
app.post('/events/:slug',     eventsController.processEdit);

// delete events
app.get('/events/:slug/delete', eventsController.deleteEvent);

// show a single event
app.get('/events/:slug', eventsController.showSingle);

// route our about page
app.get('/about', function(req, res){
	var users =[
	{name: 'Chester', email: 'anthonypauljohnson@gmail.com', avatar: 'data:image/png;base64,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'},
	{name: 'Craig', email: 'douchebag@gmail.com', avatar: 'data:image/png;base64,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'}
	];
	res.render('pages/about', {users: users });

});







}
