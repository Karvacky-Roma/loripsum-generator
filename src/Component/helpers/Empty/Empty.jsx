import React from 'react';
//Styles
import './Empty.scss';

export const Empty = ({emptyContent}) => {
	return <p className="empty">{emptyContent}</p> //display in the absence of content
}