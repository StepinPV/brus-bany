import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import styles from './Filters.module.css';

class Filters extends PureComponent {
    static propTypes = {
        projects: PropTypes.array,
        filter: PropTypes.object,
        category: PropTypes.object
    };

    render() {
        const { category, filter, projects } = this.props;

        let filters = (category.filters || []).filter(filter => {
            return projects.some(project => {
                // eslint-disable-next-line
                const params = project.layoutId;
                // eslint-disable-next-line
                return eval(filter.condition);
            });
        });

        return filters.length ? (
            <div className={styles.filters}>
                <div className={styles['filters-caption']}>Популярные запросы</div>
                <div className={styles['filters-items']}>
                    {
                        filters.map(({ id, name }) => (
                            <a
                                key={id}
                                href={`/bani/${category.translateName}/${id}`}
                                className={cx(styles['filters-item'], {[styles['filters-item-enabled']]: filter && filter.id === id})}>
                                {name}
                            </a>
                        ))
                    }
                </div>
            </div>
        ) : null;
    }
}

export default withRouter(Filters);
