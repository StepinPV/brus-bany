import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Caption.module.css';

function Caption(props) {
    const className = cx(
        styles.text,
        styles[`color-${props.color}`],
        styles[`size-${props.size}`],
        styles[`padding-top-${props.paddingTop}`],
        styles[`padding-bottom-${props.paddingBottom}`],
        props.align ? styles[`align-${props.align}`] : null);

    const dangerouslySetInnerHTML = props.isHTML ? { __html: props.children } : null;
    const children = !props.isHTML ? props.children : null;

    switch (props.tag) {
        case 'h1': return <h1 className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>{children}</h1>;
        case 'h2': return <h2 className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>{children}</h2>;
        case 'h3': return <h3 className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>{children}</h3>;
        default: return <div className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>{children}</div>;
    }
}

Caption.propTypes = {
    color: PropTypes.oneOf(['black', 'white']),
    size: PropTypes.oneOf(['s', 'm', 'l']),
    tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'div']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    paddingTop: PropTypes.oneOf(['s', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['s', 'm', 'l']),
    isHTML: PropTypes.bool
};

Caption.defaultProps = {
    color: 'black',
    size: 'm',
    tag: 'div',
    paddingTop: 'm',
    paddingBottom: 'm',
    isHTML: false
};

export default memo(Caption);
