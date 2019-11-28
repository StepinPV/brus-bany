import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../components/Breadcrumbs';
import { resetData, init } from './actions';

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Статьи'
}];

const loadingTile = {
    type: 'loading',
    key: 'loading'
};

const addTile = {
    type: 'add',
    link: '/admin/articles/add',
    key: '/admin/articles/add'
};

class Articles extends PureComponent {
    static propTypes = {
        articles: PropTypes.array,
        isArticlesFetch: PropTypes.bool,
        actions: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.tiles && nextProps.articles) {
            const tiles = nextProps.articles.map(item => {
                return {
                    key: item['_id'],
                    type: 'link',
                    title: item.article['name'],
                    link: `/admin/articles/${item['translateName']}`
                }
            });
            return {
                tiles: [...tiles, addTile]
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
    const {articles, isArticlesFetch, isArticlesError} = state['admin-articles'];

    return {articles, isArticlesFetch, isArticlesError};
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
