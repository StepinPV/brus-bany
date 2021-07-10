import React, { memo, useState, useEffect } from 'react';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import settingsFormat from '../../formats/settings';
import showNotification from '@utils/showNotification';
import Form from '../../components/Form';
import axios from 'axios';
import styles from './Settings.module.css';

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Настройки'
}];

function Settings() {
    const [value, setValue] = useState({});

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/settings/main');
            setValue(res.data.data ? JSON.parse(res.data.data) : {});
        })();
    }, []);

    const save = async () => {
        try {
            const res = await axios.put('/api/settings/main', { data: JSON.stringify(value) });
            showNotification({ status: 'success', message: res.data.message });
        } catch(err) {
            showNotification({ status: 'error', message: 'Неверный формат настроек' });
        }
    };

    const convertedValue = {
        ...value,
        theme: JSON.stringify(value.theme || {})
    }

    return (
        <>
            <Header/>
            <Breadcrumbs items={breadcrumbsItems} />
            <div className={styles.settings}>
                <Form
                    format={settingsFormat}
                    value={convertedValue}
                    errors={{}}
                    images={value['__images__'] || {}}
                    onChange={(value, errors, images) => {
                        setValue({
                            ...value,
                            theme: JSON.parse(value.theme || '{}'),
                            __images__: images
                        });
                    }} />
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
