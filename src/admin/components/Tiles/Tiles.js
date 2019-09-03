import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../../components/Loader';
import cx from 'classnames';
import styles from './Tiles.module.css';

const Tiles = ({ items }) => (
    <div className={styles.container}>
        {items.map(({ type, title, link, key }) => {
            switch (type) {
                case 'link':
                    return <a key={key} href={link} className={cx(styles.tile, styles['link-tile'])}>{title}</a>;
                case 'loading':
                    return <div key={key} className={cx(styles.tile, styles['loading-tile'])}><Loader /></div>;
                case 'add':
                    return <a key={key} href={link} className={cx(styles.tile, styles['add-tile'])}>+</a>;
                default:
                    return <div key={key} className={styles.tile}><Loader /></div>;
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
