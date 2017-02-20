import React from 'react';
import { Link } from 'react-router';

const ListLink = ({listId, children}) => (
    <Link to={`lists/${listId}`}>
        {children}
    </Link>
)

export default ListLink;
