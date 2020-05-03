import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Caption from '../../client/components/Caption';
import Text from '../../client/components/Text';
import styles from './H1Block.module.css';

function H1Block(props) {
    const { caption, description } = props;

    return (
        <div className={styles.container}>
            {caption ? <Caption align='center' className={styles.caption} size='l' tag='h1'>{caption}</Caption> : null}
            {description ? <Text align='center' className={styles.description} size='l'>{description}</Text> : null}
        </div>
    );
}

H1Block.propTypes = {
    caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default memo(H1Block);
