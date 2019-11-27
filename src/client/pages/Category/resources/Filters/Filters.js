import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import filterProjects from './../filter';
import cx from 'classnames';
import styles from './Filters.module.css';

class Filters extends PureComponent {
    static propTypes = {
        projects: PropTypes.array,
        filters: PropTypes.object,
        filteredProjects: PropTypes.array,
        category: PropTypes.object,
        history: PropTypes.object
    };

    render() {
       return this.renderFilters();
    }

    renderFilters = () => {
        return (
            <div className={styles.filters}>
                <div className={styles['filters-caption']}>Параметры поиска</div>
                {this.renderAdditionsFilter()}
                {this.renderSizesFilter()}
            </div>
        );
    };

    renderAdditionsFilter = () => {
        const { category, history, filters, filteredProjects } = this.props;

        const additions = (category.filters || []).filter(filter => {
            return filteredProjects.some(project => {
                // eslint-disable-next-line
                const params = project.layoutId;
                // eslint-disable-next-line
                return eval(filter.condition);
            });
        });

        return additions.length ? (
            <div className={styles['filters-item-vertical']}>
                <div className={styles['filters-item-title']}>Дополнения:</div>
                <div className={styles['filters-item-editors']}>
                    {
                        additions.map(({ id, name }) => {
                            const filterEnabled = Boolean(filters.additions.includes(id));
                            let link = '';

                            const getLinkByFilters = (enabledFilters) => {
                                let link = '';

                                category.filters.forEach(f => {
                                    if (Boolean(enabledFilters.includes(f.id))) {
                                        link += `/${f.id}`;
                                    }
                                });

                                return link;
                            };

                            if (!filterEnabled) {
                                link = getLinkByFilters([...category.filters, id]);
                            }

                            const handleFilterChange = (id, checked) => {
                                let newFilters = checked ? [...filters.additions, id] : filters.additions.filter(fId => fId !== id);
                                history.push(`/bani/${category.translateName}${filters.size ? `/${filters.size}` : ''}${getLinkByFilters(newFilters)}`);
                            };

                            return link ? (
                                <a key={id} href={`/bani/${category.translateName}${filters.size ? `/${filters.size}` : ''}${link}`} className={styles['filters-link']}>
                                    <div className={cx(styles['filters-checkbox'], {[styles['filters-checkbox-checked']]: filterEnabled})}>{`С ${name}`}</div>
                                </a>
                            ) : (
                                <div
                                    key={id}
                                    onClick={() => { handleFilterChange(id, !filterEnabled) }}
                                    className={cx(styles['filters-checkbox'], {[styles['filters-checkbox-checked']]: filterEnabled})}>{`С ${name}`}</div>
                            )
                        })
                    }
                </div>
            </div>
        ) : null;
    };

    renderSizesFilter = () => {
        const { category, projects, history, filteredProjects, filters } = this.props;

        const sizes = [];

        const projectsForSizes = filters.size ? filterProjects({ ...filters, size: null }, projects, category) : filteredProjects;

        projectsForSizes.forEach(project => {
            const size = `${project.layoutId.width}x${project.layoutId.length}`;

            if (!sizes.includes(size)) {
                sizes.push(size);
            }
        });

        const additionsLink = filters.additions ? filters.additions.join('/') : '';

        const handleSizeClick = size => {
            if (size === filters.size) {
                history.push(`/bani/${category.translateName}${additionsLink ? `/${additionsLink}` : ''}`);
            } else {
                history.push(`/bani/${category.translateName}/${size}${additionsLink ? `/${additionsLink}` : ''}`)
            }
        };

        return sizes.length ? (
            <div className={styles['filters-item-vertical']}>
                <div className={styles['filters-item-title']}>Размер:</div>
                <div className={styles['filters-item-sizes']}>
                    {sizes.map(size => {
                        if (filters.size) {
                            return (
                                <div
                                    key={size}
                                    className={cx(styles['filters-checkbox'], {[styles['filters-checkbox-checked']]: filters.size === size})}
                                    onClick={() => handleSizeClick(size)}>{size}</div>
                            )
                        }

                        return (
                            <a key={size} href={`/bani/${category.translateName}/${size}${additionsLink ? `/${additionsLink}` : ''}`} className={styles['filters-link']}>
                                <div className={styles['filters-checkbox']}>{size}</div>
                            </a>
                        )
                    })}
                </div>
            </div>
        ) : null;
    };
}

export default withRouter(Filters);
