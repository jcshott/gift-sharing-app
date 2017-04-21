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
      dispatch(addList({name: name,
                        userId: userId
                        })
      )
  },
    onRemoveList: (listId, userId) => {
        dispatch(removeList({listId: listId,
                             userId: userId
                            })
        )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLists)
