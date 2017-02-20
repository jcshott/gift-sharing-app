import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import NewItem from './NewItem';

class GiftList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
        <div>
            <h1>
                {this.props.currentList.name} List
            </h1>
            {_.map(this.props.listItems, (item) =>
                  <p key={item.id}> {item.item} <Button bsSize="xsmall" onClick={ e => this.props.onRemoveItem(item.id)}>X</Button> </p>
              )
            }
            <div>
             <NewItem onChange={e => {
                    if(e.keyCode === 13) {
                        this.props.onNewItemClick(e.target.value, this.props.currentListId)
                        e.target.value=''
                    }
                }}/>
              </div>
        </div>
    )
  }
}

GiftList.propTypes = {
  listItems: PropTypes.array.isRequired,
  currentListId: PropTypes.number.isRequired,
  currentList: PropTypes.object.isRequired,
  onNewItemClick: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired
}

export default GiftList;
