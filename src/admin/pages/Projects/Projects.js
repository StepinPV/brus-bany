import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { resetData, init, getProjects } from './actions';
import Select from '../../../components/Select';
import ProjectCard from '../../../components/ProjectCard';
import AddCard from '../../../components/AddCard';
import CardList from '../../../components/CardList/CardList';
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
        categoryId: undefined
    };

    componentDidMount() {
        const { actions } = this.props;
        actions.init();
    }

    componentDidUpdate(prevProps, prevState) {
        const { categoryId } = this.state;
        const { actions } = this.props;

        if (categoryId && categoryId !== prevState.categoryId) {
            actions.getProjects(categoryId);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { categories, projects } = this.props;
        const { categoryId } = this.state;

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

                {projects ? this.renderProjects() : null}
            </>
        );
    }

    renderProjects = () => {
        const { projects } = this.props;
        const { categoryId } = this.state;

        const items = projects.map(project => ({
            id: project._id,
            element: (
                <ProjectCard
                    project={project}
                    category={project.categoryId}
                    link={`/admin/projects/${project.categoryId['_id']}/${project.layoutId['_id']}`}
                />
            )
        }));

        items.unshift({
            id: 'add',
            element: (
                <AddCard
                    link={`/admin/projects/${categoryId}/add`}
                />
            )
        });

        return <CardList items={items} />;
    };

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
