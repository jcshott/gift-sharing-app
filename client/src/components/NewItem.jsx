import React from 'react';

const NewItem  = ({onChange}) => (
    <div>
        <h3>Add Item to List</h3>
        <input type='text' onKeyUp={onChange} />
    </div>
)

export default NewItem;
