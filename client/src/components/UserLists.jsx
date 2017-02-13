import _ from 'lodash';
import React, { PropTypes } from 'react';
import ListLink from '../containers/ListLink';
import NewList from './NewList';

// container element for user's gift lists
const UserLists = function({userLists, onNewListClick, onRemoveList}) {
    return (
    <div>
        <h1>
            Manage Your Current Gift Lists
        </h1>
        <NewList onChange={e => {
                if(e.keyCode === 13) {
                    onNewListClick(e.target.value)
                    e.target.value=''
                }
            }}/>
        {_.map(userLists, (list) =>
            <ListLink listId={list.id} key={list.id}>
                <p key={list.id}> {list.name} <button onClick={e => {onRemoveList(list.id)}}>X</button></p>
            </ListLink>

        )}
    </div>
)}

UserLists.propTypes = {
  userLists: PropTypes.array.isRequired,
  onNewListClick: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired
}

export default UserLists
