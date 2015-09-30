#!/usr/bin/env node

var fs = require('fs');
var url = require('url');
var Feed = require('feed');

var input;
if (process.argv.length === 2) {
	input = process.stdin;
} else if (process.argv.length === 3) {
	input = fs.createReadStream(process.argv[2], 'r');
} else {
	console.error("Usage: " + process.argv.slice(0, 2).join(' ') + " spec-file");
	console.error("   or: " + process.argv.slice(0, 2).join(' ') + " < spec-file");
	process.exit(1);
}

var inputBuffers = [];

input.on('readable', function () {
	inputBuffers.push(input.read());
});
input.on('end', function () {
	var buffer = inputBuffers.join('');
	var spec = JSON.parse(buffer);

	console.log(generateFeed(spec));
});

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
