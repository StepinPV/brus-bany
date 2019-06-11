import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Caption.module.css';

function Caption(props) {
    return (
        <div className={cx(styles.text, props.className, styles[`color-${props.color}`], styles[`size-${props.size}`], props.align ? styles[`align-${props.align}`] : null)}>
            {props.children}
        </div>
    );
}

Caption.propTypes = {
    color: PropTypes.oneOf(['black', 'white']),
    size: PropTypes.oneOf('xs', 's', 'm', 'l', 'xl'),
    align: PropTypes.oneOf('left', 'center', 'right'),
    className: PropTypes.string
};

Caption.defaultProps = {
    color: 'black',
    size: 'm'
};

export default memo(Caption);
