import React, { memo } from 'react';
import SocialNetwork from '../../components/SocialNetwork';
import DataSection from '../DataSection';
import Form from '../Form';
import styles from './FormBlock.module.css';

export default memo(({ source }) => {
    return (
        <DataSection caption='Звоните — расскажем о банях все и поможем с выбором' id='requestForm'>
            <div className={styles.content}>
                <div className={styles['first-column']}>
                    <div className={styles['phone-block']}>
                        <a href="tel:88002010729" className={styles['phone-block-phone']}>8 (800) 201-07-29</a>
                        <a href="mailto:mailto:info@brus-bany.ru" className={styles['phone-block-email']}>info@brus-bany.ru</a>
                    </div>
                    <div className={styles['address-block']}>174510, Новгородская обл, <br/> г. Пестово, ул. Курганная 12</div>
                    <div className={styles['social-networks']}>
                        <SocialNetwork type='vk' className={styles['social-network']} />
                        <SocialNetwork type='fb' className={styles['social-network']} />
                        <SocialNetwork type='ok' className={styles['social-network']} />
                        <SocialNetwork type='inst' className={styles['social-network']} />
                        <SocialNetwork type='youtube' className={styles['social-network']} />
                    </div>
                </div>
                <div className={styles['second-column']}>
                    <Form source={source} />
                </div>
            </div>
        </DataSection>
    );
});
