import React, { memo } from 'react';
import SocialNetwork from '../../components/SocialNetwork';
import Section from '../Section';
import Caption from '../Caption';
import Text from '../Text';
import Form from '../Form';
import styles from './FormBlock.module.css';

export default memo(({ source, data }) => {
    return (
        <Section id='requestForm'>
            <div className={styles.content}>
                <div className={styles['first-column']}>
                    <div>
                        <Caption align='center' color='white'>Звоните!</Caption>
                        <br/>
                        <Caption size='s' align='center' color='white'>Расскажем о банях все и поможем с выбором</Caption>
                        <br/>
                    </div>
                    <div className={styles['phone-block']}>
                        <a href="tel:88002010729" className={styles['phone-block-phone']}>8 (800) 201-07-29</a>
                        <a href="mailto:info@brus-bany.ru" className={styles['phone-block-email']}>info@brus-bany.ru</a>
                    </div>
                </div>
                <div className={styles['second-column']}>
                    <Form source={source} data={data} />
                </div>
            </div>
        </Section>
    );
});
