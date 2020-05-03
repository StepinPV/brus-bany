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
    title: 'Страницы'
}];

const loadingTile = {
    type: 'loading',
    key: 'loading'
};

const addTile = {
    type: 'add',
    link: '/admin/pages/add',
    key: '/admin/pages/add'
};

class Pages extends PureComponent {
    static propTypes = {
        pages: PropTypes.array,
        isPagesFetch: PropTypes.bool,
        actions: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.tiles && nextProps.pages) {
            const tiles = nextProps.pages.map(item => {
                return {
                    key: item['_id'],
                    type: 'link',
                    title: item['url'],
                    link: `/admin/pages/${item['_id']}`
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
    const {pages, isPagesFetch, isPagesError} = state['admin-pages'];

    return {pages, isPagesFetch, isPagesError};
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
