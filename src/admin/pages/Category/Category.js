import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getCategory, setCategory, saveCategory, resetData, deleteCategory } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import Filters from './resources/Filters';
import categoryFormat from '../../formats/category';
import Form from '../../components/Form';
import styles from './Category.module.css';

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Категории бань',
    link: '/admin/categories'
}];

class Category extends PureComponent {
    static propTypes = {
        category: PropTypes.object,
        isCategoryError: PropTypes.string,
        isCategoryFetch: PropTypes.bool,

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
                    { title: match.params.id === 'add' ? 'Создание категории' : 'Редактирование категории' }
                ]
            }
        }

        return null;
    }

    state = {
        errors: {},
        breadcrumbs: null
    };

    componentDidUpdate(prevProps, prevState) {
        const { match, actions } = this.props;

        if (prevProps.match !== match) {
            const { name } = match.params;
            actions.getCategory(name);
        }
    }

    componentDidMount() {
        const { match, actions } = this.props;
        const { name } = match.params;

        if (name === 'add') {
            actions.setCategory({});
        } else {
            actions.getCategory(name);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isCategoryError } = this.props;
        const { breadcrumbs } = this.state;

        return (
            <>
                <Header />
                <Breadcrumbs items={breadcrumbs} />
                { isCategoryError ? <div className={styles.error}>{isCategoryError}</div> : this.renderContent() }
            </>
        );
    }

    renderContent = () => {
        const { category, match } = this.props;
        const { errors } = this.state;

        return category ? (
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    <Form format={categoryFormat} value={category} onChange={this.handleChange} errors={errors} />
                    <Filters />
                    <div className={styles.saveButton} onClick={this.handleSave}>{match.params.id === 'add' ? 'Создать' : 'Cохранить'}</div>
                    {match.params.id !== 'add' ? <div className={styles.deleteButton} onClick={this.handleDelete}>Удалить</div> : null}
                </div>
            </div>
        ) : null;
    };

    handleChange = (id, value) => {
        const { actions } = this.props;
        actions.setCategory(value);
    };

    handleSave = async () => {
        const { showNotification, actions, history } = this.props;
        const { message, status, data } = await actions.saveCategory();

        showNotification({ message, status });

        switch (status) {
            case 'success':
                history.push('/admin/categories');
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

        if (window.confirm('Вы действительно хотите удалить категорию?')) {
            const { message, status } = await actions.deleteCategory();

            showNotification({ message, status });

            if (status === 'success') {
                history.push('/admin/categories');
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
            getCategory,
            setCategory,
            saveCategory,
            resetData,
            deleteCategory
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
    const { category, isCategoryFetch, isCategoryError } = state['admin-category'];

    return { category, isCategoryFetch, isCategoryError };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Category));
