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
                {
                    filters.map(({ id, name }) => {
                        const options = {
                            key: id,
                            className: cx(styles['filters-item'], {[styles['filters-item-enabled']]: filter && filter.id === id})
                        };

                        return filter && filter.id === id ? (
                            <div {...options}>{name}</div>
                        ) : (
                            <a
                                {...options}
                                href={`/bani/${category.translateName}/${id}`}>
                                {name}
                            </a>
                        );
                    })
                }
            </div>
        ) : null;
    }
}

export default withRouter(Filters);
