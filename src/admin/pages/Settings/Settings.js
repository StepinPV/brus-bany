import React, { memo, useState, useEffect } from 'react';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { Button } from '../../../components/Button';
import TextArea from '../../../components/TextArea';
import showNotification from '@utils/showNotification';
import axios from 'axios';
import styles from './Settings.module.css';

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Настройки'
}];

function Settings() {
    const [value, setValue] = useState('');

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/settings/main');
            setValue(res.data.data || '{}');
        })();
    }, []);

    const save = async () => {
        try {
            JSON.parse(value);
            const res = await axios.put('/api/settings/main', { data: value });
            showNotification({ status: 'success', message: res.data.message });
        } catch(err) {
            showNotification({ status: 'error', message: 'Неверный формат настроек' });
        }
    };

    return (
        <>
            <Header/>
            <Breadcrumbs items={breadcrumbsItems} />
            <div className={styles.settings}>
                <TextArea
                    title='Настройки'
                    value={value}
                    inputClassName={styles.input}
                    onChange={setValue} />
                <Button
                    type='yellow'
                    caption='Сохранить'
                    className={styles.button}
                    onClick={save}
                />
            </div>
        </>
    );
}


export default memo(Settings);
