import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Button.module.css';

function Button(props) {
    return (
        <div onClick={props.onClick} className={cx(styles.button, props.className, styles[`type-${props.type}`], styles[`size-${props.size}`])}>
            {props.caption}
        </div>
    );
}

Button.propTypes = {
    type: PropTypes.oneOf(['red', 'yellow']),
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
    caption: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
};

Button.defaultProps = {
    color: 'black',
    size: 'm',
    type: 'red',
    onClick: () => {}
};

export default memo(Button);
