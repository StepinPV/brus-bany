import React, { memo } from 'react';
import Section from '../Section';
import Caption from '../Caption';
import Text from '../Text';
import Form from '../Form';
import styles from './FormBlock.module.css';
import img from './resources/img.jpg';

export default memo(({ source, data }) => {
    return (
        <Section id='requestForm'>
            <div className={styles.content}>
                <div className={styles['first-column']}>
                    <img src={img} alt="Фотография бани" className={styles.image} loading='lazy' />
                </div>
                <div className={styles['second-column']}>
                    <Caption>Закажите обратный звонок!</Caption>
                    <br/>
                    <Text size='l'>Перезвоним вам в кратчайшие сроки, расскажем о банях все и поможем с выбором</Text>
                    <br/><br/>
                    <Form source={source} data={data} />
                </div>
            </div>
        </Section>
    );
});
