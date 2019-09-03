import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { resetData, init, getReports } from './actions';
import Select from '../../../components/Select';
import styles from './Photos.module.css';

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Фотоотчеты'
}];

const loadingTile = {
    type: 'loading',
    key: 'loading'
};

class Photos extends PureComponent {
    static propTypes = {
        categories: PropTypes.array,
        reports: PropTypes.array,
        actions: PropTypes.object
    };

    state = {
        tiles: null,
        defaultTiles: [loadingTile],
        categoryName: undefined
    };

    componentDidMount() {
        const { actions } = this.props;
        actions.init();
    }

    componentDidUpdate(prevProps, prevState) {
        const { categoryId } = this.state;
        const { actions, reports } = this.props;

        if (categoryId && categoryId !== prevState.categoryId) {
            actions.getReports(categoryId);
        }

        if (reports !== prevProps.reports) {
            const tiles = reports.map(report => {
                const link = `/admin/photos/${categoryId}/${report['_id']}`;

                return {
                    key: link,
                    type: 'link',
                    title: report.projectId.layoutId['name'],
                    link: link
                }
            });

            this.setState({
                tiles: [...tiles, {
                    type: 'add',
                    link: `/admin/photos/${categoryId}/add`,
                    key: `/admin/photos/${categoryId}/add`
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
            getReports
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
    const {categories, reports} = state['admin-photos'];

    return {categories, reports};
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
