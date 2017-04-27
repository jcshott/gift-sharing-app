// import React from 'react';
import { connect } from 'react-redux';
import { addList, removeList } from '../actions/actions';
import UserLists from '../components/UserLists';

function mapStateToProps(state) {
    return {
      // immutable list of objects
        userLists: state.get('userLists'),
        currentUser: state.get('currentUser')
    }
}

function mapDispatchToProps(dispatch) {
  return {
    onNewListClick: (name, userId) => {
        let token = localStorage.getItem('jwtToken');
        dispatch(addList(name, token));
  },
    onRemoveList: (listId, userId) => {
        let token = localStorage.getItem('jwtToken');
        dispatch(removeList(listId, token));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLists)
