import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Button.module.css';

function Simple(props) {
    return (
        <button onClick={props.onClick} className={cx(styles.button, props.className, styles[`type-${props.type}`], styles[`size-${props.size}`])}>
            {props.caption}
        </button>
    );
}

Simple.propTypes = {
    type: PropTypes.oneOf(['red', 'yellow']),
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
    caption: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
};

Simple.defaultProps = {
    size: 'm',
    type: 'red'
};

export default memo(Simple);
