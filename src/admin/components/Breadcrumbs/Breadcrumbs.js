import React, { memo } from 'react';
import BreadcrumbsComponent from '../../components/Breadcrumbs';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => (
    <BreadcrumbsComponent className={styles.breadcrumbs} />
);

export default memo(Breadcrumbs);
