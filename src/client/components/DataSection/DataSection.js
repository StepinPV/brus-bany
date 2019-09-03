import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Section from '../Section';
import Caption from '../Caption';
import Text from '../Text';
import styles from './DataSection.module.css';

function DataSection(props) {
    const { bgStyle, caption, description, children, id } = props;

    return (
        <Section bgStyle={bgStyle} id={id}>
            {caption ? (
                <div className={styles.caption}>
                    <Caption align='center' color={bgStyle === 'red' ? 'white' : 'black'}>{caption}</Caption>
                </div>
            ) : null}
            {description ? (
                <div className={styles.description}>
                    <div className={styles['description-wrapper']}>
                        <Text align='center'>{description}</Text>
                    </div>
                </div>
            ) : null}
            {children}
        </Section>
    );
}

DataSection.propTypes = {
    bgStyle: PropTypes.oneOf(['white', 'grey', 'red']),
    caption: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
    id: PropTypes.string
};

DataSection.defaultProps = {
    bgStyle: 'grey'
};

export default memo(DataSection);
