import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Section from '../Section';
import Caption from '@components/Caption';
import Text from '@components/Text';
import styles from './DataSection.module.css';

function DataSection(props) {
    const { bgStyle, caption, captionTag, description, children, id, isCaptionHTML, isDescriptionHTML } = props;

    return (
        <Section bgStyle={bgStyle} id={id}>
            {caption ? (
                <div className={styles.wrapper}>
                    <Caption className={styles.caption} align='center' color={bgStyle === 'red' ? 'white' : 'black'} tag={captionTag} isHTML={isCaptionHTML}>{caption}</Caption>
                </div>
            ) : null}
            {description ? (
                <div className={styles.wrapper}>
                    <Text className={styles.description} align='center' isHTML={isDescriptionHTML}>{description}</Text>
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
    id: PropTypes.string,
    isCaptionHTML: PropTypes.bool,
    isDescriptionHTML: PropTypes.bool
};

DataSection.defaultProps = {
    bgStyle: 'grey',
    isHTML: false,
    isDescriptionHTML: false
};

export default memo(DataSection);
