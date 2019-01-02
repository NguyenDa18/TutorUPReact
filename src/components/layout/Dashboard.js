import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from '../layout/Sidebar';
import { Row, Col } from 'reactstrap';

export default () => {
    return (
        <React.Fragment>
            <Row>
                <Col md="10">
                    <Clients />
                </Col>
                <Col md="2">
                    <Sidebar />
                </Col>
            </Row>
        </React.Fragment>
    );
}