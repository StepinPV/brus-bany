import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import Form from './resources/Form';
import { getLayout, getLayoutFormat } from './actions';

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Планировки',
    link: '/admin/layouts'
}, {
    title: 'Редактирование или добавление планировки'
}];

class Layout extends PureComponent {
    static defaultProps = {
        layout: PropTypes.array,
        isLayoutFetch: PropTypes.bool,

        layoutFormat: PropTypes.array,
        isLayoutFormatFetch: PropTypes.bool,

        actions: PropTypes.object,
        match: PropTypes.object
    };

    state = {
        addMode: false
    };

    componentDidMount() {
        const { match, actions } = this.props;
        const { id } = match.params;

        if (id === 'add') {
            this.setState({ addMode: true })
        } else {
            actions.getLayout(id);
        }

        actions.getLayoutFormat();
    }

    render() {
        return (
            <Fragment>
                <Header />
                <Breadcrumbs items={breadcrumbsItems} />
                <Form />
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
            getLayout,
            getLayoutFormat
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
    const {
        layout, isLayoutFetch, isLayoutError,
        layoutFormat, isLayoutFormatFetch, isLayoutFormatError
    } = state['admin-layout'];

    return { layout, isLayoutFetch, isLayoutError, layoutFormat, isLayoutFormatFetch, isLayoutFormatError };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
