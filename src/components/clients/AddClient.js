import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    }
    
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    onSubmit = e => {
        e.preventDefault();
        const newClient = this.state;
        const { firestore, history } = this.props;
        
        // If no balance make 0
        if (newClient.balance === '') {
            newClient.balance = 0;
        }
        
        firestore.add({ collection: 'clients' }, newClient)
            .then(() => history.push('/'));
    }
    
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i>
                            {' '}Back to Dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Add Tutor</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                {' '}
                                <input
                                type="text"
                                className="firstName"
                                name="firstName"
                                minLength="2"
                                required
                                onChange={this.onChange}
                                value={this.state.firstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                {' '}
                                <input
                                type="text"
                                className="lastName"
                                name="lastName"
                                minLength="2"
                                required
                                onChange={this.onChange}
                                value={this.state.lastName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                {' '}
                                <input
                                type="email"
                                className="email"
                                name="email"
                                onChange={this.onChange}
                                value={this.state.email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                {' '}
                                <input
                                type="text"
                                className="phone"
                                name="phone"
                                minLength="10"
                                required
                                onChange={this.onChange}
                                value={this.state.phone}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="balance">Balance</label>
                                {' '}
                                <input
                                type="text"
                                className="balance"
                                name="balance"
                                onChange={this.onChange}
                                value={this.state.balance}
                                />
                            </div>
                            <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired
}



export default firestoreConnect()(AddClient);