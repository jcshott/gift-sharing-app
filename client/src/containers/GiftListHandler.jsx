// import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addItem, deleteItem } from '../actions/actions';
import GiftList from '../components/GiftList';

function getListItems (listItems, listId) {
    return _.filter(listItems, (item) => item.listId === listId)
}

function mapStateToProps(state, ownProps) {
    return {
        listItems: getListItems(state.listItems, _.parseInt(ownProps.params.listId)),
        currentListId: _.parseInt(ownProps.params.listId),
        currentList: _.filter(state.userLists, (list) => list.id === _.parseInt(ownProps.params.listId))[0]
    }
}

function mapDispatchToProps(dispatch) {
  return {
    onNewItemClick: (name, listId) => {
      dispatch(addItem(name, listId))
  },
    onRemoveItem: (id) => {
        dispatch(deleteItem(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftList)
