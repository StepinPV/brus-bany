import React, { memo } from 'react';
import { getItemPrice as getAdditionPrice } from '../../../Additions';
import { getEquipmentItemPrice, getEquipmentText, getEquipmentElementValue } from '../../../Equipment';
import logo from '../../../../../../../images/logo.svg';
import numberWithSpaces from '@utils/numberWithSpaces';
import stringHash from '@utils/stringHash';
import styles from './CP.module.css';
import cx from "classnames";

function renderManager(id) {
    switch(id) {
        case '1': return 'C уважением, Марина Старикова: 8 (921) 204-65-12';
        case '2': return 'C уважением, Константинъ: 8 (901) 543-85-19';
        case '3': return 'C уважением, Вера: 8 (999) 333-85-63';
        case '4': return 'C уважением, Марина Ланская 8 (999) 333-85-63';
        case '5': return 'C уважением, Елена Давыдова 8 (999) 333-85-63';
    }
}

function renderBaseEquipment(customEval, data, equipment) {
    const renderItem = (groupName, itemName, { typeId, value }) => {
        switch(typeId) {
            case 'select': {
                let val = getEquipmentElementValue(data.e, groupName, itemName);
                if (value) {
                    const item = value.filter(({ condition }) => { return !condition || getEquipmentText(customEval, condition, {}) === 'true' }).find(item => val ? val === stringHash(item.name) : item.default);

                    if (item) {
                        const price = getEquipmentItemPrice(customEval, item.price, {});
                        return <div className={styles['group-item']}>{getEquipmentText(customEval, item.name, {})} {price ? <span className={styles['price']}>{` ${numberWithSpaces(getEquipmentItemPrice(customEval, item.price, {}))} рублей`}</span> : null}</div>;
                    }
                }
                return;
            }

            case 'list': {
                const list = project.layoutId[value.source];

                return list && list.length ? list.map((item, listIndex) => {
                    let val = getEquipmentElementValue(data.e, groupName, `${itemName}[${listIndex}]`);

                    if (val) {
                        if (value.values[val]) {
                            const price = getEquipmentItemPrice(customEval, value.values[val].price, { item });
                            return <div className={styles['group-item']}>{getEquipmentText(customEval, value.values[val].value, { item })} {price ? <span className={styles['price']}>{` ${numberWithSpaces(getEquipmentItemPrice(customEval, value.values[val].price, { item }))} рублей`}</span> : null}</div>;
                        }
                    } else {
                        return <div className={styles['group-item']}>{getEquipmentText(customEval, value.default, { item })}</div>;
                    }
                }) : null;
            }

            case 'base':
                return value ? <div className={styles['group-item']}>{getEquipmentText(customEval, value, {})}</div> : null;

            case 'number': {
                let val = getEquipmentElementValue(data.e, groupName, itemName);
                if (value) {
                    const price = val ? (parseInt(val) - parseInt(getEquipmentText(customEval, value.default, {}))) * getEquipmentItemPrice(customEval, value.price, {}) : 0;
                    return <div className={styles['group-item']}>{getEquipmentText(customEval, value.name, {})} {val ? val : getEquipmentText(customEval, value.default, {})} шт {price ? <span className={styles['price']}>{` ${numberWithSpaces(price)} рублей`}</span> : null}</div>;
                }
            }
        }
    };

    return (
        <div className={styles['block']}>
            <b className={styles['block-caption']}>Комплектация</b>
            <div className={styles['block-content']}>
                {equipment ? equipment.filter(({ condition }) => { return !condition || getEquipmentText(customEval, condition, {}) === 'true' }).map(({ name: groupName, value }) => (
                    <div className={styles['group']}>
                        <div className={styles['group-caption']}>{groupName}</div>
                        <div className={styles['group-items']}>
                            {value ? value.filter(({ condition }) => { return !condition || getEquipmentText(customEval, condition, {}) === 'true' }).map(({ name: itemName, value }) => {
                                return renderItem(groupName, itemName, value);
                            }) : null}
                        </div>
                    </div>
                )) : null}
            </div>
        </div>
    );
}

function renderComplectation(customEval, blocks, data, withPrice) {
    const { complectationBlocks } = blocks;

    const item = complectationBlocks.items.find(item => item.id === (data.c || complectationBlocks.defaultItemId))

    const price = customEval(item.price);

    return (
        <div className={styles['block']}>
            <b className={styles['block-caption']}>База</b>
            <div className={styles['block-content']}>
                <div className={styles['group-caption']}>{complectationBlocks.itemTitle} {item.name} {item.title.toLowerCase()} { withPrice ? <span className={styles['price']}>{` ${numberWithSpaces(price)} рублей`}</span> : null}</div>
            </div>
        </div>
    );
}
function renderProjectBlock(customEval, projectBlock, data, withPrice) {
    const { b={} } = data;
    const selectedId = b[projectBlock.id];

    if (!selectedId) {
        return;
    }

    const item = projectBlock.items.find(item => item.id === selectedId)

    const price = customEval(item.price);

    return (
        <div className={styles['block']}>
            <b className={styles['block-caption']}>{projectBlock.itemTitle}</b>
            <div className={styles['block-content']}>
                <div className={styles['group-caption']}>{customEval("eval(`'" + item.name + "'`)")} {item.title} { withPrice ? <span className={styles['price']}>{` ${numberWithSpaces(price)} рублей`}</span> : null}</div>
            </div>
        </div>
    );
}

function renderAdditions(customEval, data, additions, withPrice) {
    if (!additions) return null;

    const items = [];

    additions.forEach(({ type, name, price }) => {
        const id = stringHash(name);

        if (data.add[id]) {
            let itemPrice = getAdditionPrice(customEval, price);

            if (type !== 'boolean') {
                itemPrice *= data.add[id];
            }

            items.push(
                <div className={styles['group-caption']}>{name}{type !== 'boolean' && data.add[id] > 1 ? ` (${data.add[id]} шт) ` : ' '}{ withPrice ? <span className={styles['price']}>{` ${numberWithSpaces(itemPrice)} рублей`}</span> : null}</div>
            );
        }
    });

    return (
        <div className={styles['block']}>
            <b className={styles['block-caption']}>Дополнения</b>
            <div className={styles['block-content']}>
                {items}
            </div>
        </div>
    );
}

function renderDelivery(data) {
    const { del } = data;

    return (
        <div className={styles['block']}>
            <b className={styles['block-caption']}>Адрес доставки</b>
            <div className={styles['block-content']}>
                <div className={styles['group-caption']}>{del.address} ({del.length} км)<span className={styles['price']}>{` ${numberWithSpaces(del.price)} рублей`}</span></div>
            </div>
        </div>
    );
}
function renderCustomAdditions(additions) {
    return (
        <div className={styles['block']}>
            <div className={styles['block-content']}>
                {additions.map(addition => {
                    return <div className={styles['group-caption']}>{addition.caption} {addition.price ? <span className={styles['price']}>{` ${numberWithSpaces(addition.price)} рублей`}</span> : null}</div>
                })}
            </div>
        </div>
    );
}
function renderFinalPrice(finalPrice) {
    return (
        <div className={styles['block']}>
            <b className={styles['block-caption']}>Итоговая стоимость: <span className={styles['price']}>{numberWithSpaces(finalPrice)} рублей</span></b>
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

function CP({ formValue, data, blocks, finalPrice, customEval, cpSettings }) {
    return (
        <div className={styles.container}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginTop: '32px' }}>Коммерческое предложение компании "Брус бани"</div>
            <div className={cx(styles['header'], styles['block'])}>
                <div className={styles['logo']} style={{ backgroundImage: `url('${logo}')` }} />
                <div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>https://brus-bany.ru</div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>info@brus-bany.ru</div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>{renderManager(formValue.manager)}</div>
                </div>
            </div>
            <div className={styles['block']} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <img src={formValue.images.main} style={{ width: '100%', maxWidth: '250px', marginBottom: '16px' }} />
                <div style={{ maxWidth: '400px', marginLeft: '16px' }}>
                    <h2>{customEval("eval(`'" + cpSettings['product-cp-name'] + "'`)")}</h2>
                </div>
            </div>
            <img src={formValue.images.scheme} style={{ width: '100%' }} />
            {renderComplectation(customEval, blocks, data, true)}
            {blocks.projectBlocks && blocks.projectBlocks.length ? blocks.projectBlocks.map(projectBlock => {
                return renderProjectBlock(customEval, projectBlock, data, true)
            }) : null}
            {blocks.baseEquipment && blocks.baseEquipment.length ? renderBaseEquipment(customEval, data, blocks.baseEquipment) : null}
            {data.add && blocks.additions ? renderAdditions(customEval, data, blocks.additions, true) : null}
            {data.del && blocks.deliveryData.delivery ? renderDelivery(data) : null}
            {formValue && formValue.additionalData && formValue.additionalData.length ? renderCustomAdditions(formValue.additionalData) : null}
            {renderFinalPrice(finalPrice + getCustomAdditionsPrice(formValue))}
        </div>
    );
}

export default memo(CP);
