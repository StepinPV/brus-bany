import React, {memo} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Meta from '../../components/Meta';
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
                <div className={styles.message}>Спасибо за то, что оставили заявку.</div>
                <div className={styles['second-message']}>В скором времени мы свяжемся с вами.</div>
            </div>
            <Footer />
        </>
    );
}

export default memo(Thanks);
