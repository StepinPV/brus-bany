import React, { memo } from 'react';
import PropTypes from "prop-types";
import cx from 'classnames';
import styles from './Text.module.css';

function Text(props) {
    const className = cx(
        styles.text,
        styles[`color-${props.color}`],
        styles[`size-${props.size}`],
        props.paddingTop !== 'none' ? styles[`padding-top-${props.paddingTop}`] : null,
        props.paddingBottom !== 'none' ? styles[`padding-bottom-${props.paddingBottom}`] : null,
        styles[`width-${props.width}`],
        props.align ? styles[`align-${props.align}`] : null);

    return (
        <div className={className} dangerouslySetInnerHTML={props.isHTML ? { __html: props.children } : null}>
            {!props.isHTML ? props.children : null}
        </div>
    );
}

Text.propTypes = {
    size: PropTypes.oneOf(['s', 'm', 'l']),
    color: PropTypes.oneOf(['black', 'white']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    isHTML: PropTypes.bool,
    width: PropTypes.oneOf(['s', 'm', 'l']),
};

Text.defaultProps = {
    size: 'm',
    color: 'black',
    align: 'center',
    paddingTop: 'm',
    paddingBottom: 'm',
    isHTML: false,
    width: 'm'
};

export default memo(Text);
