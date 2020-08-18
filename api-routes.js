/// Comments are Notes from tutor
/// require our models, this imports the "index.js" file in that directory.
const db = require("../models");
/// In order to add routes in KOA, the easiest thing to do is to use KOA's router.
/// There are no default `.get`/`.post` methods that accept paths.
const Router = require('koa-router');

/// Create a router, this is our exported value as well.
const router = new Router();

// @route: GET /api
// @desc:  Return all blog posts
/// lambda notation is mostly interchangeable with anonymous functions
/// this would be defined only slightly differently as a `function`:
/// 				   async function (ctx) { ... } 
router.get("/api", async (ctx) => {
	/// In KOA, they give you one object, typically named `ctx`
	/// `ctx` is short for context, and contains info about both request and response.
	/// A note about async:
	/// In the instructor's example, the code was:
	///db.Post.findAll({})
	/// 		.then(function (result) { ... });
	/// which is the "old" way of interacting with promises.
	/// in an `async` method/function (as defined above by the async keyword before the parameters list),
	/// the `await` keyword automatically hooks up the code to a `.then() call`
	/// async/await have NOTHING to do with koa, they are a javascript language feature.
	
	const result = await db.Post.findAll({});
	
	/// Whatever is assigned to `ctx.body` at the end of the request
	/// is what is sent back to the requester.
	ctx.body = result;
});

// @route: POST /api
// @desc:  Create a new blog post
router.post("/api", async (ctx) => {
	// destructure request
	///		you can capture multiple values from a single object at once,
	///		rather than doing two similar lines:
	/// const title = ctx.request.body.title;
	/// const body = ctx.request.body.body;
	///		this cuts down on repeated code, 
	///		and makes it easier to capture more fields 
	///		if you know you may need to in the future.
	const { title, body } = ctx.request.body;
	
	/// See if both title and body were provided 
	/// (if undefined or empty strings, values are considered false)
	if (title && body) {
		/// create payload object. Again, this is to cut down on repetition
		/// we could instead do more typing
		/// const payload = { "title": title, "body": body } 
		/// but why type extra when you can express the same thing with less?
		const payload = { title, body };
		
		/// Same as previous, use await to automatically hook up a `.then` callback
		const result = await db.Post.create(payload)
		/// Which will eventually assign something to the body
		ctx.body = result
		
	} else {
		/// Or if either title or body were not provided, respond immediately
		ctx.body = { 
			status: "failed", 
			reason: "body or title was empty" 
		}
	}
});

/// Assign the router as the export.
module.exports = router;
