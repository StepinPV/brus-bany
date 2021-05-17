import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { resetData, init } from './actions';

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Категории'
}];

const loadingTile = {
    type: 'loading',
    key: 'loading'
};

const addTile = {
    type: 'add',
    link: '/admin/categories/add',
    key: '/admin/categories/add'
};

class Categories extends PureComponent {
    static propTypes = {
        categories: PropTypes.array,
        isCategoriesFetch: PropTypes.bool,
        actions: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.tiles && nextProps.categories) {
            const tiles = nextProps.categories.map(item => {
                if (item['translateName'] === 'iz-brusa') {
                    return {
                        key: item['_id'],
                        type: 'link',
                        title: item['name'],
                        link: `/admin/categories`
                    }
                }
                return {
                    key: item['_id'],
                    type: 'link',
                    title: item['name'],
                    link: `/admin/categories/${item['translateName']}`
                }
            });
            return {
                tiles: [addTile, ...tiles]
            }
        }

        return null;
    }

    state = {
        tiles: null,
        defaultTiles: [loadingTile]
    };

    componentDidMount() {
        const { actions } = this.props;
        actions.init();
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { tiles, defaultTiles } = this.state;

        return (
            <>
                <Header/>
                <Breadcrumbs items={breadcrumbsItems}/>
                <Tiles items={tiles || defaultTiles} />
            </>
        );
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
            init
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
    const {categories, isCategoriesFetch, isCategoriesError} = state['admin-categories'];

    return {categories, isCategoriesFetch, isCategoriesError};
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
