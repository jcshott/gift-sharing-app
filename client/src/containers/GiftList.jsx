import React from 'react';
import { connect } from 'react-redux';

import NewItem from '../components/NewItem';
import { addItem, deleteItem } from '../actions';

const GiftList = ({listItems, dispatch}) => (
    <div>
        <h1>
            Gift List
        </h1>
        <NewItem onChange={e => {
                if(e.keyCode === 13) {
                    dispatch(addItem(e.target.value))
                    e.target.value=''
                }
            }}/>
        {listItems.map((item, index) =>
            <p key={index}>{item} <button onClick={ e => dispatch(deleteItem(index))}>X</button></p>
        )}
    </div>
)

function mapStateToProps(listItems) {
    return {
        listItems
    }
}

export default connect(mapStateToProps)(GiftList)
