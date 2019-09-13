import React, {memo} from 'react';
import Caption from '../../../../components/Caption';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import styles from './Top.module.css';

function Top() {
    return (
        <>
            <div className={styles.banner} />
            <div className={styles.layout} />
            <div className={styles['content-container']}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <Caption color='white' size='l' tag='h1'>Купить баню под ключ от производителя</Caption>
                    </div>
                    <div className={styles.description}>
                        <Text>Срок строительства от 10 дней, работаем круглый год по всей России, гарантия 2 года</Text>
                    </div>
                    <div className={styles.buttons}>
                        <a href='#categories'>
                            <Button type='yellow' caption='Выбрать баню' className={styles['first-button']} />
                        </a>
                        <a href='/akcii/quiz'>
                            <Button type='red' caption='Получить подарок' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Top);
