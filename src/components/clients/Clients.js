import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Progress from '../layout/Progress';

class Clients extends Component {
    state = {
        totalAmount: null,
    }
    
    static getDerivedStateFromProps(props, state) {
        const { clients } = props;
        if (clients) {
            // Add balances
            const total = clients.reduce((total, client) => {
                return total + parseFloat(client.balance.toString());
            }, 0);
            
            return { totalAmount: total }
        }
        
        return null;
    }
    
    
    render() {
        // const clients = [
        // {
        //     id: '332425',
        //     firstName: 'Char',
        //     lastName: 'Mander',
        //     email: 'mander@up.edu',
        //     phone: '560-284-2453',
        //     balance: '30',
        //     premium: false
        // },
        // {
        //     id: '123425',
        //     firstName: 'Pika',
        //     lastName: 'Chu',
        //     email: 'chu2@up.edu',
        //     phone: '560-987-9283',
        //     balance: '500',
        //     premium: true
        // }]
        
        const { clients } = this.props;
        const { totalAmount } = this.state;
        
        if (clients) {
        return (
            <div className="row">
                <div className="col-md-6">
                    {' '}
                    <h2><i className="fas fa-users"></i> Tutors </h2>
                </div>
                <div className="col-md-6">
                <h5 className="text-right text-secondary">
                    Total Amount{' '} 
                    <span className="text-primary">${parseFloat(totalAmount).toFixed(2) }</span>
                </h5>
                </div>
                <table className="table table-striped table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Balance</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.firstName} {client.lastName}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td>${parseFloat(client.balance).toFixed(2)}</td>
                                <td>
                                    <Link 
                                    to={`/client/${client.id}`} 
                                    className="btn btn-secondary btn-sm">
                                    <i className="fas fa-arrow-circle-right" /> Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
        }
        else {
            return <Progress />
        }
    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
}

// Map props to state
export default compose(
    firestoreConnect([{ collection: 'clients' }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);