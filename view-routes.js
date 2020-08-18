/// Comments are Notes from tutor

/// In order to add routes in KOA, the easiest thing to do is to use KOA's router.
/// There are no default `.get`/`.post` methods that accept paths.
const Router = require('koa-router');

/// Create a router, this is our exported value as well.
const router = new Router();

// @route: GET /
// @desc:  Render index template
/// lambda notation is mostly interchangeable with anonymous functions
/// this would be defined only slightly differently as a `function`:
/// 			async function (ctx) { ... } 
router.get("/", async (ctx) => {
	/// In KOA, they give you one object, typically named `ctx`
	/// `ctx` is short for context, and contains info about both request and response.
	/// Handlebars is injected into the context object, 
	/// and we can ask it to render a template into the `ctx.body` field with `ctx.render()`
	/// This takes two parameters, the template to render, and the data object to use.
	/// The koaLayout middleware we hooked up automatically adds a data object to the context,
	/// which handlebars injects some information into when it does render a template.
	await ctx.render("index", ctx.data);
	/// When the koaLayout middleware gets control again after any route,
	/// it checks that `ctx.data` object to see if a view was rendered,
	/// and if one was, it wraps that view in the selected default layout.
	
	/// For the API routes, no view gets rendered, 
	/// so the JSON response do not get wrapped in html.
});

// @route: GET /posts
// @desc:  Render posts template
router.get("/posts", async (ctx) => {
	/// Similarly, this renders the "posts" view, and it gets wrapped in the defaultLayout view.
	await ctx.render("posts", ctx.data);
});

/// Assign our exported value
module.exports = router;