import React, { memo, useEffect, useState } from 'react';
import numberWithSpaces from '@utils/numberWithSpaces';
import Logo from '@components/Logo';
import styles from './CP.module.css';
import cx from "classnames";

function CP({ images, infoBlock, equipment, projectBlocksData, additionsData, delivery, finalPrice, onSuccess }) {
    let containerRef = null;

    useEffect(() => {
        let prtCSS = '';
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(element => {
            prtCSS += element.outerHTML;
        });

        const WinPrint = window.open('','','left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');

        WinPrint.document.write(prtCSS);
        WinPrint.document.write(containerRef.outerHTML);

        let linksCount = links.length;
        WinPrint.document.querySelectorAll('link').forEach(function (el) {
            el.onload = function () {
                if(!--linksCount){
                    WinPrint.document.close();
                    WinPrint.focus();
                    WinPrint.print();
                    WinPrint.close();
                    onSuccess();
                }
            };
        });
    }, [])

    return (
        <div ref={ref => { containerRef = ref; }}>
            <div className={cx(styles.header, styles.block)}>
                <Logo className={styles.logo}/>
                <span>Коммерческое предложение компании "Брус бани"</span>
            </div>
            <div className={styles.block} style={{ display: 'flex' }}>
                <img src={images[0].src} style={{ width: '50%' }}/>
                {infoBlock}
            </div>
            <div className={cx(styles.block, styles.images)}>
                {images.map(({ src }) => (
                    <img src={src} />
                ))}
            </div>
            {equipment && equipment.length ? (
                <div className={styles.block}>
                    <div className={styles['block-caption']}>Базовая комплектация</div>
                    <div className={styles['block-content']}>
                        {equipment.map(({ name, value }) => (
                            <div className={styles.group}>
                                <div className={styles['group-caption']}>{name}</div>
                                <div className={styles['group-items']}>
                                    {value ? value.map(({ name }) => (
                                        <div className={styles['group-item']}>− {name}</div>
                                    )) : null}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            ) : null}
            {projectBlocksData && projectBlocksData.length ? (
                <div className={styles.block}>
                    <div className={styles['block-caption']}>Основа</div>
                    <div className={styles['block-content']}>
                        {projectBlocksData.map(({ title, value, price }) => (
                            <div className={styles.group}>
                                <div className={styles['group-caption']}>- {title} {value}: {numberWithSpaces(price)} рублей</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
            {additionsData && additionsData.length ? (
                <div className={styles.block}>
                    <div className={styles['block-caption']}>Дополнения</div>
                    <div className={styles['block-content']}>
                        {additionsData.map(({ name, price }) => (
                            <div className={styles.group}>
                                <div className={styles['group-caption']}>- {name}: {numberWithSpaces(price)} рублей</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
            {delivery.address ? (
                <div className={styles.block}>
                    <div className={styles['block-caption']}>Информация о доставке</div>
                    <div className={styles['block-content']}>
                        <div className={styles.group}>
                            <div className={styles['group-caption']}>Основное</div>
                            <div className={styles['group-items']}>
                                <div className={styles['group-item']}>− Адресс: {delivery.address}</div>
                                <div className={styles['group-item']}>− Расстояние: {delivery.length}</div>
                                <div className={styles['group-item']}>− Стоимость: {numberWithSpaces(delivery.price)} рублей</div>
                            </div>
                        </div>
                        {delivery.additions && delivery.additions.length ? (
                            <div className={styles.group}>
                                <div className={styles['group-caption']}>Дополнения</div>
                                {additionsData.map(({ name, price }) => (
                                    <div className={styles['group-items']}>
                                        <div className={styles['group-item']}>- {name}: {numberWithSpaces(price)} рублей</div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
            <div className={styles.block}>
                <div className={styles['block-caption']}>Итоговая стоимость: {numberWithSpaces(finalPrice)} рублей</div>
            </div>
        </div>
    );
}

export default memo(CP);
