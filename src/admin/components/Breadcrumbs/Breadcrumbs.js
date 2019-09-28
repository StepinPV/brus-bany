import React, { memo } from 'react';
import BreadcrumbsComponent from '../../../components/Breadcrumbs';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = (props) => (
    <BreadcrumbsComponent className={styles.breadcrumbs} items={props.items} />
);

export default memo(Breadcrumbs);
