import React from 'react';
import { Link } from 'react-router';

const CurrentListLink = ({listId, children}) => (
    <Link to={`${listId}`}>
        {children}
    </Link>
)

export default CurrentListLink;
