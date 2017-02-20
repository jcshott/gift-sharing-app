import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import ListLink from '../containers/ListLink';
import NewList from './NewList';

// actual component for the list of lists
const UserLists = function({userLists, onNewListClick, onRemoveList}) {
    return (
    <div>
        <h1>
            Current Gift Lists
        </h1>
        {_.map(userLists, (list) =>
            <div key={`list-${list.id}`}>
                <p> {list.name}</p>
                 <ListLink listId={list.id} key={list.id}>
                    <Button>Manage List</Button> 
                </ListLink>
                <Button onClick={e => {onRemoveList(list.id)}}>Remove List </Button>
            </div>
        )}
         <NewList onChange={e => {
                if(e.keyCode === 13) {
                    onNewListClick(e.target.value)
                    e.target.value=''
                }
            }}/>
    </div>
)}

UserLists.propTypes = {
  userLists: PropTypes.array.isRequired,
  onNewListClick: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired
}

export default UserLists
