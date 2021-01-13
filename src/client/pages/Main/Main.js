import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Page from '../../components/Page';
import CardList from '../../../components/CardList';
import PhotoCard from '../../../components/PhotoCard';
import { Link } from '../../../components/Button';
import Meta from '../../components/Meta';
import Top from './resources/Top';
import Categories from './resources/Categories';
import HowWork from './resources/HowWork';
import WhyMe from './resources/WhyMe';
import OurProduction from './resources/OurProduction';
import DataSection from '../../components/DataSection';
import FormBlock from '../../components/FormBlock';
import {getPhotos, resetData} from './actions';
import PropTypes from 'prop-types';
import styles from './Main.module.css';
import { Pages } from '@constructor-components';

const META = {
    title: 'Купить недорогие бани под ключ от производителя | Брус бани',
    description: '🏠 Строим недорогие бани под ключ по всей России 💨 Более 150 проектов бань с гарантией 3 года 💨 Собственное производство 📳 8(800)201-07-29'
};

class Main extends PureComponent {
    static propTypes = {
        photos: PropTypes.array,
        actions: PropTypes.object
    };

    static initialAction({ dispatch }) {
        return [dispatch(getPhotos())];
    }

    componentDidMount() {
        const { actions, photos } = this.props;

        if (!photos) {
            actions.getPhotos();
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { photos } = this.props;

        return (
            <Page opacityHeader hasLinkToMain={false}>
                <Meta meta={META} />
                <Top />
                <Categories id='categories' />
                <HowWork />
                <WhyMe />
                {photos.length ? (
                    <DataSection
                        bgStyle='grey'
                        caption='Фотоотчеты'
                        description='За все время работы мы построили огромное количество объектов различной сложности. В данном разделе вы можете просмотреть фотографии, видеообзоры, отзывы и описание данных проектов'
                        captionTag='h2'>
                        <CardList items={photos.map(photo => ({
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
                <DataSection
                    captionTag='h2'
                    bgStyle='white'
                    caption='Делимся накопленным опытом'
                    description='Основываясь на нашем опыте и профессиональной экспертизе, мы ведем свой блог, в котором делимся с вами полезными советами не только о строительстве бань, но и о правилах эксплуатации'>
                    <Pages
                        __pages__={this.props.pages}
                        __pageFolders__={this.props.pageFolders}
                        filter='index < 6'
                        folder='5f3afaae19c6b22d24b5d0a5'
                        paddingBottom='none'
                        paddingTop='none'
                        sort='page1[5242] > page2[5242] ? -1 : (page1[5242] === page2[5242] ? 0 : 1'
                    />
                    <div className={styles['button-container']}>
                        <Link href='/blog' caption='Читать больше' />
                    </div>
                </DataSection>
                <OurProduction />
                <FormBlock source='Главная страница' />
            </Page>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getPhotos,
            resetData
        }, dispatch)
    };
}

function mapStateToProps(state) {
    const { photos } = state['client-main'];

    return { photos };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
