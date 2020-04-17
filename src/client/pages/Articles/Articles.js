import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getArticles, resetData } from './actions';
import Page from '../../components/Page';
import H1Block from '../../components/H1Block';
import FormBlock from "../../components/FormBlock";
import ArticleCard from "../../../components/ArticleCard";
import CardList from '../../../components/CardList';
import Meta from '../../components/Meta';
import dzenLogo from './resources/dzen.jpeg';
import styles from './Articles.module.css';
import {Simple} from "../../../components/Button";

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Блог о строительстве бань'
}];

const META = {
    title: 'Блог о строительстве бань | Брус бани',
    description: '🏠 За все время работы мы узнали так много о строительстве бань, что будет не честно, если мы не поделимся этими знаниями с вами 📳 8(800)201-07-29'
};

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

    static initialAction({ dispatch }) {
        return [dispatch(getArticles())];
    }

    componentDidMount() {
        const { actions, articles } = this.props;

        if (!articles)  {
            actions.getArticles();
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isArticlesError } = this.props;

        return (
            <Page breadcrumbs={breadcrumbs}>
                <Meta meta={META} />
                <H1Block
                    caption='Блог о строительстве бань'
                    description='За все время работы мы узнали так много о технологиях строительства бань, что будет просто не честно, если этими знаниями мы не поделимся с вами' />
                { isArticlesError ? <div>{isArticlesError}</div> : this.renderContent() }
                <a href='https://zen.yandex.ru/brusbany' target="_blank" rel="noopener noreferrer nofollow" className={styles.dzenLink}>
                    <img src={dzenLogo} className={styles['dzenLink-image']} alt='Логотип Яндекс Дзен' />
                    <div className={styles['dzenLink-text']}>
                        <div className={styles['dzenLink-text-wrapper']}>
                            <div className={styles['dzenLink-name']}>Читайте нас в Яндекс Дзен</div>
                            <div className={styles['dzenLink-description']}>
                                Расскажем об особенностях строительства бань, о традициях и о других интересных фактах
                            </div>
                            <Simple caption='Перейти в Яндекс Дзен' />
                        </div>
                    </div>
                </a>
                <FormBlock source='Список статей' />
            </Page>
        );
    }

    renderContent = () => {
        const { articles } = this.props;

        debugger;

        return articles ? (
            <CardList items={articles.reverse().map(article => ({
                id: article._id,
                element: <ArticleCard article={article} />
            }))} />
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
