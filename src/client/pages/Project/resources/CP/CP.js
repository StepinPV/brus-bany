import React, { memo, useEffect } from 'react';
import numberWithSpaces from '@utils/numberWithSpaces';
import Logo from '@components/Logo';
import Caption from '../../../../components/Caption';
import { Button } from '../../../../../components/Button';
import Form from '../../../../../admin/components/Form';
import { getItemPrice as getAdditionPrice } from '../Additions';
import { getEquipmentItemPrice, getEquipmentText, getEquipmentElementValue } from '../Equipment';
import withNotification from '@plugins/Notifications/withNotification';
import styles from './CP.module.css';
import cx from "classnames";
import stringHash from '@utils/stringHash';
import loadable from '@loadable/component';
import axios from 'axios';

const Dogovor = loadable(() => import('./resources/Dogovor'));

function renderManager(id) {
    switch(id) {
        case '1': return 'C уважением, Марина: 8 (921) 204-65-12';
        case '2': return 'C уважением, Константинъ: 8 (901) 543-85-19';
        case '3': return 'C уважением, Вера: 8 (996) 927-81-28';
    }
}

function renderBaseEquipment(project, data, equipment, onlyPrice) {
    const renderItem = (groupName, itemName, { typeId, value }) => {
        let val = getEquipmentElementValue(data.equipment, groupName, itemName);

        switch(typeId) {
            case 'select': {
                if (value) {
                    const item = value.filter(({ condition }) => { return !condition || getEquipmentText(project, data, condition) === 'true' }).find(item => val ? val === stringHash(item.name) : item.default);

                    if (item) {
                        const price = getEquipmentItemPrice(project, data, item.price);
                        if (onlyPrice && !price) return;
                        return <div className={styles['preview-group-item']}>{getEquipmentText(project, data, item.name)} {price ? <span className={styles['preview-price']}>{` ${numberWithSpaces(getEquipmentItemPrice(project, data, item.price))} рублей`}</span> : null}</div>;
                    }
                }
                return;
            }

            case 'base':
                return value && !onlyPrice ? <div className={styles['preview-group-item']}>{getEquipmentText(project, data, value)}</div> : null;

            case 'number': {
                if (value) {
                    const price = val ? (parseInt(val) - parseInt(getEquipmentText(project, data, value.default))) * getEquipmentItemPrice(project, data, value.price) : 0;
                    if (onlyPrice && !price) return;
                    return <div className={styles['preview-group-item']}>{getEquipmentText(project, data, value.name)} {val ? val : getEquipmentText(project, data, value.default)} шт {price ? <span className={styles['preview-price']}>{` ${numberWithSpaces(price)} рублей`}</span> : null}</div>;
                }
            }
        }
    };

    return (
        <div className={styles['preview-block']}>
            <b className={styles['preview-block-caption']}>Комплектация</b>
            <div className={styles['preview-block-content']}>
                {equipment ? equipment.filter(({ condition }) => { return !condition || getEquipmentText(project, data, condition) === 'true' }).map(({ name: groupName, value }) => (
                    <div className={styles['preview-group']}>
                        { onlyPrice ? null : <div className={styles['preview-group-caption']}>{groupName}</div> }
                        <div className={styles['preview-group-items']}>
                            {value ? value.filter(({ condition }) => { return !condition || getEquipmentText(project, data, condition) === 'true' }).map(({ name: itemName, value }) => {
                                return renderItem(groupName, itemName, value);
                            }) : null}
                        </div>
                    </div>
                )) : null}
            </div>
        </div>
    );
}

function renderComplectation(project, data, withPrice) {
    const { complectation } = data;
    const { complectationBlocks } = project.categoryId;

    const defaultItemId = complectationBlocks.defaultItemId;

    const item = complectationBlocks.items.find(item => item.id === (complectation || defaultItemId))

    const price = project.prices && project.prices[item.id] ? project.prices[item.id] : 0;

    return (
        <div className={styles['preview-block']}>
            <b className={styles['preview-block-caption']}>База</b>
            <div className={styles['preview-block-content']}>
                <div className={styles['preview-group-caption']}>{complectationBlocks.itemTitle} {item.name} {item.title.toLowerCase()} { withPrice ? <span className={styles['preview-price']}>{` ${numberWithSpaces(price)} рублей`}</span> : null}</div>
            </div>
        </div>
    );
}
function renderProjectBlock(projectBlock, project, data, withPrice) {
    const { blocks={} } = data;
    const selectedId = blocks[projectBlock._id];

    if (!selectedId) {
        return;
    }

    const item = projectBlock.items.find(item => item._id === selectedId)

    const { layoutId: params } = project;
    const price = eval(item.price);

    return (
        <div className={styles['preview-block']}>
            <b className={styles['preview-block-caption']}>{projectBlock.itemTitle}</b>
            <div className={styles['preview-block-content']}>
                <div className={styles['preview-group-caption']}>{item.name}{ withPrice ? <span className={styles['preview-price']}>{` ${numberWithSpaces(price)} рублей`}</span> : null}</div>
            </div>
        </div>
    );
}
function renderAdditions(project, data, additions, withPrice) {
    return (
        <div className={styles['preview-block']}>
            <b className={styles['preview-block-caption']}>Дополнения</b>
            <div className={styles['preview-block-content']}>
                {additions ? additions.map(({ name, _id, value }) => {
                    const items = [];

                    if (value) {
                        value.forEach(({ type, name, _id, price }) => {
                            if (data.additions[_id]) {
                                let itemPrice = getAdditionPrice(project, data, price);

                                if (type !== 'boolean') {
                                    itemPrice *= data.additions[_id];
                                }

                                items.push(
                                    <div className={styles['preview-group-item']}>{name}{type !== 'boolean' && data.additions[_id] > 1 ? ` (${data.additions[_id]} шт) ` : ' '}{ withPrice ? <span className={styles['preview-price']}>{` ${numberWithSpaces(itemPrice)} рублей`}</span> : null}</div>
                                );
                            }
                        });
                    }

                    return items.length ? (
                        <div className={styles['preview-group']}>
                            <div className={styles['preview-group-caption']}>{name}</div>
                            <div className={styles['preview-group-items']}>
                                {items}
                            </div>
                        </div>
                    ) : null;
                }) : null}
            </div>
        </div>
    );
}
function renderDelivery(data) {
    const { delivery } = data;

    return (
        <div className={styles['preview-block']}>
            <b className={styles['preview-block-caption']}>Адрес доставки</b>
            <div className={styles['preview-block-content']}>
                <div className={styles['preview-group-caption']}>{delivery.address} ({delivery.length} км)<span className={styles['preview-price']}>{` ${numberWithSpaces(delivery.price)} рублей`}</span></div>
            </div>
        </div>
    );
}
function renderCustomAdditions(additions) {
    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-content']}>
                {additions.map(addition => {
                    return <div className={styles['preview-group-caption']}>{addition.caption} {addition.price ? <span className={styles['preview-price']}>{` ${numberWithSpaces(addition.price)} рублей`}</span> : null}</div>
                })}
            </div>
        </div>
    );
}
function renderFinalPrice(finalPrice) {
    return (
        <div className={styles['preview-block']}>
            <b className={styles['preview-block-caption']}>Итоговая стоимость: <span className={styles['preview-price']}>{numberWithSpaces(finalPrice)} рублей</span></b>
        </div>
    );
}
function getCustomAdditionsPrice(formValue) {
    let price = 0;

    if (formValue && formValue.additionalData) {
        formValue.additionalData.forEach(addition => {
            price += addition.price || 0;
        });
    }
    return price;
}

const renderCP = (project, formValue, data, infoBlock, finalPrice) => {
    const { categoryId } = project;
    return (
        <div className={styles.cp}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginTop: '32px' }}>Коммерческое предложение компании "Брус бани"</div>
            <div className={cx(styles['preview-header'], styles['preview-block'])}>
                <Logo className={styles['preview-logo']}/>
                <div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>https://brus-bany.ru</div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>info@brus-bany.ru</div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>{renderManager(formValue.manager)}</div>
                </div>
            </div>
            <div className={styles['preview-block']} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <img src={formValue.images.other[0].image} style={{ width: '100%', maxWidth: '300px', marginBottom: '16px' }} />
                <div style={{ maxWidth: '400px' }}>
                    {infoBlock}
                </div>
            </div>
            <div className={cx(styles['preview-block'], styles['preview-images'])}>
                {formValue.images.other.map(({ image }) => (
                    <img src={image} />
                ))}
            </div>
            <img src={formValue.images.scheme} style={{ width: '100%' }} />
            {renderComplectation(project, data, true)}
            {categoryId.projectBlocks && categoryId.projectBlocks.length ? categoryId.projectBlocks.map(projectBlock => {
                return renderProjectBlock(projectBlock, project, data, true)
            }) : null}
            {categoryId.baseEquipment && categoryId.baseEquipment.length ? renderBaseEquipment(project, data, categoryId.baseEquipment) : null}
            {data.additions && project.categoryId.additions ? renderAdditions(project, data, project.categoryId.additions, true) : null}
            {data.delivery && project.categoryId.deliveryData.delivery ? renderDelivery(data) : null}
            {formValue && formValue.additionalData && formValue.additionalData.length ? renderCustomAdditions(formValue.additionalData) : null}
            {renderFinalPrice(finalPrice + getCustomAdditionsPrice(formValue))}
        </div>
    )
}

const format = [{
    _id: 'mode',
    title: 'Режим',
    type: 'select',
    items: [{
        id: 'dogovor1',
        title: 'Договор по готовой бане'
    }, {
        id: 'dogovor2',
        title: 'Договор по стационарной бане'
    }, {
        id: 'cp',
        title: 'КП'
    }, {
        id: 'tz',
        title: 'ТЗ'
    }]
}, {
    _id: 'manager',
    title: 'Менеджер',
    type: 'select',
    items: [{
        id: '1',
        title: 'Марина'
    }, {
        id: '2',
        title: 'Константинъ'
    }, {
        id: '3',
        title: 'Вера'
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
            type: 'text'
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
            type: 'text'
        }, {
            _id: 'registration',
            title: 'Зарегестрирован по адресу',
            type: 'text'
        }]
    }]
}];

function CP({ CPData, data, project, infoBlock, finalPrice, onClose, onChange, showNotification, images, projectName }) {
    let containerRef = null;

    const formValue = {
        images: CPData && CPData.images || images,
        manager: CPData && CPData.manager || '1',
        additionalData: CPData && CPData.additionalData || [],
        date: CPData && CPData.date || Date.now(),
        projectDate: CPData && CPData.projectDate || Date.now(),
        documentNumber: CPData && CPData.documentNumber || '',
        addressAddition: CPData && CPData.addressAddition || '',
        mode: CPData && CPData.mode || 'cp',
        client: CPData && CPData.client || {},
        viewMode: CPData && CPData.viewMode || false
    };

    const sendViewEvent = async () => {
        if (formValue.viewMode) {
            const documentType = format.find(i => i._id === 'mode').items.find(i => i.id === formValue.mode);
            const managerName = format.find(i => i._id === 'manager').items.find(i => i.id === formValue.manager);

            await axios.post(`/api/events`, {
                data: {
                    event: 'document_view',
                    manager: managerName.title,
                    client: formValue.client,
                    documentNumber: formValue.documentNumber,
                    documentName: documentType.title,
                    projectName,
                    host: document.location.origin,
                    pathname: document.location.pathname + document.location.search
                }
            });
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
                {formValue.mode ==='cp' ? renderCP(project, formValue, data, infoBlock, finalPrice) : null}
                {formValue.mode ==='dogovor1' || formValue.mode === 'dogovor2' || formValue.mode === 'tz' ? (
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
                <div>
                    <div style={{ marginBottom: '32px' }}>
                        <Caption align='center'>Генерация КП</Caption>
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
                            onChange={onChange} />
                    </div>
                </div>
            )}
            <div style={formValue.viewMode ? { position: 'inherit' } : null} className={styles['content-preview']}>
                {renderPreview()}
            </div>
        </div>
    );
}

export default memo(withNotification(CP));
