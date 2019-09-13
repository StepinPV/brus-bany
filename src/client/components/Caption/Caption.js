import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Caption.module.css';

function Caption(props) {
    const className = cx(styles.text, props.className, styles[`color-${props.color}`], styles[`size-${props.size}`], props.align ? styles[`align-${props.align}`] : null);

    switch (props.tag) {
        case 'h1': return <h1 className={className}>{props.children}</h1>;
        case 'h2': return <h2 className={className}>{props.children}</h2>;
        case 'h3': return <h3 className={className}>{props.children}</h3>;
        default: return <div className={className}>{props.children}</div>;
    }
}

Caption.propTypes = {
    color: PropTypes.oneOf(['black', 'white']),
    size: PropTypes.oneOf(['s', 'm', 'l']),
    tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'div']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    className: PropTypes.string
};

Caption.defaultProps = {
    color: 'black',
    size: 'm',
    tag: 'div'
};

export default memo(Caption);
