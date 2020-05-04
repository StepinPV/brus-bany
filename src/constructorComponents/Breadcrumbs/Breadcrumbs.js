import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Breadcrumbs.module.css';
import cx from 'classnames';

const Breadcrumbs = (props) => {
    const className = cx(
        styles.container,
        styles[`width-${props.width}`]);

    return (
        <div className={className} itemScope itemType="http://schema.org/BreadcrumbList">
            {props.items.map(({ title, link }, index) => {
                const mobileItem = index === props.items.length - 2;

                return (
                    <Fragment key={title}>
                        { index !== 0 ? <span className={cx(styles.arrow, styles['desktop-element'])}>/</span> : null }
                        { link && index !== props.items.length - 1 ? (
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
    )
};

Breadcrumbs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.required,
            link: PropTypes.string
        })
    ),
    width: PropTypes.oneOf(['s', 'm', 'l']),
};

Breadcrumbs.defaultProps = {
    width: 'm'
};

export default memo(Breadcrumbs);
