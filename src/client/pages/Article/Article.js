import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getArticle, resetData } from './actions';
import Page from '../../components/Page';
import ArticleComponent from '../../components/Article';
import NotFound from '../NotFound/NotFound';
import FormBlock from "../../components/FormBlock";

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
                    { title: nextProps.article.name }
                ],
                articleId: nextProps.article._id
            }
        }

        return null;
    }

    state = {
        breadcrumbs: breadcrumbsDefault
    };

    componentDidMount() {
        const { match, actions } = this.props;
        const { name } = match.params;

        actions.getArticle(name);
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
        const { isArticleError, notFound } = this.props;
        const { breadcrumbs } = this.state;

        if (notFound) {
            return <NotFound />;
        }

        return (
            <Page breadcrumbs={breadcrumbs}>
                { isArticleError ? <div>{isArticleError}</div> : this.renderContent() }
                <FormBlock source='Статья' />
            </Page>
        );
    }

    renderContent = () => {
        const { article } = this.props;

        return article ? <ArticleComponent article={article.article} captionTag='h1' /> : null;
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
