import React, { memo } from 'react';
import PropTypes from "prop-types";
import styles from './Text.module.css';

function Text(props) {
    return (
        <div className={styles[props.size]}>
            {props.children}
        </div>
    );
}

Text.propTypes = {
    size: PropTypes.oneOf(['s', 'm', 'l'])
};

Text.defaultProps = {
    size: 'm'
};

export default memo(Text);
