import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Breadcrumbs.module.css';
import cx from 'classnames';

const Breadcrumbs = ({ items, className }) => (
    <div className={cx(styles.container, className)} itemScope itemType="http://schema.org/BreadcrumbList">
        {items.map(({ title, link }, index) => {
            const mobileItem = index === items.length - 2;

            return (
                <Fragment key={title}>
                    { index !== 0 ? <span className={cx(styles.arrow, styles['desktop-element'])}>/</span> : null }
                    { link && index !== items.length - 1 ? (
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <a href={link} className={cx(styles['link-item'], {[styles['desktop-element']]: !mobileItem})} itemProp="item">
                                {mobileItem ? <span className={cx(styles.arrow, styles['mobile-element'])}>←</span> : null}
                                <span itemProp="name">{title}</span>
                            </a>
                            <meta itemProp="position" content={index + 1} />
                        </span>
                    ) : <span className={cx(styles['item'], styles['desktop-element'])}>{title}</span> }
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
