import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import { logIn } from '../actions/actions';

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    this.props.dispatch(logIn({username: this.email.value, 
                              password: this.password.value
                       })
            )
  }

  render() {
    if (_.isEmpty(this.props.currentUser)) {
      return (
         <Form horizontal onSubmit={this.submit}>
            <FormGroup controlId="email">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={4}>
                <FormControl inputRef={ref => { this.email = ref; }}
                             type="email" 
                             placeholder="Email" />
              </Col>
            </FormGroup>

            <FormGroup controlId="password">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={4}>
                <FormControl inputRef={ref => { this.password = ref; }}
                             type="password" 
                             placeholder="Password" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={4}>
                <Button type="submit">
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
      )
    }
    return null;
  }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(LogInForm);

