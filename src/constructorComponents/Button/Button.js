import React, { memo } from 'react';
import PropTypes from "prop-types";
import cx from 'classnames';
import styles from './Button.module.css';

function Button(props) {
    const containerClassName = cx(
        styles.container,
        styles[`container-width-${props.containerWidth}`],
        styles[`align-${props.align}`],
        props.paddingTop !== 'none' ? styles[`padding-top-${props.paddingTop}`] : null,
        props.paddingBottom !== 'none' ? styles[`padding-bottom-${props.paddingBottom}`] : null
    );

    const className = cx(
        styles.button,
        styles[`color-${props.color}`],
        styles[`size-${props.size}`],
        props.fullWidth ? styles['width-full'] : null);

    const options = {
        download: props.download,
        href: props.href
    };

    if (props.targetBlank) {
        options.target = '_blank';
    }

    if (props.noOpener) {
        options.rel = 'noopener noreferrer';
    }

    const renderContent = () => {
        switch(props.type) {
            case 'a': return <a {...options} className={className}>{props.caption}</a>;
            case 'button': return <button {...options} className={className}>{props.caption}</button>;
        }
    };

    return (
        <div {...(props.id ? { id: props.id } : {})} className={containerClassName}>
            {renderContent()}
        </div>
    );
}

Button.propTypes = {
    size: PropTypes.oneOf(['s', 'm']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    containerWidth: PropTypes.oneOf(['s', 'm', 'l']),
    color: PropTypes.oneOf(['red', 'yellow']),
    fullWidth: PropTypes.bool,
    download: PropTypes.bool,
    noOpener: PropTypes.bool,
    targetBlank: PropTypes.bool,
    caption: PropTypes.string,
    href: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.oneOf(['a', 'button']).isRequired
};

Button.defaultProps = {
    size: 'm',
    align: 'center',
    color: 'red',
    paddingTop: 'm',
    paddingBottom: 'm',
    containerWidth: 'm',
    fullWidth: false,
    download: false,
    targetBlank: false,
    noOpener: false,
    type: 'a'
};

export default memo(Button);
