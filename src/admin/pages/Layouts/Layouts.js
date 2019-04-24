import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../components/Breadcrumbs';
import {getLayouts} from './actions';

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Планировки'
}];

const loadingTile = {
    type: 'loading',
    key: 'loading'
};

const addTile = {
    type: 'add',
    link: '/admin/layouts/add',
    key: '/admin/layouts/add'
};

class Layouts extends PureComponent {
    static defaultProps = {
        layouts: PropTypes.array,
        isLayoutsFetch: PropTypes.bool,
        actions: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.tiles && nextProps.layouts) {
            return {
                tiles: [addTile]
            }
        }

        return null;
    }

    state = {
        tiles: null,
        defaultTiles: [loadingTile, addTile]
    };

    componentDidMount() {
        const {actions} = this.props;
        actions.getLayouts();
    }

    render() {
        const { tiles, defaultTiles } = this.state;

        return (
            <Fragment>
                <Header/>
                <Breadcrumbs items={breadcrumbsItems}/>
                <Tiles items={tiles || defaultTiles} />
            </Fragment>
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
            getLayouts
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
    const {layouts, isLayoutsFetch, isLayoutsError} = state['admin-layouts'];

    return {layouts, isLayoutsFetch, isLayoutsError};
}

export default connect(mapStateToProps, mapDispatchToProps)(Layouts);
