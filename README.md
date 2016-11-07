# hn-reader

Yet another Hacker News reader.

While another reader is mostly pointless (there are plenty of existing capable ones), this serves as a proof of concept of being able to quickly bootstrap and build a universal react application without having to use Redux or React-Router.

The intent is not to disparage them, but to derive a way to generating universal react applications with the minimal amount of fuss.

This module also serves as a basis of work on [generator-maso][generator-maso-url].

## Web Parsing Mechanics

Clicking on an entry in the sidebar hits the server and tries to parse the HTML at the URL related to the item. If `MERCURY_API_KEY` is present in `process.env`, it makes the appropriate API call, otherwise it uses [node-readability][node-readability-url] to do the parsing.

## Universal musings

* Make sure you set the `<meta charset="utf">` in the html `<head>`, or Universal rendering will bork on reading the JSON state if it has utf-8 characters.
* Formatting time may not be universal - server timezone may not be in sync with client timezone.

[generator-maso-url]: https://npmjs.org/generator-maso
[node-readability-url]: https://npmjs.org/node-redability