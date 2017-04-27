import _ from 'lodash';
import React, {PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import NewItem from './NewItem';


class GiftList extends React.Component {

  componentDidMount(){
      this.props.onFetchItems(this.props.currentListId);
  }

  render() {
      if (_.isEmpty(this.props.listItems)) {
          return (
              <div>Looking up list</div>
          )
      }
    return (
        <div>
            <h1>
                {this.props.currentList.get('name')} List
            </h1>
            {this.props.listItems.map((item) =>
                  <p key={item.get('id')}> {item.get('description')} <Button bsSize="xsmall"
                                                                             onClick={ e => this.props.onRemoveItem(item.get('id'), this.props.currentListId)}>X</Button>
                  </p>
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
  listItems: PropTypes.object,
  currentListId: PropTypes.number,
  currentList: PropTypes.object,
  onNewItemClick: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onFetchItems: PropTypes.func
};

export default GiftList;
