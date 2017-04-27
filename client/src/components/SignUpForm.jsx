import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UserErrors from './UserErrors';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import { signUp } from '../actions/actions';


class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        this.props.dispatch(signUp(
            {   username: this.username.value,
                password: this.password.value,
                first: this.first.value,
                last: this.last.value
            }));
    }

    render() {
        let signUpError = this.props.error || null;
        if (this.props.currentUser) {
            return (
                <div>
                    <h2>Welcome {this.props.currentUser.get('first')}</h2>
                    <span> Get started <Link to={`lists`}> with creating gift lists! </Link> </span>
                </div>
            )
        }
            return (
                <div>
                    <Form horizontal onSubmit={this.submit}>
                        <FormGroup controlId="formBasicText">
                            <Col componentClass={ControlLabel} sm={2}>
                                First Name
                            </Col>
                            <Col sm={4}>
                                <FormControl inputRef={ref => {
                                    this.first = ref;
                                }}
                                             type="text"
                                             placeholder="First"/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formBasicText">
                            <Col componentClass={ControlLabel} sm={2}>
                                Last Name
                            </Col>
                            <Col sm={4}>
                                <FormControl inputRef={ref => {
                                    this.last = ref;
                                }}
                                             type="text"
                                             placeholder="Last"/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formBasicText">
                            <Col componentClass={ControlLabel} sm={2}>
                                Choose a Username
                            </Col>
                            <Col sm={4}>
                                <FormControl inputRef={ref => {
                                    this.username = ref;
                                }}
                                             type="text"
                                             placeholder="Username"/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="password">
                            <Col componentClass={ControlLabel} sm={2}>
                                Choose a Password
                            </Col>
                            <Col sm={4}>
                                <FormControl inputRef={ref => {
                                    this.password = ref;
                                }}
                                             type="password"
                                             placeholder="Password"/>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={4}>
                                <Button type="submit">
                                    Sign up!
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <UserErrors error={signUpError} />
                </div>

            )
        }
}

function mapStateToProps(state) {
    return {
        currentUser: state.get('currentUser'),
        error: state.get('error')
    }
}

export default connect(mapStateToProps)(SignUpForm);
