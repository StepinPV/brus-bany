import React, { memo } from 'react';
import PropTypes from "prop-types";
import cx from 'classnames';
import styles from './Text.module.css';

function Text(props) {
    const className = cx(
        styles.text,
        styles[`size-${props.size}`],
        styles[`padding-top-${props.paddingTop}`],
        styles[`padding-bottom-${props.paddingBottom}`],
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
    align: PropTypes.oneOf(['left', 'center', 'right']),
    paddingTop: PropTypes.oneOf(['s', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['s', 'm', 'l']),
    isHTML: PropTypes.bool,
    width: PropTypes.oneOf(['wide', 'narrow']),
};

Text.defaultProps = {
    size: 'm',
    align: 'center',
    paddingTop: 'm',
    paddingBottom: 'm',
    isHTML: false,
    width: 'narrow'
};

export default memo(Text);
