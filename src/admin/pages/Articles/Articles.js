import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { resetData, init } from './actions';
import ArticleCard from "../../../components/ArticleCard";
import AddCard from "../../../components/AddCard";
import CardList from "../../../components/CardList/CardList";

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Статьи'
}];

class Articles extends PureComponent {
    static propTypes = {
        articles: PropTypes.array,
        actions: PropTypes.object
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
        const { articles } = this.props;

        return (
            <>
                <Header/>
                <Breadcrumbs items={breadcrumbsItems}/>
                {articles ? this.renderArticles() : null}
            </>
        );
    }

    renderArticles = () => {
        const { articles } = this.props;

        const items = articles.map(article => ({
            id: article._id,
            element: (
                <ArticleCard
                    article={article}
                    link={`/admin/articles/${article['translateName']}`}
                />
            )
        }));

        items.unshift({
            id: 'add',
            element: (
                <AddCard link='/admin/articles/add' />
            )
        });

        return <CardList items={items} />;
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
            init
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
    const {articles} = state['admin-articles'];

    return {articles};
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
