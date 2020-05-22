import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Caption, Text, Button } from '../meta';
import styles from './Banner.module.css';

function Banner(props) {
    return (
        <div className={styles.container} {...(props.id ? { id: props.id } : {})}>
            <div
                className={styles.banner}
                style={props.image ? { backgroundImage: `url(${props.__images__[props.image]})`} : {}}/>
            <div className={styles.layout} />
            <div className={styles.content}>
                { props.captionProps ? <Caption {...props.captionProps} /> : null }
                { props.textProps ? <Text {...props.textProps} /> : null }
                { props.buttonProps ? <Button {...props.buttonProps} /> : null }
            </div>
        </div>
    )
}

Banner.propTypes = {
    captionProps: PropTypes.object,
    textProps: PropTypes.object,
    buttonProps: PropTypes.object,
    image: PropTypes.string,
    id: PropTypes.string
};

export default memo(Banner);

