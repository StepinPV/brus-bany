import React, { memo } from 'react';
import PropTypes from "prop-types";
import cx from 'classnames';
import styles from './Text.module.css';

function Text(props) {
    return (
        <div className={cx(props.className, styles[props.size], props.align ? styles[`align-${props.align}`] : null)} dangerouslySetInnerHTML={props.isHTML ? { __html: props.children } : null}>
            {!props.isHTML ? props.children : null}
        </div>
    );
}

Text.propTypes = {
    size: PropTypes.oneOf(['s', 'm', 'l']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    className: PropTypes.string,
    isHTML: PropTypes.bool
};

Text.defaultProps = {
    size: 'm'
};

export default memo(Text);
