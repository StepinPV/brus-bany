import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import Button from '../../components/Button';
import DataSection from '../../components/DataSection';
import img1 from './resources/1.jpg';
import img2 from './resources/2.jpg';
import styles from './Promo.module.css';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Скидки и акции'
}];

class Promo extends PureComponent {
    render() {
        return (
            <Page breadcrumbs={breadcrumbs}>
                <DataSection bgStyle='white' caption='Скидки и акции' description='Надеемся, что вы найдете для себя интересное предложение и исполните свою мечту'>
                    <div className={styles.items}>
                        <div className={styles.item}>
                            <img className={styles.image} src={img1} alt="" />
                            <div className={styles.info}>
                                <Caption className={styles.name} size='s'>Гарантия лучшей цены</Caption>
                                <Text className={styles.text}>Сравниваете цены на разных сайтах? Пришлите предложение от конкурентов и мы <strong style={{ color: '#d7b32a' }}>сделаем</strong> вам <strong style={{ color: '#5e9300' }}>предложение лучше</strong></Text>
                                <Button caption='Получить выгодное предложение' />
                            </div>
                        </div>
                        <div className={styles.item}>
                            <img className={styles.image} src={img2} alt="" />
                            <div className={styles.info}>
                                <Caption className={styles.name} size='s'>Теплый угол и утепление!</Caption>
                                <Text className={styles.text}>При заказе бани до конца <strong style={{ color: '#5e9300' }}>августа 2019</strong> года получите <strong style={{ color: '#d7b32a' }}>теплый угол</strong> и <strong style={{ color: '#d7b32a' }}>утепление</strong> в подарок!</Text>
                                <Button caption='Узнать подробнее' />
                            </div>
                        </div>
                    </div>
                </DataSection>
            </Page>
        );
    }
}

export default Promo;
