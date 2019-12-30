import React, { memo } from 'react';
import cx from 'classnames';
import styles from './Logo.module.css';

export default memo((props) => (
    <i className={cx(props.className, styles.icon)} />
));
