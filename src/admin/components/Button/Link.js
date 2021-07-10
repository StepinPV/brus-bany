import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Button.module.css';

function Link(props) {
    return (
        <a
            download={props.download}
            href={props.href}
            target={props.target}
            rel={props.rel}
            className={cx(styles.button, props.className, styles[`type-${props.type}`], styles[`size-${props.size}`])}>
            {props.caption}
        </a>
    );
}

Link.propTypes = {
    type: PropTypes.oneOf(['red', 'yellow']),
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
    caption: PropTypes.string,
    className: PropTypes.string,
    href: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    download: PropTypes.bool
};

Link.defaultProps = {
    size: 'm',
    type: 'red'
};

export default memo(Link);
