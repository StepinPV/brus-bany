import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Comments from './resources/Comments';
import Video from './resources/Video';
import Top from './resources/Top';
import styles from "../Delivery/Delivery.module.css";
import FormBlock from "../../components/FormBlock";

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Отзывы'
}];

class Feedback extends PureComponent {
    render() {
        return (
            <Page opacityHeader>
                <Top />
                <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
                <Video />
                <Comments />
                <FormBlock source='Страница отзывов' />
            </Page>
        );
    }
}

export default Feedback;
