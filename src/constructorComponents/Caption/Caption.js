import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Caption.module.css';

function Caption(props) {
    const className = cx(
        styles.text,
        styles[`color-${props.color}`],
        styles[`size-${props.size}`],
        styles[`width-${props.width}`],
        styles[`align-${props.align}`],
        props.paddingTop !== 'none' ? styles[`padding-top-${props.paddingTop}`] : null,
        props.paddingBottom !== 'none' ? styles[`padding-bottom-${props.paddingBottom}`] : null);

    const options = {
        className,
        dangerouslySetInnerHTML: props.isHTML ? { __html: props.children } : null,
        children: !props.isHTML ? props.children : null
    }

    if (props.id) {
        options.id = props.id;
    }

    switch (props.tag) {
        case 'h1': return <h1 {...options} />;
        case 'h2': return <h2 {...options} />;
        case 'h3': return <h3 {...options} />;
        default: return <div {...options} />;
    }
}

Caption.propTypes = {
    color: PropTypes.oneOf(['black', 'white']),
    size: PropTypes.oneOf(['s', 'm', 'l']),
    tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'div']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    isHTML: PropTypes.bool,
    width: PropTypes.oneOf(['l', 'm', 's']),
    id: PropTypes.string
};

Caption.defaultProps = {
    color: 'black',
    size: 'm',
    tag: 'div',
    paddingTop: 'm',
    paddingBottom: 'm',
    isHTML: false,
    width: 'm',
    align: 'center'
};

export default memo(Caption);
