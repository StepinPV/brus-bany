import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Items from './resources/Items';
import { resetData, init, createMaterial, updateMaterial, deleteMaterial } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import styles from './Materials.module.css';

const breadcrumbs = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Стройматериалы'
}];

class Materials extends PureComponent {
    static propTypes = {
        materials: PropTypes.array,
        isMaterialsFetch: PropTypes.bool,
        actions: PropTypes.object,
        showNotification: PropTypes.func
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
        const { materials } = this.props;
        return (
            <>
                <Header />
                <Breadcrumbs items={breadcrumbs} />
                <div className={styles.formContainer}>
                    <div className={styles.formWrapper}>
                        <Items
                            materials={materials}
                            createMaterial={this.createMaterial}
                            updateMaterial={this.updateMaterial}
                            deleteMaterial={this.deleteMaterial} />
                    </div>
                </div>
            </>
        );
    }

    createMaterial = async (material) => {
        const { actions: { createMaterial }, showNotification } = this.props;
        const res = await createMaterial(material);

        showNotification({ message: res.message, status: res.status });
    };

    updateMaterial = async (material) => {
        const { actions: { updateMaterial }, showNotification } = this.props;
        const res = await updateMaterial(material);

        showNotification({ message: res.message, status: res.status });
    };

    deleteMaterial = async (material) => {
        const { actions: { deleteMaterial }, showNotification } = this.props;

        if (window.confirm('Вы действительно хотите удалить материал?')) {
            const res = await deleteMaterial(material);

            showNotification({ message: res.message, status: res.status });
        }
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
            resetData,
            init,
            createMaterial,
            updateMaterial,
            deleteMaterial
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
    const {materials, isMaterialsFetch, isMaterialsError} = state['admin-materials'];

    return {materials, isMaterialsFetch, isMaterialsError};
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Materials));
