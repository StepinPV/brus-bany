import React, { memo } from 'react';
import styles from './LoaderPage.module.css';
import Loader from '../Loader';

export default memo(() => (
    <div className={styles.container}>
        <Loader />
    </div>
));
