import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import cx from 'classnames';
import styles from './Tiles.module.css';

const Tiles = ({ items }) => {
    return (
        <div className={styles.container}>
            {items.map(({ type, title, link, key }) => {
                switch (type) {
                    case 'link':
                        return <Link key={key} to={link} className={cx(styles.tile, styles['link-tile'])}>{title}</Link>;
                    case 'loading':
                        return <div key={key} className={cx(styles.tile, styles['loading-tile'])}><Loader /></div>;
                    case 'add':
                        return <Link key={key} to={link} className={cx(styles.tile, styles['add-tile'])}>+</Link>;
                    default:
                        return <div key={key} className={styles.tile}><Loader /></div>;
                }
            })}
        </div>
    );
};

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
