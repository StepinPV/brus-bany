import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../components/Breadcrumbs';
import { updatePrices } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import styles from './Admin.module.css';
import PropTypes from "prop-types";

const tiles = [{
    key: '/admin/layouts',
    type: 'link',
    title: 'Планировки',
    link: '/admin/layouts'
}, {
    key: '/admin/categories',
    type: 'link',
    title: 'Категории',
    link: '/admin/categories'
}, {
    key: '/admin/projects',
    type: 'link',
    title: 'Проекты',
    link: '/admin/projects'
}, {
    key: '/admin/articles',
    type: 'link',
    title: 'Статьи',
    link: '/admin/articles'
}, {
    key: '/admin/photos',
    type: 'link',
    title: 'Фотоотчеты',
    link: '/admin/photos'
}];

const breadcrumbsItems = [{
    title: 'Главная'
}];

class Admin extends PureComponent {
    static propTypes = {
        showNotification: PropTypes.func,
        actions: PropTypes.object,
        isUpdatePricesFetch: PropTypes.bool
    };

    render() {
        const { isUpdatePricesFetch } = this.props;

        return (
          <>
            <Header />
            <Breadcrumbs items={breadcrumbsItems} />
            <Tiles items={tiles} />
            <div className={styles.button} onClick={this.updatePrices}>{ isUpdatePricesFetch ? '...идет обновление цен' : 'Обновить цены' }</div>
          </>
        );
    }

    updatePrices = async () => {
      const { actions: { updatePrices }, showNotification } = this.props;

      const res = await updatePrices();

        showNotification({ message: res ? 'Цены успешно обновлены' : 'Ошибка обновления цен', status: res ? 'success' : 'error' });
    };
}

/**
 * mapDispatchToProps
 * @param {*} dispatch
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            updatePrices
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
    const { isUpdatePricesFetch } = state['admin'];

    return { isUpdatePricesFetch };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Admin));
