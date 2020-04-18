import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getArticle, resetData } from './actions';
import Page from '../../components/Page';
import ArticleComponent from '../../components/Article';
import DataSection from '../../components/DataSection';
import FormBlock from "../../components/FormBlock";
import renderDate from '@utils/RenderDate';
import Meta from '../../components/Meta';
import styles from './Article.module.css';
import cx from 'classnames';

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Блог о строительстве бань',
    link: '/blog'
}];

class Article extends PureComponent {
    static propTypes = {
        article: PropTypes.array,
        isArticleError: PropTypes.string,
        isArticleFetch: PropTypes.bool,
        notFound: PropTypes.bool,

        actions: PropTypes.object,
        match: PropTypes.object,
        location: PropTypes.object,
        history: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.article && prevState.articleId !== nextProps.article._id) {
            return {
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    { title: nextProps.article.article.name }
                ],
                articleId: nextProps.article._id
            }
        }

        return null;
    }

    static initialAction({ dispatch, match }) {
        const { name } = match.params;
        return [dispatch(getArticle(name))];
    }

    state = {
        breadcrumbs: breadcrumbsDefault
    };

    componentDidMount() {
        const { match, actions, article } = this.props;
        const { name } = match.params;

        if (!article) {
            actions.getArticle(name);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, actions } = this.props;

        if (prevProps.match !== match) {
            const { name } = match.params;

            actions.getArticle(name);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isArticleError, notFound, article } = this.props;
        const { breadcrumbs } = this.state;
        let meta = null;

        if (article) {
            meta = {
                title: `${article.article.name} | Брус бани`,
                description: `🏠 ${article.article.name} 💨 Дата публикации: ${renderDate(new Date(article.created))} 💨 Блог о строительстве бань Брус Бани 📳 8(800)201-07-29`,
                type: 'article',
                image: article.article.image,
                imageAlt: article.article.imageAlt
            };
        }

        return (
            <Page breadcrumbs={breadcrumbs} notFound={isArticleError || notFound}>
                <Meta meta={meta}/>
                { isArticleError ? <div>{isArticleError}</div> : this.renderContent() }
            </Page>
        );
    }

    renderContent = () => {
        const { article } = this.props;

        return (
            <>
                {article ? (
                    <DataSection bgStyle='white'>
                        <ArticleComponent
                            article={article.article}
                            captionTag='h1'
                            date={new Date(article.created)} />
                    </DataSection>
                ) : null}
                <div>

                </div>
                <div
                    className={cx('ya-share2', styles.share)}
                    data-services='vkontakte,facebook,odnoklassniki' />
                <FormBlock source='Статья' />
            </>
        );
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
            resetData
        }, dispatch)
    };
}

/**
 * mapStateToProps
 * @param {*} state
 * @returns {Object}
 */
function mapStateToProps(state) {
    const { article, isArticleFetch, isArticleError, notFound } = state['client-article'];

    return { article, isArticleFetch, isArticleError, notFound };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
