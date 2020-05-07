import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Caption from '../Caption';
import Text from '../Text';
import { Link } from '../../components/Button';
import styles from './Banner.module.css';

function Banner(props) {
    return (
        <>
            <div
                className={styles.banner}
                style={props.image ? { backgroundImage: `url(${props.image})`} : {}}/>
            <div className={styles.layout} />
            <div className={styles.content}>
                { props.captionProps ? <Caption className={styles.header} {...props.captionProps} /> : null }
                { props.textProps ? <Text className={styles.description} {...props.textProps} /> : null }
                {props.button ? (
                    <Link type='red' href={props.button.href} caption={props.button.caption} className={styles.button} />
                    ) : null}
            </div>
        </>
    )
}

Banner.propTypes = {
    captionProps: PropTypes.object,
    textProps: PropTypes.object,
    button: PropTypes.object,
    image: PropTypes.string
};

export default memo(Banner);

