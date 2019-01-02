import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import Progress from '../layout/Progress';
import { notifyUser } from '../../actions/notifyActions';

import { Row, Card, CardHeader, CardTitle, Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import Alert from '../layout/Alert';


class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    
    onSubmit = e => {
        e.preventDefault();
        const { firebase, notifyUser } = this.props;
        const { email, password } = this.state;
        firebase
            .login({
                email,
                password
            })
            .catch(err => notifyUser('Invalid login credentials', 'error'));
    }
    
    onChange = e => this.setState({[e.target.name]: e.target.value});
    
    render() {
        const { message, messageType } = this.props.notify;
        return (
            <React.Fragment>
                <Row>
                    <Card body inverse style={{ backgroundColor: '#333'}}>
                        {message ? (
                            <Alert message={message} messageType={messageType} />
                        ) : null}
                        <CardHeader className="text-center pb-4 pt-3" tag="h2" style={{ backgroundColor: '#333'}}><i className="fas fa-lock"></i>{' '}Login</CardHeader>
                                <form onSubmit={this.onSubmit}>
                                <Form>
                                    <FormGroup>
                                        <Label for="exampleEmail" hidden>Email</Label>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                                        </FormGroup>
                                        {' '}
                                        <FormGroup>
                                        <Label for="examplePassword" hidden>Password</Label>
                                        <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                                    </FormGroup>
                                    {' '}
                                    <Button block size="lg" color="primary">Login</Button>
                                </Form>
                                </form>
                    </Card>
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                {message ? (
                                    <Alert message={message} messageType={messageType} />
                                ) : null}
                                <h1 className="text-center pb-4 pt-3">
                                    <span className="text-primary">
                                        <i className="fas fa-lock"></i>{' '}
                                        Login
                                    </span>
                                </h1>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" 
                                        className="form-control" 
                                        name="email"
                                        required
                                        value={this.state.email} 
                                        onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" 
                                        className="form-control" 
                                        name="password"
                                        required
                                        value={this.state.password} 
                                        onChange={this.onChange}
                                        />
                                    </div>
                                    <input type="submit" value="Login" 
                                    className="btn btn-primary btn-block"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </Row>
            </React.Fragment>
            
        )
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}


export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        notify: state.notify
    }),
    { notifyUser })
)(Login);