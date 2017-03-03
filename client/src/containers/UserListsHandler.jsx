// import React from 'react';
import { connect } from 'react-redux';
import { addList, removeList } from '../actions/actions';
import UserLists from '../components/UserLists';

function mapStateToProps(state) {
    return {
      // immutable list of objects
        userLists: state.get('userLists')
    }
}

function mapDispatchToProps(dispatch) {
  return {
    onNewListClick: (name) => {
      dispatch(addList(name))
  },
    onRemoveList: (listId) => {
        dispatch(removeList(listId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLists)
