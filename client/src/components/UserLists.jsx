import React, { PropTypes } from 'react';
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
        {userLists.map((list, index) =>
            <p key={index}>{list} <button onClick={e => {onRemoveList(index)}}>X</button></p>
        )}
    </div>
)}

UserLists.propTypes = {
  userLists: PropTypes.object.isRequired,
  onNewListClick: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired
}

export default UserLists
