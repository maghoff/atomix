var url = require('url');
var Feed = require('feed');

function generateFeed(spec) {
	var feed = new Feed(spec.feed);

	var baseUrl = spec.feed.link;

	spec.posts.forEach(function (post) {
		feed.addItem({
			title: post.title,
			link: url.resolve(baseUrl, post.link),
			description: post.shortdesc,
			date: (post.date && new Date(Date.parse(post.date))) || new Date(),
			image: post.thumbnail && url.resolve(baseUrl, post.thumbnail)
		});
	});

	return feed.render('atom-1.0');
}

exports.generateFeed = generateFeed;
