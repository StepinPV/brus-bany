import React, { memo } from 'react';
import PropTypes from "prop-types";
import cx from 'classnames';
import styles from './Text.module.css';

function Text(props) {
    return (
        <div className={cx(props.className, styles[props.size], props.align ? styles[`align-${props.align}`] : null)}>
            {props.children}
        </div>
    );
}

Text.propTypes = {
    size: PropTypes.oneOf(['s', 'm', 'l']),
    align: PropTypes.oneOf('left', 'center', 'right'),
    className: PropTypes.string
};

Text.defaultProps = {
    size: 'm'
};

export default memo(Text);
