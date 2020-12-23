import React, { memo, useEffect } from 'react';
import Caption from '../../../../components/Caption';
import { Button } from '../../../../../components/Button';
import Form from '../../../../../admin/components/Form';
import withNotification from '@plugins/Notifications/withNotification';
import styles from './CP.module.css';
import loadable from '@loadable/component';
import axios from 'axios';

const Dogovor = loadable(() => import('./resources/Dogovor'));
const CPRender = loadable(() => import('./resources/CP'));

const format = [{
    _id: 'mode',
    title: 'Режим',
    type: 'select',
    items: [{
        id: 'cp',
        title: 'КП'
    }, {
        id: 'dogovor',
        title: 'Договор'
    }, {
        id: 'tz',
        title: 'ТЗ'
    }]
}, {
    _id: 'images',
    title: 'Изображения',
    type: 'object',
    format: [{
        _id: 'scheme',
        title: 'Планировка',
        type: 'image'
    }, {
        _id: 'other',
        title: 'Остальные изображения',
        type: 'array',
        format: [{
            _id: 'image',
            title: 'Главное изображение',
            type: 'image'
        }]
    }]
}, {
    _id: 'additionalData',
    title: 'Дополнения',
    itemTitleField: 'caption',
    type: 'array',
    format: [{
        _id: 'caption',
        title: 'Заголовок',
        type: 'string'
    }, {
        _id: 'price',
        title: 'Цена',
        type: 'integer number'
    }]
}, {
    _id: 'date',
    title: 'Дата создания договора',
    type: 'date'
}, {
    _id: 'projectDate',
    title: 'Дата поставки бани',
    type: 'date'
}, {
    _id: 'documentNumber',
    title: 'Номер договора',
    type: 'string'
}, {
    _id: 'addressAddition',
    title: 'Уточнение адреса',
    type: 'string'
}, {
    _id: 'client',
    title: 'Информация о клиенте',
    type: 'object',
    format: [{
        _id: 'name',
        title: 'Имя клиента (Иванов Иван Ивановоч)',
        type: 'string',
    }, {
        _id: 'name2',
        title: 'Имя клиента (Иванова Ивана Ивановича)',
        type: 'string',
    }, {
        _id: 'phone',
        title: 'Номер телефона',
        type: 'string',
    }, {
        _id: 'passport',
        title: 'Паспорт',
        type: 'object',
        format: [{
            _id: 'number',
            title: 'Номер',
            type: 'string'
        }, {
            _id: 'where',
            title: 'Кем выдан',
            type: 'string'
        }, {
            _id: 'when',
            title: 'Дата выдачи',
            type: 'string'
        }, {
            _id: 'whenBirth',
            title: 'Дата рождения',
            type: 'string'
        }, {
            _id: 'whereBirth',
            title: 'Место рождения',
            type: 'string'
        }, {
            _id: 'registration',
            title: 'Зарегестрирован по адресу',
            type: 'string'
        }]
    }]
}];

function CP({ CPData, data, project, infoBlock, finalPrice, onClose, onChange, showNotification, images, projectName }) {
    let containerRef = null;

    const formValue = {
        images: CPData && CPData.images || images,
        manager: CPData && CPData.manager,
        additionalData: CPData && CPData.additionalData || [],
        date: CPData && CPData.date || Date.now(),
        projectDate: CPData && CPData.projectDate || Date.now(),
        documentNumber: CPData && CPData.documentNumber || '',
        addressAddition: CPData && CPData.addressAddition || '',
        mode: CPData && CPData.mode || 'cp',
        client: CPData && CPData.client || {},
        viewMode: CPData && CPData.viewMode || false
    };

    if (formValue.mode === 'dogovor1' || formValue.mode === 'dogovor2') {
        formValue.mode = 'dogovor';
    }

    if (!formValue.manager && localStorage) {
        let managerId = localStorage.getItem('MANAGER_ID');

        (function selectManager() {
            if (!['1', '2', '3'].includes(managerId)) {
                managerId = prompt('Введите номер менеджера:\n1. Марина \n2. Константинъ \n3. Вера');
                selectManager();
            } else {
                localStorage.setItem('MANAGER_ID', managerId);
                onChange({ ...formValue, manager: managerId })
            }
        })();
    }

    const sendViewEvent = async () => {
        if (formValue.viewMode) {
            const documentType = format.find(i => i._id === 'mode').items.find(i => i.id === formValue.mode);
            const manager = {
                1: 'Марина',
                2: 'Константинъ',
                3: 'Вера',
            }[formValue.manager];

            if (manager) {
                await axios.post(`/api/events`, {
                    data: {
                        event: 'document_view',
                        manager,
                        client: formValue.client,
                        documentNumber: formValue.documentNumber,
                        documentName: documentType.title,
                        projectName,
                        host: document.location.origin,
                        pathname: document.location.pathname + document.location.search
                    }
                });
            }
        }
    };

    useEffect(() => {
        sendViewEvent();
    }, []);

    useEffect(() => {
        const keydownHandler = async (e) => {
            if(e.keyCode === 51 && e.shiftKey) {
                e.preventDefault();
                e.stopPropagation();

                const from = `/link_${Math.floor(Math.random() * (999999 - 1000) + 1000)}`;

                await axios.post(`/api/links`, {
                    data: {
                        to: document.location.pathname + document.location.search,
                        from
                    }
                });

                navigator.clipboard.writeText(`${document.location.origin}${from}`)
                    .then(() => {
                        showNotification({ message: 'Ссылка скопирована', status: 'success' });
                    })
                    .catch(err => {
                        showNotification({ message: 'Ошибка генерации ссылки', status: 'error' });
                    });
            }

            if(e.keyCode === 50 && e.shiftKey) {
                e.preventDefault();
                e.stopPropagation();

                onChange({ ...formValue, viewMode: !formValue.viewMode });
            }
        };

        document.addEventListener('keydown', keydownHandler);

        return () => {
            document.removeEventListener('keydown', keydownHandler);
        }
    }, [CPData]);

    function print() {
        let prtCSS = '';
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(element => {
            prtCSS += element.outerHTML;
        });

        const WinPrint = window.open('','','left=50,    top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');

        WinPrint.document.write(prtCSS);
        WinPrint.document.write(containerRef.outerHTML);

        let linksCount = links.length;
        WinPrint.document.querySelectorAll('link').forEach(function (el) {
            el.onload = function () {
                if(!--linksCount){
                    WinPrint.document.close();
                    WinPrint.focus();
                    WinPrint.print();
                }
            };
        });
    }

    const renderPreview = () => {
        return (
            <div ref={ref => { containerRef = ref; }}>
                {formValue.mode ==='cp' ? <CPRender project={project} formValue={formValue} data={data} finalPrice={finalPrice} infoBlock={infoBlock} /> : null}
                {formValue.mode ==='dogovor' || formValue.mode === 'tz' ? (
                    <Dogovor
                        type={formValue.mode}
                        formValue={formValue}
                        data={data}
                        project={project}
                        finalPrice={finalPrice}
                        projectName={projectName} />
                ) : null}
            </div>
        );
    }

    return (
        <div style={formValue.viewMode ? { width: '100%', padding: '0', margin: '0 auto', maxWidth: '900px' } : null} className={styles.container}>
            {formValue.viewMode ? null : (
                <>
                    <div style={{ marginBottom: '32px' }}>
                        <Caption align='center'>Генерация документов</Caption>
                    </div>
                    <div style={{ margin: '0 48px' }}>
                        <Button type='yellow' caption='Печать' size='s' className={styles['print-button']} onClick={print} />
                        <Button type='red' caption='К проекту' size='s' className={styles['print-button']} onClick={onClose} />
                    </div>
                    <div className={styles.form}>
                        <Form
                            format={format}
                            value={formValue}
                            errors={{}}
                            onChange={(data) => {
                                onChange(data)
                            }} />
                    </div>
                </>
            )}
            <div style={formValue.viewMode ? { position: 'inherit' } : null} className={styles['content-preview']}>
                {renderPreview()}
            </div>
        </div>
    );
}

export default memo(withNotification(CP));
