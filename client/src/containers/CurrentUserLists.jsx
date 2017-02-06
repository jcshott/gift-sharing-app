// import React from 'react';
import { connect } from 'react-redux';
import { addList, removeList } from '../actions';
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
    onRemoveList: (index) => {
        dispatch(removeList(index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLists)
