import React, { memo, useEffect, useState } from 'react';
import numberWithSpaces from '@utils/numberWithSpaces';
import Logo from '@components/Logo';
import Caption from '../../../../components/Caption';
import { Button } from '../../../../../components/Button';
import Form from '../../../../../admin/components/Form';
import styles from './CP.module.css';
import cx from "classnames";

function getPrice(formValue) {
    let price = 0;

    if (formValue.data) {
        formValue.data.forEach(block => {
            if (block.groups) {
                block.groups.forEach(group => {
                    if (group.items) {
                        group.items.forEach(item => {
                            price += item.price || 0;
                        });
                    }
                });
            }
        });
    }

    return price;
}

function renderManager(id) {
    switch(id) {
        case '1': return 'C уважением, Мария: 8 (921) 204 6512';
        case '2': return 'C уважением, Константин: 8 (901) 543 85 19';
        case '3': return 'C уважением, Юлия: 8 (977) 384 88 52';
    }
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
    _id: 'data',
    title: 'Блоки',
    itemTitleField: 'caption',
    type: 'array',
    format: [{
        _id: 'caption',
        title: 'Заголовок блока',
        type: 'string'
    }, {
        _id: 'groups',
        title: 'Группы',
        itemTitleField: 'caption',
        type: 'array',
        format: [{
            _id: 'caption',
            title: 'Заголовок группы',
            type: 'string'
        }, {
            _id: 'items',
            title: 'Элементы',
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
        }]
    }]
}];

function CP({ images, data, infoBlock, onSuccess }) {
    let containerRef = null;

    const [formValue, setFormValue] = useState({ images, manager: '1', data });

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
                {formValue.data ? formValue.data.map(dataElement => {
                    return (
                        <div className={styles['preview-block']}>
                            <div className={styles['preview-block-caption']}>{dataElement.caption}</div>
                            <div className={styles['preview-block-content']}>
                                {dataElement.groups ? dataElement.groups.map(groupElement => (
                                    <div className={styles['preview-group']}>
                                        {groupElement.caption ? (
                                            <>
                                                <div className={styles['preview-group-caption']}>{groupElement.caption}</div>
                                                <div className={styles['preview-group-items']}>
                                                    {groupElement.items ? groupElement.items.map(item => (
                                                        <div className={styles['preview-group-item']}>− {item.caption} <span className={styles['preview-price']}>{item.price ? ` ${numberWithSpaces(item.price)} рублей` : null}</span></div>
                                                    )) : null}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {groupElement.items ? groupElement.items.map(item => (
                                                    <div className={styles['preview-group-caption']}>{item.caption} <span className={styles['preview-price']}>{item.price ? ` ${numberWithSpaces(item.price)} рублей` : null}</span></div>
                                                )) : null}
                                            </>
                                            )}
                                    </div>
                                )) : null}
                            </div>

                        </div>
                    );
                }) : null}
                <div className={styles['preview-block']}>
                    <div className={styles['preview-block-caption']}>Итоговая стоимость: <span className={styles['preview-price']}>{numberWithSpaces(getPrice(formValue))} рублей</span></div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div>
                <Caption align='center'>Генерация КП</Caption>
                <Button type='yellow' caption='Печать' size='m' className={styles['print-button']} onClick={print} />
                <div className={styles.form}>
                    <Form
                        format={format}
                        value={formValue}
                        errors={{}}
                        onChange={setFormValue}/>
                </div>
            </div>
            <div className={styles['content-preview']}>
                {renderPreview()}
            </div>
        </div>
    );
}

export default memo(CP);
