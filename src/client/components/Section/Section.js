import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Section.module.css';

function Section(props) {
    const { bgStyle, children } = props;

    return (
        <div className={cx(styles.container, styles[`container-${bgStyle}`])}>
            {children}
        </div>
    );
}

Section.propTypes = {
    bgStyle: PropTypes.oneOf(['white', 'grey'])
};

Section.defaultProps = {
    bgStyle: 'grey'
};

export default memo(Section);
