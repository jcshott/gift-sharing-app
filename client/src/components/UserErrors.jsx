import React, { PropTypes } from 'react';
import { Alert } from 'react-bootstrap';
import {
    ERROR_MESSAGES,
} from '../constants/errors';

// actual component for the list of lists
class UserErrors extends React.Component {
    render() {
        if (this.props.error) {
            return (
                <Alert bsStyle="danger">
                    <h4>oops!</h4>
                    <p> {ERROR_MESSAGES[this.props.error]}</p>
                </Alert>
            );
        }
        return null;
    }
}

UserErrors.propTypes = {
    error: PropTypes.string,
};

export default UserErrors
