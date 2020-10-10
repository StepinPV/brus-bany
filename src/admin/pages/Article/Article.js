import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Form from '../../components/Form';
import { getArticle, setArticle, saveArticle, resetData, deleteArticle } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import format from '../../formats/article-item';
import styles from './Article.module.css';
import { Button } from "../../../components/Button";

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Статьи',
    link: '/admin/articles'
}];

class Article extends PureComponent {
    static propTypes = {
        article: PropTypes.object,
        isArticleError: PropTypes.string,
        isArticleFetch: PropTypes.bool,

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
                    { title: match.params.name === 'add' ? 'Создание статьи' : 'Редактирование статьи' }
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
        const { name } = match.params;

        if (name === 'add') {
            actions.setArticle({});
        } else {
            actions.getArticle(name);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isArticleError } = this.props;
        const { breadcrumbs } = this.state;

        return (
            <>
                <Header />
                <Breadcrumbs items={breadcrumbs} />
                { isArticleError ? <div className={styles.error}>{isArticleError}</div> : this.renderForm() }
            </>
        );
    }

    renderForm = () => {
        const { article, match } = this.props;
        const { errors } = this.state;
        const { name } = match.params;

        return article ? (
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    <Form format={format} value={article} onChange={this.handleChange} errors={errors} />

                    <Button
                        caption={name === 'add' ? 'Создать' : 'Сохранить'}
                        type='yellow'
                        onClick={this.handleSave}
                        className={styles.button}
                    />
                    {name !== 'add' ? (
                        <Button
                            caption='Удалить'
                            type='red'
                            onClick={this.handleDelete}
                            className={styles.button}
                        />
                    ) : null}
                </div>
            </div>
        ) : null;
    };

    handleChange = (article, newErrors) => {
        const { actions } = this.props;

        this.setState({ errors: newErrors });
        actions.setArticle(article);
    };

    handleSave = async () => {
        const { showNotification, actions, history, match } = this.props;
        const { name } = match.params;

        const { message, status, data } = await actions.saveArticle();

        showNotification({ message, status });

        switch (status) {
            case 'success':
                if (name === 'add') {
                    window.location = '/admin/articles';
                }
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

        if (window.confirm('Вы действительно хотите удалить статью?')) {
            const { message, status } = await actions.deleteArticle();

            showNotification({ message, status });

            if (status === 'success') {
                window.location = '/admin/articles';
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
            getArticle,
            setArticle,
            saveArticle,
            resetData,
            deleteArticle
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
    const { article, isArticleFetch, isArticleError } = state['admin-article'];

    return { article, isArticleFetch, isArticleError };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Article));
