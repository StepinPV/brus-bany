import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Form from '../../components/Form';
import { getLayout, setLayout, saveLayout, resetData } from './actions';
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
        const { layout } = this.props;
        const { errors } = this.state;

        return layout ? (
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    <Form format={format} value={layout} onChange={this.handleChange} errors={errors} />

                    <div className={styles.saveButton} onClick={this.handleSave}>Cохранить</div>
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
        const errors = this.getErrors();

        if (errors) {
            showNotification({ message: 'Исправьте ошибки!', status: 'error' });
            this.setState({ errors });
            return;
        }

        const { message, status } = await actions.saveLayout();

        showNotification({ message, status });

        if (status === 'success') {
            history.push('/admin/layouts');
        }
    };

    getErrors = () => {
        const { layout } = this.props;
        const errors = {};
        let hasErrors = false;

        const validateItems = (items, values, errors) => {
            items.forEach(item => {
                const value = values[item['_id']];

                if (item.required && !value) {
                    errors[item['_id']] = 'Поле обязательно к заполнению!';
                    hasErrors = true;
                    return;
                }

                if (item.min) {
                    if ((item.type === 'float number' || item.type === 'integer number') && value < item.min) {
                        errors[item['_id']] = `Значение должно быть больше ${item.min}!`;
                        hasErrors = true;
                        return;
                    }

                    if (item.type === 'array' && (!value || value.length < item.min)) {
                        errors[item['_id']] = `Количество записей должно быть больше ${item.min}!`;
                        hasErrors = true;
                        return;
                    }
                }

                if (item.type === 'object' && value) {
                    errors[item['_id']] = {};
                    validateItems(item.format, value, errors[item['_id']]);
                }

                if (item.type === 'array' && value) {
                    errors[item['_id']] = [];
                    value.forEach((val, index) => {
                        errors[item['_id']][index] = {};
                        validateItems(item.format, val, errors[item['_id']][index]);
                    });
                }
            });
        };

        validateItems(format, layout, errors);

        return hasErrors ? errors : null;
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
            setLayout,
            saveLayout,
            resetData
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
