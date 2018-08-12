import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Progress from '../layout/Progress';

class ClientDetails extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    
    render() {
        const { client } = this.props;
        if (client) {
            return (
                <div>
                    <h1>{client.firstName}</h1>
                </div>
            )   
        }
        else {
            return <Progress />
        }
        // return (
        //     <div>
        //         <h1>Client Details</h1>
        //     </div>
        // )
    }
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', 
        storeAs: 'client', 
        doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered }}, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);