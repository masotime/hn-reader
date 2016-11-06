import React, { Component, PropTypes } from 'react';
import SidebarItem from 'components/elements/sidebar-item';

const { arrayOf, object, func } = PropTypes;

export default class Sidebar extends Component {
	renderItems() {
		const { items, display } = this.props;

		if (items) {
			return items.map(item => item && 
				(
					<li key={item.id}><SidebarItem {...item} display={display}/></li>
				)
			);
		}
	}

	render() {
		return(
			<ul className="sidebar">
			{ this.renderItems() }
			</ul>
		);
	}
}

Sidebar.propTypes = {
	items: arrayOf(object),
	display: func,
};