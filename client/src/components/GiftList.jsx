import _ from 'lodash';
import React, { PropTypes } from 'react';
import NewItem from './NewItem';

const GiftList = function ({listItems, currentListId, onNewItemClick, onRemoveItem}) {
    return (
        <div>
            <h1>
                Gift List
            </h1>
            <NewItem onChange={e => {
                    if(e.keyCode === 13) {
                        onNewItemClick(e.target.value, currentListId)
                        e.target.value=''
                    }
                }}/>
            {_.map(listItems, (item) =>
                    <p key={item.id}> {item.item} <button onClick={ e => onRemoveItem(item.id)}>X</button></p>
                )
            }
        </div>
    )
}

GiftList.propTypes = {
  listItems: PropTypes.array.isRequired,
  currentListId: PropTypes.number.isRequired,
  onNewItemClick: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired
}

export default GiftList;
