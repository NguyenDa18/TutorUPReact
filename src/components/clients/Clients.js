import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Clients extends Component {
    render() {
        const clients = [
        {
            id: '332425',
            firstName: 'Char',
            lastName: 'Mander',
            email: 'mander@up.edu',
            phone: '560-284-2453',
            balance: '30',
            premium: false
        },
        {
            id: '123425',
            firstName: 'Pika',
            lastName: 'Chu',
            email: 'chu2@up.edu',
            phone: '560-987-9283',
            balance: '500',
            premium: true
        }]
        
        // const clients = []
        
        if (clients) {
        return (
            <div className="row">
                <div className="col-md-6">
                    {' '}
                    <h2><i className="fas fa-users"></i> Clients </h2>
                </div>
                <div className="col-md-6">
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
                                    to={`/clients/${client.id}`} 
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
            return (
                <h1>Loading....</h1>
            )
        }
    }
}

export default Clients;