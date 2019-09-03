import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Section.module.css';

function Section(props) {
    return (
        <div id={props.id} className={cx(styles.container, styles[`container-${props.bgStyle}`])}>
            {props.children}
        </div>
    );
}

Section.propTypes = {
    bgStyle: PropTypes.oneOf(['white', 'grey', 'grey2', 'red']),
    id: PropTypes.string
};

Section.defaultProps = {
    bgStyle: 'grey'
};

export default memo(Section);
