$(function () {
	let title = ''
	let body = ''

	const createPost = payload => {
		$.ajax({
			method: "POST", //this is what method we request.
			url: "/api", //this is the rout on the server we want to hit
			data: payload //this is what the server receives as body 
		}).then(() => {
			// reset form inputs
			$("#title").val("")
			$("#body").val("")

			// navigate to "/posts"
			window.location.href = "/posts"
		}).catch(err => console.log(err))
	}

	const fetchPosts = () => {
		$.ajax({
			method: "GET", // this is what method we request
			url: "/api" //this is the rout on the server we want to hit
		}).then(posts => {
			console.log(posts)
			
			$("#blogPost").empty()

			// append new node for each post
			posts.forEach(post => {
				console.log(post)
				// destructure post
				const {
					title,
					body,
					createdAt
				} = post

				// format post as note card.
				
				const listItem = `
					<li>
						<a href="#">
							<h5>${title}</h5>
							<p>${moment(createdAt).fromNow()}</p>
							<p> ${body}</p>
						</a>
					</li>
				`;

				// append card to dom
				$("#blogPosts").append(listItem)
			})
		}).catch(err => console.log(err))
	}

	// handle change event for my title input
	$("#title").on("change", event => {
		// destructure event
		title = event.target.value
	})

	// handle change event for my body input
	$("#body").on("change", event => {
		// destructure event
		body = event.target.value
	})

	// handle submit event
	$("form").on("submit", event => {
		// prevent default
		event.preventDefault()

		// create payload
		const payload = {
			title: title,
			body: body
		}

		// create post
		createPost(payload)
	})

	// fetch posts
	fetchPosts()
})
