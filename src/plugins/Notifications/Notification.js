import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Notification.module.css';

const Notification = ({ notification: { status, message } }) => <div className={cx(styles.notification, styles[status])}>{message}</div>;

Notification.propTypes = {
    notification: PropTypes.object
};

export default memo(Notification);
