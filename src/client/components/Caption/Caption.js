import React, { memo } from 'react';
import styles from './Caption.module.css';

function Caption(props) {
    return (
        <div className={styles.text}>
            {props.children}
        </div>
    );
}

export default memo(Caption);
