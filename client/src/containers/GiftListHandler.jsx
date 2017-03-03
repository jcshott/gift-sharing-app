import _ from 'lodash';
import { connect } from 'react-redux';
import { addItem, deleteItem } from '../actions/actions';
import GiftList from '../components/GiftList';

function getByListId(obj, listId) {
    return obj.filter(function(item) { 
      return item.includes(listId)})
}

function mapStateToProps(state, ownProps) {
  // listItems = immutable.List(immutable.Map({}))
    return {
        listItems: state.get('listItems') ? getByListId(state.get('listItems'), _.parseInt(ownProps.params.listId)) : null,
        currentListId: _.parseInt(ownProps.params.listId),
        currentList: state.get('userLists') ? getByListId(state.get('userLists'), _.parseInt(ownProps.params.listId)) : null
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
