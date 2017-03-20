import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
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
            return (
                <Form horizontal onSubmit={this.submit}>
                    <FormGroup controlId="formBasicText">
                        <Col componentClass={ControlLabel} sm={2}>
                            First Name
                        </Col>
                        <Col sm={4}>
                            <FormControl inputRef={ref => { this.first = ref; }}
                                         type="text"
                                         placeholder="First" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formBasicText">
                        <Col componentClass={ControlLabel} sm={2}>
                            Last Name
                        </Col>
                        <Col sm={4}>
                            <FormControl inputRef={ref => { this.last = ref; }}
                                         type="text"
                                         placeholder="Last" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formBasicText">
                        <Col componentClass={ControlLabel} sm={2}>
                            Choose a Username
                        </Col>
                        <Col sm={4}>
                            <FormControl inputRef={ref => { this.username = ref; }}
                                         type="text"
                                         placeholder="Username" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="password">
                        <Col componentClass={ControlLabel} sm={2}>
                            Choose a Password
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
                                Sign up!
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.get('currentUser'),
    }
}

export default connect(mapStateToProps)(SignUpForm);
