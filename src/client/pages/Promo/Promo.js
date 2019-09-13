import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import Button from '../../components/Button';
import H1Block from '../../components/H1Block';
import img1 from './resources/1.jpg';
import img2 from './resources/2.jpg';
import img3 from './resources/3.jpg';
import styles from './Promo.module.css';
import FormBlock from "../../components/FormBlock";
import withForm from '../../plugins/Form/withForm';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Скидки и акции'
}];

class Promo extends PureComponent {
    static propTypes = {
        showForm: PropTypes.func
    };

    render() {
        const { showForm } = this.props;

        return (
            <Page breadcrumbs={breadcrumbs}>
                <H1Block caption='Скидки и акции' description='Надеемся, что вы найдете для себя интересное предложение и исполните свою мечту' />
                <div className={styles.items}>
                    <div className={styles.item}>
                        <img className={styles.image} src={img3} alt="Банные пренадлежности" />
                        <div className={styles.info}>
                            <Caption className={styles.name} size='s'>Пройдите опрос и получите подарок</Caption>
                            <Text className={styles.text}>
                                Мы зададим 5 простых вопросов, чтобы поближе познакомиться с вами. Пройдите опрос, мы подберем для вас баню и <strong style={{ color: '#359bd0' }}>подарим подарок</strong>!
                            </Text>
                            <a href='/akcii/quiz'>
                                <Button caption='Перейти на страницу акции' />
                            </a>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img className={styles.image} src={img1} alt="Гарантия лучшей цены" />
                        <div className={styles.info}>
                            <Caption className={styles.name} size='s'>Гарантия лучшей цены</Caption>
                            <Text className={styles.text}>
                                Сравниваете цены на разных сайтах? Пришлите предложение от конкурентов и мы <strong style={{ color: '#d7b32a' }}>сделаем</strong> вам <strong style={{ color: '#5e9300' }}>предложение лучше</strong>
                            </Text>
                            <Button caption='Получить выгодное предложение' onClick={() => { showForm({ title: 'Оставить заявку', source: 'Акция - гарантия лучшей цены' }) }}/>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img className={styles.image} src={img2} alt="Теплый угол" />
                        <div className={styles.info}>
                            <Caption className={styles.name} size='s'>Теплый угол и утепление!</Caption>
                            <Text className={styles.text}>
                                При заказе бани до конца <strong style={{ color: '#5e9300' }}>августа 2019</strong> года получите <strong style={{ color: ' #d7b32a' }}>теплый угол</strong> и <strong style={{ color: '#d7b32a' }}>утепление</strong> в подарок!
                            </Text>
                            <Button caption='Узнать подробнее' onClick={() => { showForm({ title: 'Оставить заявку', source: 'Акция - теплый угол и утепление в подарок' }) }} />
                        </div>
                    </div>
                </div>
                <FormBlock source='Страница акций' />
            </Page>
        );
    }
}

export default withForm(Promo);
