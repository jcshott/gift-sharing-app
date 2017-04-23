import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import { signIn } from '../actions/actions';


class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.dispatch(signIn(
                        { username: this.username.value,
                          password: this.password.value
                        }));
  }

  renderLogInForm (error) {
      let valid = error ? 'error' : null,
          errorMsg;
      if(valid !== null) {
          errorMsg = <HelpBlock>Password does not match - please try again.</HelpBlock>
      }
      return (
      <div>
          <div className="col-md-offset-3 login">
              <Form horizontal onSubmit={this.submit}>
                  <FormGroup controlId="formBasicText">
                      <Col componentClass={ControlLabel} sm={2}>
                          Username
                      </Col>
                      <Col sm={4}>
                          <FormControl inputRef={ref => { this.username = ref; }}
                                       type="text"
                                       placeholder="Username" />
                      </Col>
                  </FormGroup>

                  <FormGroup controlId="password" validationState={valid}>
                      <Col componentClass={ControlLabel} sm={2}>
                          Password
                      </Col>
                      <Col sm={4}>
                          <FormControl inputRef={ref => { this.password = ref; }}
                                       type="password"
                                       placeholder="Password" />
                          {errorMsg}
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
          </div>
          <span> New to the site?  <Link to={`signup`}> Sign-up for an account! </Link> </span>
      </div>

      );
  }

  render() {
      if (_.isEmpty(this.props.currentUser)) {
          return this.renderLogInForm(this.props.error);
    }
    return null;
  }
}

function mapStateToProps(state) {
    return {
        currentUser: state.get('currentUser'),
        error: state.get('error')
    }
}

export default connect(mapStateToProps)(LogInForm);
