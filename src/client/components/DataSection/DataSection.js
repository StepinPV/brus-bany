import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Section from '../Section';
import Caption from '../Caption';
import Text from '../Text';
import styles from './DataSection.module.css';

function DataSection(props) {
    const { bgStyle, caption, captionTag, description, children, id } = props;

    return (
        <Section bgStyle={bgStyle} id={id}>
            {caption ? (
                <div className={styles.wrapper}>
                    <Caption className={styles.caption} align='center' color={bgStyle === 'red' ? 'white' : 'black'} tag={captionTag}>{caption}</Caption>
                </div>
            ) : null}
            {description ? (
                <div className={styles.wrapper}>
                    <Text className={styles.description} align='center'>{description}</Text>
                </div>
            ) : null}
            {children}
        </Section>
    );
}

DataSection.propTypes = {
    bgStyle: PropTypes.oneOf(['white', 'grey', 'red']),
    caption: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    captionTag: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    children: PropTypes.node,
    id: PropTypes.string
};

DataSection.defaultProps = {
    bgStyle: 'grey'
};

export default memo(DataSection);
