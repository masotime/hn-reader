// this is the root component
import React, { Component, PropTypes } from 'react';
import Html from 'components/html';
import HomePage from 'components/pages/home';

const { object } = PropTypes;

export default class App extends Component {
	render() {
		const { model } = this.props;
		const { title, message, items } = model;
		return (
			<Html model={model}>
				<HomePage title={title} message={message} items={items} />
			</Html>
		);
	}
}

App.propTypes = {
	model: object
};
