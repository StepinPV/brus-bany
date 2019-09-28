import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../components/Breadcrumbs';
import { resetData, init, getProjects } from './actions';
import Select from '../../../components/Select';
import styles from './Projects.module.css';

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Проекты'
}];

const loadingTile = {
    type: 'loading',
    key: 'loading'
};

class Projects extends PureComponent {
    static propTypes = {
        categories: PropTypes.array,
        projects: PropTypes.array,
        actions: PropTypes.object
    };

    state = {
        tiles: null,
        defaultTiles: [loadingTile],
        categoryId: undefined
    };

    componentDidMount() {
        const { actions } = this.props;
        actions.init();
    }

    componentDidUpdate(prevProps, prevState) {
        const { categoryId } = this.state;
        const { actions, projects } = this.props;

        if (categoryId && categoryId !== prevState.categoryId) {
            actions.getProjects(categoryId);
        }

        if (projects !== prevProps.projects) {
            const tiles = projects.map(project => {
                const link = `/admin/projects/${project['categoryId']}/${project.layoutId['_id']}`;

                return {
                    key: link,
                    type: 'link',
                    title: project.layoutId['name'],
                    link: link
                }
            });

            this.setState({
                tiles: [...tiles, {
                    type: 'add',
                    link: `/admin/projects/${categoryId}/add`,
                    key: `/admin/projects/${categoryId}/add`
                }]}
            );
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { categories } = this.props;
        const { tiles, defaultTiles, categoryId } = this.state;

        return (
            <>
                <Header/>
                <Breadcrumbs items={breadcrumbsItems}/>

                {categories ? (
                    <div className={styles.select}>
                        <Select
                            title='Выберите категорию'
                            items={categories}
                            keyProperty='_id'
                            displayProperty='name'
                            selectedKey={categoryId}
                            onChange={this.handleCategoryChange}
                        />
                    </div>
                ) : null}

                {categoryId ? <Tiles items={tiles || defaultTiles} /> : null}

            </>
        );
    }

    handleCategoryChange = (categoryId) => {
        this.setState({ categoryId });
    }
}

/**
 * mapDispatchToProps
 * @param {*} dispatch
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            resetData,
            init,
            getProjects
        }, dispatch),
        dispatch
    };
}

/**
 * mapStateToProps
 * @param {*} state
 * @returns {Object}
 */
function mapStateToProps(state) {
    const {categories, projects} = state['admin-projects'];

    return {categories, projects};
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
