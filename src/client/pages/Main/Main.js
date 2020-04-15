import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Page from '../../components/Page';
import CardList from '../../../components/CardList';
import PhotoCard from '../../../components/PhotoCard';
import ArticleCard from '../../../components/ArticleCard';
import { Link } from '../../../components/Button';
import Meta from '../../components/Meta';
import Top from './resources/Top';
import Categories from './resources/Categories';
import HowWork from './resources/HowWork';
import WhyMe from './resources/WhyMe';
import OurProduction from './resources/OurProduction';
import DataSection from '../../components/DataSection';
import FormBlock from '../../components/FormBlock';
import {getPhotos, getArticles, resetData} from './actions';
import PropTypes from 'prop-types';
import styles from './Main.module.css';

const META = {
    title: 'Купить недорогие бани под ключ от производителя | Брус бани',
    description: '🏠 Строим недорогие бани под ключ по всей России 💨 Более 150 проектов бань с гарантией 3 года 💨 Собственное производство 📳 8(800)201-07-29'
};

class Main extends PureComponent {
    static propTypes = {
        photos: PropTypes.array,
        articles: PropTypes.array,
        actions: PropTypes.object
    };

    static initialAction({ dispatch }) {
        return [dispatch(getPhotos()), dispatch(getArticles())];
    }

    componentDidMount() {
        const { actions, photos, articles } = this.props;

        if (!photos) {
            actions.getPhotos();
        }

        if (!articles) {
            actions.getArticles();
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { photos, articles } = this.props;
        const preparedPhotos = photos ? photos.slice(photos.length - 6, photos.length).reverse() : [];
        const preparedArticles = articles ? articles.slice(articles.length - 3, articles.length).reverse() : [];

        return (
            <Page opacityHeader>
                <Meta meta={META} />
                <Top />
                <Categories id='categories' />
                <HowWork />
                <WhyMe />
                {preparedPhotos.length ? (
                    <DataSection
                        bgStyle='grey'
                        caption='Фотоотчеты построенных бань'
                        description='За все время работы мы построили огромное количество объектов различной сложности. В данном разделе вы можете просмотреть фотографии, видеообзоры, отзывы и описание данных проектов.'
                        captionTag='h2'>
                        <CardList items={preparedPhotos.map(photo => ({
                            id: photo._id,
                            element: (
                                <PhotoCard
                                    photo={photo}
                                    category={photo.projectId.categoryId}
                                    layout={photo.projectId.layoutId} />
                            )
                        }))} />
                        <div className={styles['button-container']}>
                            <Link href='/photos' caption='Смотреть все' />
                        </div>
                    </DataSection>
                ) : null}
                <OurProduction />
                {preparedArticles.length ? (
                    <DataSection
                        captionTag='h2'
                        bgStyle='grey'
                        caption='Делимся накопленным опытом'
                        description='Основываясь на нашем опыте и профессиональной экспертизе, мы ведем свой блог, в котором делимся с вами полезными советами не только о строительстве бань, но и о правилах эксплуатации.'>
                        <CardList items={preparedArticles.map(article => ({
                            id: article._id,
                            element: <ArticleCard article={article} />
                        }))} />
                        <div className={styles['button-container']}>
                            <Link href='/blog' caption='Читать больше' />
                        </div>
                    </DataSection>
                ) : null}
                <FormBlock source='Главная страница' />
            </Page>
        );
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
            getPhotos,
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
    const { photos, articles } = state['client-main'];

    return { photos, articles };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
