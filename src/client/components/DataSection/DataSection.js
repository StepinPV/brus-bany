import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Section from '../Section';
import Caption from '../Caption';
import Text from '../Text';
import styles from './DataSection.module.css';

function DataSection(props) {
    const { bgStyle, caption, description, children } = props;

    return (
        <Section bgStyle={bgStyle}>
            <div className={styles.caption}>
                <Caption align='center'>{caption}</Caption>
            </div>
            <div className={styles.description}>
                <div className={styles['description-wrapper']}>
                    <Text align='center' size='l'>{description}</Text>
                </div>
            </div>
            {children}
        </Section>
    );
}

DataSection.propTypes = {
    bgStyle: PropTypes.oneOf(['white', 'grey']),
    caption: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node
};

DataSection.defaultProps = {
    bgStyle: 'grey'
};

export default memo(DataSection);
