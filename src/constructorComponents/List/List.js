import React, { memo } from 'react';
import PropTypes from "prop-types";
import cx from 'classnames';
import styles from './List.module.css';

function List(props) {
    const className = cx(
        styles.container,
        styles[`width-${props.width}`],
        styles[`size-${props.size}`],
        props.paddingTop !== 'none' ? styles[`padding-top-${props.paddingTop}`] : null,
        props.paddingBottom !== 'none' ? styles[`padding-bottom-${props.paddingBottom}`] : null);

    function renderItems() {
        return (
            <>
                {props.items.map(({ text }) => {
                    return <li className={styles.item}>{text}</li>
                })}
            </>
        );
    }

    switch(props.type) {
        case 'numeric':
            return (
                <ol className={className}>{renderItems()}</ol>
            );
        case 'marker':
            return (
                <ul className={className}>{renderItems()}</ul>
            );
    }
}

List.propTypes = {
    size: PropTypes.oneOf(['s', 'm', 'l']),
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    type: PropTypes.oneOf(['numeric', 'marker']),
    width: PropTypes.oneOf(['s', 'm', 'l']),
    items: PropTypes.array
};

List.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm',
    type: 'marker',
    items: [],
    size: 'm',
    width: 'm'
};

export default memo(List);
