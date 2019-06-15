import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Form from '../../components/Form';
import { getLayout, setLayout, saveLayout, resetData, deleteLayout } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import format from '../../formats/layout';
import styles from './Layout.module.css';

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Планировки',
    link: '/admin/layouts'
}];

class Layout extends PureComponent {
    static propTypes = {
        layout: PropTypes.array,
        isLayoutError: PropTypes.string,
        isLayoutFetch: PropTypes.bool,

        actions: PropTypes.object,
        match: PropTypes.object,
        showNotification: PropTypes.func,
        history: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.breadcrumbs) {
            const { match } = nextProps;
            return {
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    { title: match.params.id === 'add' ? 'Создание планировки' : 'Редактирование планировки' }
                    ]
            }
        }

        return null;
    }

    state = {
        errors: {},
        breadcrumbs: null
    };

    componentDidMount() {
        const { match, actions } = this.props;
        const { id } = match.params;

        if (id === 'add') {
            actions.setLayout({});
        } else {
            actions.getLayout(id);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isLayoutError } = this.props;
        const { breadcrumbs } = this.state;

        return (
            <Fragment>
                <Header />
                <Breadcrumbs items={breadcrumbs} />
                { isLayoutError ? <div className={styles.error}>{isLayoutError}</div> : this.renderForm() }
            </Fragment>
        );
    }

    renderForm = () => {
        const { layout, match } = this.props;
        const { errors } = this.state;
        const { id } = match.params;

        return layout ? (
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    <Form format={format} value={layout} onChange={this.handleChange} errors={errors} />

                    <div className={styles.saveButton} onClick={this.handleSave}>Cохранить</div>
                    { id !== 'add' ? <div className={styles.deleteButton} onClick={this.handleDelete}>Удалить</div> : null }
                </div>
            </div>
        ) : null;
    };

    handleChange = (id, layout) => {
        const { actions } = this.props;
        const { errors } = this.state;

        this.setState({ errors: { ...errors, [id]: null }});
        actions.setLayout(layout);
    };

    handleSave = async () => {
        const { showNotification, actions, history } = this.props;

        const { message, status, data } = await actions.saveLayout();

        showNotification({ message, status });

        switch (status) {
            case 'success':
                history.push('/admin/layouts');
                break;
            case 'error':
                if (data && data.errors) {
                    this.setState({ errors: data.errors });
                }
                break;
            default:
                break;
        }
    };

    handleDelete = async () => {
        const { showNotification, actions, history } = this.props;

        if (window.confirm('Вы действительно хотите удалить планировку?')) {
            const { message, status } = await actions.deleteLayout();

            showNotification({ message, status });

            if (status === 'success') {
                history.push('/admin/layouts');
            }
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
            getLayout,
            setLayout,
            saveLayout,
            resetData,
            deleteLayout
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
    const { layout, isLayoutFetch, isLayoutError } = state['admin-layout'];

    return { layout, isLayoutFetch, isLayoutError };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Layout));
