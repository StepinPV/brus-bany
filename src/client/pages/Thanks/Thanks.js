import React, {memo} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Meta from '../../components/Meta';
import Caption from '../../components/Caption'
import Text from '../../components/Text'
import styles from './Thanks.module.css';

const META = {
    title: 'Спасибо за то, что оставили заявку',
    description: 'Заявка успешно отправлена'
};

function Thanks() {
    return (
        <>
            <Meta meta={META} />
            <Header />
            <div className={styles.container}>
                <div className={styles.message}>
                    <Caption size='m' align='center'>Спасибо, что оставили заявку</Caption>
                </div>
                <Text size='l' align='center'>В скором времени мы свяжемся с вами</Text>
            </div>
            <Footer />
        </>
    );
}

export default memo(Thanks);
