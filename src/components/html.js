import React, { Component, PropTypes } from 'react';
import {
	BUNDLE_PATHNAME,
	SHARED_STATE_NAME,
	STYLESHEET_PATHNAME,
} from 'common/constants';

const { node, oneOfType, arrayOf, object } = PropTypes;

export default class Html extends Component {
	render() {
		const { model, children } = this.props;
		const { title } = model;
		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<link rel="stylesheet" href={STYLESHEET_PATHNAME} />
					<title>{title}</title>
				</head>
				<body>
					{children}
					<script type="text/javascript" dangerouslySetInnerHTML={
						{ __html: `window.${SHARED_STATE_NAME} = ${JSON.stringify(model)}` }
					}></script>
					<script src={BUNDLE_PATHNAME}></script>
				</body>
			</html>
		);
	}
}

Html.propTypes = {
	model: object,
	children: oneOfType([node, arrayOf(node)])
};
