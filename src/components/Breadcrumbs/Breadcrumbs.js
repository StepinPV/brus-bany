import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ items }) => (
    <div className={styles.container}>
        {items.map(({ title, link }, index) => {
            return (
                <Fragment key={title}>
                    { index !== 0 ? <span className={styles.arrow}>→</span> : null }
                    { link ? <Link to={link} className={styles['link-item']}>{title}</Link> : <span className={styles['item']}>{title}</span> }
                </Fragment>
            );
        })}
    </div>
);

Breadcrumbs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.required,
            link: PropTypes.string
        })
    )
};

export default memo(Breadcrumbs);
