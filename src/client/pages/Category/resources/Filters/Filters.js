import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.module.css';

function Filters({ filters, pathname }) {
    return (
        <div className={styles.filters}>
            {
                filters.map(({ name, filters }) => filters && filters.length ? (
                    <div className={styles.group}>
                        <div className={styles.name}>{name}:</div>
                        <div className={styles.items}>
                            {
                                filters.map(({ id, name }) => (
                                    <a
                                        className={styles['item']}
                                        href={`${pathname}/${id}`}>
                                        {name}
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                ) : null)
            }
        </div>
    );
}

Filters.propTypes = {
    filters: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired
};

export default memo(Filters);
