#!/usr/bin/env node

var fs = require('fs');
var lib = require('./lib');

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

	console.log(lib.generateFeed(spec));
});
