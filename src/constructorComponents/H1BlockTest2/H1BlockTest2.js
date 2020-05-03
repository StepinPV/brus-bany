import React, { memo } from 'react';
import PropTypes from 'prop-types';
/*import Caption from '../../client/components/Caption';
import Text from '../../client/components/Text';*/
import H1BlockTest3 from '../H1BlockTest3';
import styles from './H1BlockTest2.module.css';

function H1BlockTest2(props) {
    const { caption, description } = props;

    return (
        <div className={styles.zero}>
            H2
            <H1BlockTest3 />
            {/*{caption ? <Caption align='center' className={styles.caption} size='l' tag='h1'>{caption}</Caption> : null}
            {description ? <Text align='center' className={styles.description} size='l'>{description}</Text> : null}*/}
        </div>
    );
}

H1BlockTest2.propTypes = {
    caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default memo(H1BlockTest2);
