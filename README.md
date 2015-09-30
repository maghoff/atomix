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
    ./node_modules/.bin/atomix [spec-file]

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

Full example
------------

Given the following JSON input:

	{
		"feed": {
			"title": "Feed title",
			"description": "Description",
			"link": "http://example.com",
			"author": {
				"name": "Example Com",
				"email": "user@example.com"
			}
		},
		"posts": [
			{
				"link": "first-post",
				"title": "First Post!",
				"shortdesc": "First!"
			}
		]
	}

Atomix will output this Atom feed:

	<?xml version="1.0" encoding="utf-8"?>
	<feed xmlns="http://www.w3.org/2005/Atom">
		<title>Feed title</title>
		<link>http://example.com</link>
		<updated>2015-09-30T10:19:15Z</updated>
		<author>
			<name>Example Com</name>
			<email>user@example.com</email>
		</author>
		<link rel="alternate" href="http://example.com"/>
		<subtitle>Description</subtitle>
		<generator>Feed for Node.js</generator>
		<entry>
			<title type="html"><![CDATA[First Post!]]></title>
			<id>http://example.com/first-post</id>
			<link href="http://example.com/first-post">
			</link>
			<updated>2015-09-30T10:19:15Z</updated>
			<summary type="html"><![CDATA[First!]]></summary>
		</entry>
	</feed>
