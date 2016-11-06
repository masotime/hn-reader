import React, { Component, PropTypes } from 'react';

const { string } = PropTypes;

export default class Article extends Component {
	render() {
		const { title, body } = this.props;
		return (
			<article>
				<h1>{title}</h1>
				<div className="article-body" dangerouslySetInnerHTML={
					{ __html: body }
				} />
			</article>
		);
	}
}

Article.propTypes = {
	title: string,
	body: string
};
