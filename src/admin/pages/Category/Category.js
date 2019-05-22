import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { getCategory, setCategory, saveCategory, resetData, deleteCategory } from './actions';
import Input from '../../components/Input';
import withNotification from '../../../plugins/Notifications/withNotification';
import Additions from './resources/Additions';
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
        category: PropTypes.array,
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
            const { id } = match.params;
            actions.getCategory(id);
        }
    }

    componentDidMount() {
        const { match, actions } = this.props;
        const { id } = match.params;

        if (id === 'add') {
            actions.setCategory({});
        } else {
            actions.getCategory(id);
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
            <Fragment>
                <Header />
                <Breadcrumbs items={breadcrumbs} />
                { isCategoryError ? <div className={styles.error}>{isCategoryError}</div> : this.renderContent() }
            </Fragment>
        );
    }

    renderContent = () => {
        const { category, match } = this.props;

        return category ? (
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    {this.renderId()}
                    {this.renderName()}
                    {this.renderAdditions()}
                    <div className={styles.saveButton} onClick={this.handleSave}>{match.params.id === 'add' ? 'Создать' : 'Cохранить'}</div>
                    {match.params.id !== 'add' ? <div className={styles.deleteButton} onClick={this.handleDelete}>Удалить</div> : null}
                </div>
            </div>
        ) : null;
    };

    renderId = () => {
        const { category } = this.props;
        const { errors } = this.state;

        return (
            <div className={styles.name}>
                <Input
                    value={category._id}
                    title='Введите идентификатор'
                    type='string'
                    required
                    onChange={this.handleIdChange}
                    error={errors['_id']}
                />
            </div>
        );
    };

    renderName = () => {
        const { category } = this.props;
        const { errors } = this.state;

        return (
            <div className={styles.name}>
                <Input
                    value={category.name}
                    title='Введите имя'
                    type='string'
                    required
                    onChange={this.handleNameChange}
                    error={errors['name']}
                />
            </div>
        );
    };

    renderAdditions = () => {
        const { category } = this.props;

        return (
            <div className={styles.additions}>
                <Additions data={category.additions || []} onChange={this.handleAdditionsChange} />
            </div>

        )
    };

    handleIdChange = (value) => {
        const { actions, category } = this.props;

        actions.setCategory({ ...category, _id: value });
    };

    handleNameChange = (name) => {
        const { actions, category } = this.props;

        actions.setCategory({ ...category, name });
    };

    handleAdditionsChange = (additions) => {
        const { actions, category } = this.props;

        actions.setCategory({ ...category, additions });
    };

    handleSave = async () => {
        const { showNotification, actions, history } = this.props;
        const errors = this.getErrors();

        if (errors) {
            showNotification({ message: 'Исправьте ошибки!', status: 'error' });
            this.setState({ errors });
            return;
        }

        const { message, status } = await actions.saveCategory();

        showNotification({ message, status });

        if (status === 'success') {
            history.push('/admin/categories');
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

    getErrors = () => {
        const { category } = this.props;
        const errors = {};
        let hasErrors = false;

        if (!category.name) {
            errors['name'] = 'Поле обязательно к заполнению!';
            hasErrors = true;
        }

        if (!category._id) {
            errors['name'] = 'Поле обязательно к заполнению!';
            hasErrors = true;
        }


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
