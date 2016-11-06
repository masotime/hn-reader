import React, { Component, PropTypes } from 'react';
import Sidebar from 'components/elements/sidebar';
import Article from 'components/elements/article';
import axios from 'axios';

const { string, arrayOf, object } = PropTypes;

export default class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentWillMount() {
		this.setState({
			title: this.props.title,
			body: `<p>${this.props.message}</p>`
		})
	}

	async display(id) {
		const { data: { title, content } } = await axios.get(`/article/${id}`);
		this.setState({
			title,
			body: content,
		});
	}

	render() {
		const { items } = this.props;
		const { title, body } = this.state;

		return (
			<div>
				<Sidebar items={items} display={this.display.bind(this)} />
				<Article title={title} body={body} />
			</div>
		);
	}
}

HomePage.propTypes = {
	title: string,
	message: string,
	items: arrayOf(object)
};