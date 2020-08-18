/// Comments are Notes from tutor
// import dependencies
/// Koa is a replacement for express, it's an application library.
const Koa = require('koa');
/// This following line would normally go into another file- 
/// This is making modifications to Koa's library in order to make it a little more usable.
/// Stick a function into the Koa `class` that allows us to succinctly set up a router.
Koa.prototype.routes = function(router) { this.use(router.routes()).use(router.allowedMethods()); }


/// There are various middlewares that are designed to work with KOA...
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const koaStatic = require('koa-static');
/// This is a small middleware we wrote ourselves to handle wrapping views in layouts
const koaLayout = require('./middleware/koa-layout');

// setup the koa app, similar to express
const app = new Koa();
const PORT = process.env.PORT || 8080;

// require models for syncing
const db = require("./models");

// configure middleware
/// Hooking up middleware is similar to express
/// Many exported middleware modules are functions you call, and pass in configuration,
/// then you pass the value returned by that middleware function into `app.use`
app.use(bodyParser()) 			/// no config
app.use(koaStatic('public'))	/// want to serve files in `./public`
app.use(koaLayout('main'));		/// want to use layout named `./views/layouts/main.handlebars`
								/// The `/layouts/` is implied by our own middleware,
								/// and the `./views/` folder and `.handlebars` extension are configured just below.

// setup handlebars
app.use(views(`${__dirname}/views`, 		/// here, we want to use `./views` directory to store views
	{ extension: 'handlebars'}, 			/// our views are `.handlebars` files,
	{ map: { handlebars: 'handlebars' } }	/// and we want it to use the handlebars library to render `.handlebars` files.
))

// routes
/// Instead of exporting a function that expects an app,
/// each of the routes modules exports a router.
const apiRouter = require("./routes/api-routes.js");
const viewRouter = require("./routes/view-routes.js");




/// Call that function to hook up our routers
app.routes(apiRouter);
app.routes(viewRouter);

// start the server
/// Javascript in node is not "top-level-async"
/// so we have to wrap code we want to be async in an async function:
async function main() {
	
	/// Synchronize with the sql server
	/// sync is a promise (or at least "promise-like");
	await db.sequelize.sync({ force: true });
	
	/// app.listen does not return a promise, so we have to pass a callback to it.
	/// if we wanted, we could further modify Koa so that it would instead return a promise from listen.
	app.listen(PORT, function () {
		/// This callback runs when the server has started.
		console.log("App listening at http://localhost:" + PORT);
	});
	
}
/// then call that async function to kick it off.
main();