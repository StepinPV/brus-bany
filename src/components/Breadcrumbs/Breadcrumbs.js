import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ items, className }) => (
    <div className={className}>
        {items.map(({ title, link }, index) => {
            return (
                <Fragment key={title}>
                    { index !== 0 ? <span className={styles.arrow}>→</span> : null }
                    { link ? <a href={link} className={styles['link-item']}>{title}</a> : <span className={styles['item']}>{title}</span> }
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
    ),
    className: PropTypes.string
};

export default memo(Breadcrumbs);
