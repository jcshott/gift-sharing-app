import _ from 'lodash';
import { connect } from 'react-redux';
import { addItem, removeItem, fetchItems } from '../actions/actions';
import GiftList from '../components/GiftList';

function getByListId(obj, listId) {
    // filter list
    return obj.find(function(obj){return obj.get('id') === listId;});
}

function mapStateToProps(state, ownProps) {
  // listItems = immutable.List(immutable.Map({}))
    return {
        listItems: state.get('listItems'),
        currentListId: _.parseInt(ownProps.params.listId),
        currentList: state.get('userLists') ? getByListId(state.get('userLists'), _.parseInt(ownProps.params.listId)) : null
    }
}

function mapDispatchToProps(dispatch) {
  return {
    onNewItemClick: (description, listId) => {
        dispatch(addItem({description: description}, listId))
    },
    onRemoveItem: (id) => {
        dispatch(removeItem(id))
    },
    onFetchItems: (listId) => {
        dispatch(fetchItems(listId))

    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftList)
