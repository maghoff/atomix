Atomix
======

Atomix is an [Atom][atom] generator that takes a simple JSON format as input. It
was created because Atom is cumbersome to edit directly.

Atomix does not attempt to implement all features of Atom. Instead, it attempts
to be easy to use for simple use cases.

[atom]: https://en.wikipedia.org/wiki/Atom_%28standard%29

Usage
-----

    npm install atomix
    ./node_modules/.bin/atomix [spec]

You can either specify one input file on the command line or give no arguments.
If you give no command line arguments, Atomix will read the JSON spec from
standard in.

The generated Atom feed will be written to standard out.

Specification format
--------------------

The specification JSON looks like this:

	{
		"feed": {
			<Feed-global data>
		},
		"posts": [
			<List of posts>
		]
	}

### Feed-global data ###

	{
		"title": <string>,
		"description": <string>,
		"link": <url>,
		"image": <url>,
		"author": {
			"name": <string>,
			"email": <string>
		}
	}

### List of posts ###

The `"posts"` element is a list of post items. A post item looks like this:

	{
		"link": <relative url>,
		"thumbnail": <relative url>,
		"title": <string>,
		"shortdesc": <string>,
		"date": <timestamp>
	}

The `<relative url>` fields above will be resolved by the generator based on the
URL given in the `"link"` field of the feed global data. This way, you can keep
links to posts on your site short and sweet and independent of your hosting URL
in the specification file, while having them be absolute in the generated Atom
feed. If you need to refer to a post outside of your site, simply put in an
absolute URL.

The format of the `"date"` field is what [`Date.parse`][date.parse] accepts,
which means it accepts typical date formats you see on computers, for example:

 * [RFC3339][rfc3339] formatted dates, the standard date format in Atom feeds:
  `2015-09-30T11:00:00.123Z`
 * Other [ISO 8601][iso8601] formatted dates: `2015-09-30 11:00:00.123Z`
   (But not, apparently, `2009-W53-7` or `20150930`)
 * [RFC2822][rfc2822] formatted dates: `Fri, 21 Nov 1997 09:55:06 -0600`

[date.parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
[rfc2822]: http://tools.ietf.org/html/rfc2822#page-14
[rfc3339]: https://www.ietf.org/rfc/rfc3339.txt
[iso8601]: https://xkcd.com/1179/
