import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Progress from '../layout/Progress';

class ClientDetails extends Component {
    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: ''
    }
    
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    
    onDelete = () => {
        const { firestore, client, history } = this.props;
        firestore.delete({ collection: 'clients' , doc: client.id })
            .then(history.push('/'));
    }
    
    balanceSubmit = e => {
        e.preventDefault();
        
        const { client, firestore } = this.props;
        const { balanceUpdateAmount } = this.state;
        
        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        }
        firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
    }
    
    
    render() {
        const { client } = this.props;
        const { showBalanceUpdate, balanceUpdateAmount } = this.state;
        
        let balanceForm = '';
        if (showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.balanceSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control" name="balanceUpdateAmount" 
                            placeholder="Add New Balance" value={balanceUpdateAmount} onChange={this.onChange} />
                        <div className="input-group-append">
                            <input type="submit" value="Update" className="btn btn-outline-dark"/>
                        </div>
                    </div>
                </form>
            );
        }
        else {
            balanceForm = null;
        }
        
        if (client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="btn-group float-right">
                                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                                    Edit
                                </Link>
                                <button onClick={this.onDelete} className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card">
                        <div className="card-header">
                            <h2>{client.firstName} {client.lastName}</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-sm-6">
                                    <h4>
                                        ID: {' '}
                                        <span className="text-secondary">{client.id}</span>
                                    </h4>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <h4>Balance: ${parseFloat(client.balance).toFixed(2)}
                                    {` `}
                                    <small>
                                        <a href="#!" onClick={() => { 
                                        this.setState({ showBalanceUpdate:  !this.state.showBalanceUpdate})} }>
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                    </small>
                                    </h4>
                                    {balanceForm}
                                </div>
                            </div>
                            <hr />
                            <ul className="list-group">
                            <li className="list-group-item">
                              Contact Email: {client.email}
                            </li>
                            <li className="list-group-item">
                              Contact Phone: {client.phone}
                            </li>
                          </ul>
                        </div>
                    </div>
                </div>
            )   
        }
        else {
            return <Progress />
        }
    }
}

ClientDetails.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', 
        storeAs: 'client', 
        doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);