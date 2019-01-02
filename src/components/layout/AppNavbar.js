import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, Collapse } from 'reactstrap';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';


class AppNavbar extends Component {
    state = {
        isAuthenticated: false,
        collapsed: true
    }

    static getDerivedStateFromProps(props, state) {
        const { auth } = props;
    
        if (auth.uid) {
            return { isAuthenticated: true }
        }
        else {
            return { isAuthenticated: false }
        }
    }

    onLogout = (e) => {
        e.preventDefault();
        
        const { firebase } = this.props;
        firebase.logout();
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    
    
    render() {
        const { isAuthenticated } = this.state;
        const { auth } = this.props;
        const { allowRegistration } = this.props.settings;
        return (
            // <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
            //     <div className="container">
            //         <button 
            //         className="navbar-toggler"
            //         type="button"
            //         data-toggle="collapse"
            //         data-target="#navbarMain">
            //         <span className="navbar-toggler-icon"></span>
            //         </button>
            //         <div className="collapse navbar-collapse" id="navbarMain">
            //             <ul className="navbar-nav mr-auto">
            //                 {isAuthenticated ? (
            //                 <li className="nav-item">
            //                     <Link to="/" className="nav-link">
            //                         Dashboard
            //                     </Link>
            //                 </li> ) : null}
            //             </ul>
            //             {isAuthenticated ? (
            //                 <ul className="navbar-nav ml-auto">
            //                     <li className="nav-item">
            //                         <a href="#!" className="nav-link">{ auth.email }</a>
            //                     </li>
            //                     <li className="nav-item">
            //                         <Link to="/settings" className="nav-link">
            //                             Settings <i class="fas fa-cog"></i>
            //                         </Link>
            //                     </li>
            //                     <li className="nav-item">
            //                         <a href="#!" className="nav-link" onClick={this.onLogout}>Logout</a>
            //                     </li>
            //                 </ul>
                        
            //             ) : null}
            //             {!isAuthenticated ? (
            //             <ul className="navbar-nav ml-auto">
            //                 <li className="nav-item">
            //                     <Link to="/login" className="nav-link">
            //                         Login
            //                     </Link>
            //                     <Link to="/register" className="nav-link">
            //                         Register
            //                     </Link>
            //                 </li>
            //             </ul>
            //             ) : null}
            //         </div>
            //     </div>
            // </nav>
            <Navbar color="info" light fixed className="mb-4">
                <NavbarBrand className="mr-auto" href="/">TutorPanel</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/">Dashboard</NavLink>
                        </NavItem>
                        {!isAuthenticated ? (
                            <React.Fragment>
                                <NavItem>
                                    <NavLink href="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/register">Register</NavLink>
                                </NavItem>
                            </React.Fragment>
                        ) : null}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
    
}

AppNavbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth,
        settings: state.settings
    }))
)(AppNavbar);
