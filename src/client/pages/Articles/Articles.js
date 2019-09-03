import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getArticles, resetData } from './actions';
import Page from '../../components/Page';
import H1Block from '../../components/H1Block';
import styles from './Articles.module.css';
import FormBlock from "../../components/FormBlock";
import ArticleCard from "../../components/ArticleCard";
import CardList from '../../components/CardList';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Блог о строительстве бань'
}];

class Articles extends PureComponent {
    static propTypes = {
        articles: PropTypes.array,
        isArticlesError: PropTypes.string,
        isArticlesFetch: PropTypes.bool,

        actions: PropTypes.object,
        match: PropTypes.object,
        location: PropTypes.object,
        history: PropTypes.object
    };

    componentDidMount() {
        const { actions } = this.props;

        actions.getArticles();
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isArticlesError } = this.props;

        return (
            <Page breadcrumbs={breadcrumbs}>
                { isArticlesError ? <div>{isArticlesError}</div> : this.renderContent() }
            </Page>
        );
    }

    renderContent = () => {
        const { articles } = this.props;

        return articles ? (
            <Fragment>
                <H1Block
                    caption='Блог о строительстве бань'
                    description='За все время работы мы узнали так много о технологиях строительства бань, что будет просто не честно, если этими знаниями мы не поделимся с вами' />
                <CardList items={articles.map(article => <ArticleCard article={article} />)} />
                <FormBlock source='Список статей' />
            </Fragment>
        ) : null;
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
            getArticles,
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
    const { articles, isArticlesFetch, isArticlesError } = state['client-articles'];

    return { articles, isArticlesFetch, isArticlesError };
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
