import React from 'react';

const NewItem  = ({onChange}) => (
    <div>
        <input type='text' onKeyUp={onChange} />
    </div>
)

export default NewItem;
