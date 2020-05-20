import React, { memo } from 'react';
import numberWithSpaces from '@utils/numberWithSpaces';
import Logo from '@components/Logo';
import Caption from '../../../../components/Caption';
import { Button } from '../../../../../components/Button';
import Form from '../../../../../admin/components/Form';
import { getItemPrice as getAdditionPrice } from '../Additions';
import withNotification from '@plugins/Notifications/withNotification';
import styles from './CP.module.css';
import cx from "classnames";

function renderManager(id) {
    switch(id) {
        case '1': return 'C уважением, Марина: 8 (921) 204-65-12';
        case '2': return 'C уважением, Константин: 8 (901) 543-85-19';
        case '3': return 'C уважением, Юлия: 8 (977) 384-88-52';
    }
}

function renderBaseEquipment(equipment) {
    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-caption']}>Базовая комплектация</div>
            <div className={styles['preview-block-content']}>
                {equipment ? equipment.map(({ name, value }) => (
                    <div className={styles['preview-group']}>
                        <div className={styles['preview-group-caption']}>{name}</div>
                        <div className={styles['preview-group-items']}>
                            {value ? value.map(({ name }) => (
                                <div className={styles['preview-group-item']}>{name}</div>
                            )) : null}
                        </div>
                    </div>
                )) : null}
            </div>
        </div>
    );
}

function renderComplectation(project, data) {
    const { complectation } = data;
    const { complectationBlocks } = project.categoryId;

    const defaultItemId = complectationBlocks.defaultItemId;

    const item = complectationBlocks.items.find(item => item.id === (complectation || defaultItemId))

    const price = project.prices && project.prices[item.id] ? project.prices[item.id] : 0;

    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-caption']}>База</div>
            <div className={styles['preview-block-content']}>
                <div className={styles['preview-group-caption']}>{complectationBlocks.itemTitle} {item.name} {item.title.toLowerCase()}<span className={styles['preview-price']}>{` ${numberWithSpaces(price)} рублей`}</span></div>
            </div>
        </div>
    );
}

function renderProjectBlock(projectBlock, project, data) {
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
            <div className={styles['preview-block-caption']}>{projectBlock.itemTitle}</div>
            <div className={styles['preview-block-content']}>
                <div className={styles['preview-group-caption']}>{item.name}<span className={styles['preview-price']}>{` ${numberWithSpaces(price)} рублей`}</span></div>
            </div>
        </div>
    );
}

function renderAdditions(project, data, additions) {
    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-caption']}>Дополнения</div>
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
                                    <div className={styles['preview-group-item']}>{name} <span className={styles['preview-price']}>{` ${numberWithSpaces(itemPrice)} рублей`}</span></div>
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
            <div className={styles['preview-block-caption']}>Адрес доставки</div>
            <div className={styles['preview-block-content']}>
                <div className={styles['preview-group-caption']}>{delivery.address}<span className={styles['preview-price']}>{` ${numberWithSpaces(delivery.price)} рублей`}</span></div>
            </div>
        </div>
    );
}

function renderDeliveryAdditions(project, data, additions) {
    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-caption']}>Дополнения к доставке</div>
            <div className={styles['preview-block-content']}>
                {additions ? additions.map(({ name, _id, value }) => {
                    const items = [];

                    if (value) {
                        value.forEach(({ type, name, _id, price }) => {
                            if (data.deliveryAdditions[_id]) {
                                let itemPrice = getAdditionPrice(project, data, price);

                                if (type !== 'boolean') {
                                    itemPrice *= data.deliveryAdditions[_id];
                                }

                                items.push(
                                    <div className={styles['preview-group-caption']}>{name} <span className={styles['preview-price']}>{` ${numberWithSpaces(itemPrice)} рублей`}</span></div>
                                );
                            }
                        });
                    }

                    return items.length ? items : null;
                }) : null}
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
            <div className={styles['preview-block-caption']}>Итоговая стоимость: <span className={styles['preview-price']}>{numberWithSpaces(finalPrice)} рублей</span></div>
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

const format = [{
    _id: 'manager',
    title: 'Менеджер',
    type: 'select',
    items: [{
        id: '1',
        title: 'Марина'
    }, {
        id: '2',
        title: 'Константин'
    }, {
        id: '3',
        title: 'Юлия'
    }]
}, {
    _id: 'images',
    title: 'Изображения',
    type: 'array',
    format: [{
        _id: 'image',
        title: 'Изображение',
        type: 'image'
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
}];

function CP({ CPData, images, data, project, infoBlock, finalPrice, onClose, onChange, showNotification }) {
    let containerRef = null;

    const formValue = {
        images: CPData && CPData.images || images,
        manager: CPData && CPData.manager || '1',
        additionalData: CPData && CPData.additionalData || [],
    };

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
                    // WinPrint.close();
                    // onSuccess();
                }
            };
        });
    }

    const renderPreview = () => {
        const { categoryId } = project;
        return (
            <div ref={ref => { containerRef = ref; }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginTop: '32px' }}>Коммерческое предложение компании "Брус бани"</div>
                <div className={cx(styles['preview-header'], styles['preview-block'])}>
                    <Logo className={styles['preview-logo']}/>
                    <div>
                        <div style={{ textAlign: 'right', margin: '4px 0' }}>https://brus-bany.ru</div>
                        <div style={{ textAlign: 'right', margin: '4px 0' }}>info@brus-bany.ru</div>
                        <div style={{ textAlign: 'right', margin: '4px 0' }}>{renderManager(formValue.manager)}</div>
                    </div>
                </div>
                <div className={styles['preview-block']} style={{ display: 'flex' }}>
                    <img src={formValue.images[0].image} style={{ width: '50%' }}/>
                    {infoBlock}
                </div>
                <div className={cx(styles['preview-block'], styles['preview-images'])}>
                    {formValue.images.map(({ image }) => (
                        <img src={image} />
                    ))}
                </div>
                {categoryId.newEquipment && categoryId.newEquipment.length ? renderBaseEquipment(categoryId.newEquipment) : null}
                {renderComplectation(project, data)}
                {categoryId.projectBlocks && categoryId.projectBlocks.length ? categoryId.projectBlocks.map(projectBlock => {
                    return renderProjectBlock(projectBlock, project, data)
                }) : null}
                {data.additions && project.categoryId.additions ? renderAdditions(project, data, project.categoryId.additions) : null}
                {data.delivery && project.categoryId.deliveryData.delivery ? renderDelivery(data) : null}
                {data.deliveryAdditions && project.categoryId.deliveryData.additions ? renderDeliveryAdditions(project, data, project.categoryId.deliveryData.additions) : null}
                {formValue && formValue.additionalData && formValue.additionalData.length ? renderCustomAdditions(formValue.additionalData) : null}
                {renderFinalPrice(finalPrice + getCustomAdditionsPrice(formValue))}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div>
                <div style={{ marginBottom: '32px' }}>
                    <Caption align='center'>Генерация КП</Caption>
                </div>
                <div style={{ margin: '0 48px' }}>
                    <Button type='yellow' caption='Печать' size='m' className={styles['print-button']} onClick={print} />
                    <Button type='red' caption='К проекту' size='m' className={styles['print-button']} onClick={onClose} />
                    <Button type='red' caption='Скопировать ссылку' size='m' className={styles['print-button']} onClick={() => {
                        navigator.clipboard.writeText(document.location.href)
                            .then(() => {
                                showNotification({ message: 'Ссылка скопирована', status: 'success' });
                            })
                            .catch(err => {
                                showNotification({ message: 'Скопируйте ссылку вручную', status: 'error' });
                            });
                    }} />
                </div>
                <div className={styles.form}>
                    <Form
                        format={format}
                        value={formValue}
                        errors={{}}
                        onChange={onChange} />
                </div>
            </div>
            <div className={styles['content-preview']}>
                {renderPreview()}
            </div>
        </div>
    );
}

export default memo(withNotification(CP));
