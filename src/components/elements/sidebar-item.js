import React, { Component, PropTypes } from 'react';
import moment from 'moment';

const { string, number, arrayOf, func } = PropTypes;

export default class SidebarItem extends Component {
	render() {
		const { id, by, score, time, title, type, kids, display } = this.props;
		const commentCount = kids ? kids.length : 0;

		return (
			<div className="sidebar-item" onClick={() => display(id)}>
				<span className="type">{type}</span>
				<span className="author">{by}</span>
				<span className="time">{moment(time).format('ddd MMM D HH:mm:ss a')}</span>
				<div className="item-stats">
					<span className="score">{score}</span>
					<span className="comment-count">{commentCount}</span>
				</div>
				<h3>{title}</h3>
			</div>
		);
	}
}

SidebarItem.defaultProps = {
	display: () => {}
}

SidebarItem.propTypes = {
	id: number,
	by: string,
	score: number,
	time: number,
	title: string,
	type: string,
	kids: arrayOf(number),
	url: string,
	display: func
};
