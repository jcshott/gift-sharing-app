// import React from 'react';
import { connect } from 'react-redux';
import { addList, removeList } from '../actions/actions';
import UserLists from '../components/UserLists';

function mapStateToProps(state) {
    return {
        userLists: state.userLists
    }
}

function mapDispatchToProps(dispatch) {
  return {
    onNewListClick: (name) => {
      dispatch(addList(name))
  },
    onRemoveList: (id) => {
        dispatch(removeList(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLists)
