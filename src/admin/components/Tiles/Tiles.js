import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Tiles.module.css';

const Tiles = ({ items }) => (
    <div className={styles.container}>
        {items.map(({ type, title, link, key }) => {
            switch (type) {
                case 'link':
                    return <a key={key} href={link} className={cx(styles.tile, styles['link-tile'])}>{title}</a>;
                case 'add':
                    return <a key={key} href={link} className={cx(styles.tile, styles['add-tile'])}>+</a>;
            }
        })}
    </div>
);

Tiles.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            type: PropTypes.oneOf(['link', 'add', 'loading']),
            title: PropTypes.string.required,
            link: PropTypes.string.required
        })
    )
};

export default memo(Tiles);
