import webscrape from 'webscrape';
import Promise from 'bluebird';
import read from 'node-readability';

const BASE_URL = 'https://hacker-news.firebaseio.com';
const NEW_STORIES = `${BASE_URL}/v0/newstories.json`;
const GET_ITEM = id => `${BASE_URL}/v0/item/${id}.json`;
const GET_ARTICLE = `https://mercury.postlight.com/parser`;
const API_KEY = process.env.MERCURY_API_KEY;

// returns only { title, content } for now.
async function parse(url) {
	if (API_KEY) {
		const { json: article } = await webscrape().get(GET_ARTICLE, {
			query: { url },
			headers: {
				'x-api-key': API_KEY
			}
		});

		return {
			content: article.content,
			title: article.title
		};
	} else {
		return new Promise((ok, fail) => {
			read(url, (err, article) => {
				if (err) {
					return fail(err);
				}

				return ok({
					content: article.content,
					title: article.title
				});
			})
		});
	}
}

// expected format
// {
//	by: string
//	descendants: ?
//  id: number
//  score: number
//  time: number
//  title: string
//  type: (job|story|comment|poll|pollopt)
//  parent: number
//  kids: []number
//	deleted: bool
//	url: string
// }
export async function getStories() {
	const { json: storyIds } = await webscrape().get(NEW_STORIES);
	const stories = await Promise.all(
		storyIds.slice(0,50).map(getItem)
	);

	return stories;
}

export async function getItem(id) {
	const { json } = await webscrape().get(GET_ITEM(id));
	return json;
}

// expected format
// {
//  title: string
//  content: html
//  date_published: UTC date string
//  lead_image_url: url
//  dek: string
//  url: url
//  domain: url
//  excerpt: string
//  word_count: number
//  direction: ltr
//  total_pages: number
//  rendered_pages: number
//  next_page_url: url
// }
export async function getArticle(url) {
	return await parse(url);
}