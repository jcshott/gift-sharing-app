import React from 'react';
// import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

const NewList  = ({onChange}) => (
    <div>
        <h3>Add A New List</h3>
        <input
          type="text"
          placeholder="Enter List Name"
          onKeyUp={onChange}
        />
    </div>
)

export default NewList;
