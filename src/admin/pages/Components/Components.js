import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { reset, init } from './actions';

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Компоненты'
}];

const loadingTile = {
    type: 'loading',
    key: 'loading'
};

const addTile = {
    type: 'add',
    link: '/admin/components/add',
    key: '/admin/components/add'
};

class Components extends PureComponent {
    static propTypes = {
        data: PropTypes.array,
        isFetch: PropTypes.bool,
        actions: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.tiles && nextProps.data) {
            const tiles = nextProps.data.map(item => {
                return {
                    key: item['_id'],
                    type: 'link',
                    title: item.name,
                    link: `/admin/components/${item['_id']}`
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
        actions.reset();
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
            reset,
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
    const {data, isFetch, isError} = state['admin-components'];

    return {data, isFetch, isError};
}

export default connect(mapStateToProps, mapDispatchToProps)(Components);
