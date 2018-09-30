import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    setDisableOnAdd,
    setDisableOnEdit,
    setAllowRegistration
} from '../../actions/settingsActions';

class Settings extends Component {
    render() {
        const { disableonAdd, disableonEdit, allowRegistration } = this.props.settings;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left" /> Back to Dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        Edit Settings
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Allow Registration</label>{` `}
                                <input type="checkbox" name="allowRegistration" 
                                checked={!!setAllowRegistration} 
                                onChange={this.allowRegistration}/>
                            </div>
                            <div className="form-group">
                                <label>Disable On Add</label>{` `}
                                <input type="disableOnAdd" name="allowRegistration" 
                                checked={!!setAllowRegistration} 
                                onChange={this.allowRegistration}/>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

Settings.propTypes = {
    settings: PropTypes.object.isRequired,
    setDisableOnAdd: PropTypes.func.isRequired,
    setDisableOnEdit: PropTypes.func.isRequired,
    allowRegistration: PropTypes.func.isRequired
}

export default connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings,
}),
{ setAllowRegistration, setDisableOnAdd, setDisableOnEdit })(Settings);