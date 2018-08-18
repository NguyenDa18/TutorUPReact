import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Alert = (props) => {
    const { message, messageType } = props;
    return (
        <div className={classnames('alert', {
            'alert-success': messageType === 'success',
            'alert-danger': messageType === 'error'
        }, 'alert-dismissible', 'fade', 'show')}>
            {message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
    )
}

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired
};

export default Alert;