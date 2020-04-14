import React, {memo} from 'react';
import Page from '../../components/Page';
import Top from './resources/Top';
import Article from '../../components/Article';
import FormBlock from "../../components/FormBlock";
import Breadcrumbs from "../../../components/Breadcrumbs";
import styles from './AboutCompany.module.css';
import Meta from '../../components/Meta';

const META = {
    title: 'О компании | Брус бани',
    description: 'Компания "Брус бани" основана в 2009 году в Новгородской области г.Пестово. С момента основания компании мы построили около 1000 объектов бань'
};

const article = {
    content: [{
        content: [{
            item: {
                typeId: 'text',
                value: 'Компания "Брус бани" <a href="/rekvizity" style="color: #ff8562; text-decoration: none">основана</a> в 2009 году в Новгородской области г.Пестово.\n' +
                    'С момента основания компании мы построили около 1000 объектов бань, некоторые проекты можно посмотреть в разделе <a href="/photos" style="color: #ff8562; text-decoration: none">"Фотоотчеты построенных объектов"</a>.'
            }
        }, {
            item: {
                typeId: 'text',
                value: 'Мы не гонимся за количеством построенных объектов, мы хотим, чтобы наши клиенты стали счастливее. Мы искренне радуемся, когда нам оставляют позитивные отзывы, это не просто слова, нам действительно это важно.'
            }
        }, {
            item: {
                typeId: 'text',
                value: 'В чем секрет нашего успеха? Самое главное - это строительная бригады. Мы хотим, чтобы вы знали, что мы очень тщательно отбираем людей, которые будут строить вам баню. У нас работают люди, которым не все равно на вашу безопасность, которые хотят, чтобы баня радовала своих владельцев долго. В наших бригадах нет алкогольно зависымых людей, нет не адекватных людей, только проверенные строители с большим опытом работы.'
            }
        }, {
            item: {
                typeId: 'text',
                value: 'К сожалению, некоторые компании из-за большого количества заказов берут непроверенных строителей. В результате горят бани или объекты построены не так качественно, как могли бы быть. Мы не изменяем своим принципам, если у нас сейчас все бригады заняты, мы так и говорим нашим клиентам, что нужно немного подождать, а не отправляем непроверенных специалистов.'
            }
        }, {
            item: {
                typeId: 'text',
                value: 'Будем рады вашим вопросам, подберем вам баню, все посчитаем и с большим удовольствием построим!'
            }
        }]
    }]
};

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'О компании'
}];

function AboutCompany() {
    return (
        <Page opacityHeader>
            <Meta meta={META} />
            <Top />
            <Breadcrumbs items={breadcrumbs} />
            <div className={styles.article}>
                <Article article={article} />
            </div>
            <FormBlock source='О компании' />
        </Page>
    );
}

export default memo(AboutCompany);
