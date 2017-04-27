// import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import ListLink from '../containers/ListLink';
import NewList from './NewList';

// actual component for the list of lists
class UserLists extends React.Component {

    render() {
        if (!this.props.currentUser) {
            return (
                <div>
                    <h2>oops! </h2>
                    <span> Try  <Link to={`/`}> Logging-In! </Link> </span>
                </div>
            )
        }
        return (
            <div>
                <h1>
                    Current Gift Lists
                </h1>
                {this.props.userLists.map((listObj) =>
                    <div key={`list-${listObj.get('id')}`}>
                        <p> {listObj.get('name')}</p>
                        <ListLink listId={listObj.get('id')} key={listObj.get('id')}>
                            <Button>Manage List</Button>
                        </ListLink>
                        <Button onClick={e => {
                            this.props.onRemoveList(listObj.get('id'), this.props.currentUser.get('userId'))
                        }}>Remove List </Button>
                    </div>
                )}
                <NewList onChange={e => {
                    if (e.keyCode === 13) {
                        this.props.onNewListClick(e.target.value, this.props.currentUser.get('userId'));
                        e.target.value = ''
                    }
                }}/>
            </div> )
    }
}

UserLists.propTypes = {
  userLists: PropTypes.object,
  onNewListClick: PropTypes.func,
  onRemoveList: PropTypes.func,
  currentUser: PropTypes.object,

};

export default UserLists
