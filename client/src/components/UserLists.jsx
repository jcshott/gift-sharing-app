// import _ from 'lodash';
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
        {userLists.map((listObj) =>
            <div key={`list-${listObj.get('id')}`}>
                <p> {listObj.get('name')}</p>
                 <ListLink listId={listObj.get('id')} key={listObj.get('id')}>
                    <Button>Manage List</Button> 
                </ListLink>
                <Button onClick={e => {onRemoveList(listObj.get('id'))}}>Remove List </Button>
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
  userLists: PropTypes.object.isRequired,
  onNewListClick: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired
}

export default UserLists
