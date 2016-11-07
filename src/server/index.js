import express from 'express';
import { PORT } from 'common/constants';

import { guard } from 'common/utils';

// bundling of bundle.js
import bundler from 'server/bundler';

// React stuff
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from 'components';

// static files
import { join } from 'path';

// data access
import { getStories, getItem, getArticle } from 'server/data-access';

const app = express();

app.use('/static', express.static(join(process.cwd(), 'static')));
app.use(bundler());

app.get('/', guard(async (req, res) => {
	const model = {
		title: 'Yet another Hacker News reader',
		message: 'Click an article on the left to view it'
	};

	const stories = await getStories();
	model.items = stories;

	res.status(200).end(`<!DOCTYPE HTML>${renderToString(<App model={model} />)}`);
}));

app.get('/article/:id', guard(async (req, res) => {
	const story = await getItem(req.params.id);
	if (story.url) {
		let { title, content } = (await getArticle(story.url) || {});
		if (!title) {
			title = 'Could not load article';
			content = `<a href="${story.url}" target="_blank">Try opening it directly</a>`;
		}

		res.json({ title, content });
	} else {
		res.json({
			title: 'There is no URL for this story',
			content: ''
		});
	}
}));

app.listen(process.env.PORT || PORT, () => console.log(`✅  Web server started at http://localhost:${PORT}`));