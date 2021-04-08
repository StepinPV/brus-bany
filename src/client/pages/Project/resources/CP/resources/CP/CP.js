import React, { memo } from 'react';
import numberWithSpaces from '@utils/numberWithSpaces';
import stringHash from "@utils/stringHash";
import { getItemPrice as getAdditionPrice } from '../../../Additions';
import { getEquipmentItemPrice, getEquipmentText, getEquipmentElementValue } from '../../../Equipment';
import Logo from '@components/Logo';
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

function renderBaseEquipment(project, data, equipment, onlyPrice) {
    const renderItem = (groupName, itemName, { typeId, value }) => {
        switch(typeId) {
            case 'select': {
                let val = getEquipmentElementValue(data.equipment, groupName, itemName);
                if (value) {
                    const item = value.filter(({ condition }) => { return !condition || getEquipmentText(project, data, condition, {}) === 'true' }).find(item => val ? val === stringHash(item.name) : item.default);

                    if (item) {
                        const price = getEquipmentItemPrice(project, data, item.price, {});
                        if (onlyPrice && !price) return;
                        return <div className={styles['group-item']}>{getEquipmentText(project, data, item.name, {})} {price ? <span className={styles['price']}>{` ${numberWithSpaces(getEquipmentItemPrice(project, data, item.price, {}))} рублей`}</span> : null}</div>;
                    }
                }
                return;
            }

            case 'list': {
                const list = project.layoutId[value.source];

                return list && list.length ? list.map((item, listIndex) => {
                    let val = getEquipmentElementValue(data.equipment, groupName, `${itemName}[${listIndex}]`);

                    if (val) {
                        if (value.values[val]) {
                            const price = getEquipmentItemPrice(project, data, value.values[val].price, { item });
                            if (onlyPrice && !price) return;
                            return <div className={styles['group-item']}>{getEquipmentText(project, data, value.values[val].value, { item })} {price ? <span className={styles['price']}>{` ${numberWithSpaces(getEquipmentItemPrice(project, data, value.values[val].price, { item }))} рублей`}</span> : null}</div>;
                        }
                    } else {
                        if (onlyPrice) return;
                        return <div className={styles['group-item']}>{getEquipmentText(project, data, value.default, { item })}</div>;
                    }
                }) : null;
            }

            case 'base':
                return value && !onlyPrice ? <div className={styles['group-item']}>{getEquipmentText(project, data, value, {})}</div> : null;

            case 'number': {
                let val = getEquipmentElementValue(data.equipment, groupName, itemName);
                if (value) {
                    const price = val ? (parseInt(val) - parseInt(getEquipmentText(project, data, value.default, {}))) * getEquipmentItemPrice(project, data, value.price, {}) : 0;
                    if (onlyPrice && !price) return;
                    return <div className={styles['group-item']}>{getEquipmentText(project, data, value.name, {})} {val ? val : getEquipmentText(project, data, value.default, {})} шт {price ? <span className={styles['price']}>{` ${numberWithSpaces(price)} рублей`}</span> : null}</div>;
                }
            }
        }
    };

    return (
        <div className={styles['block']}>
            <b className={styles['block-caption']}>Комплектация</b>
            <div className={styles['block-content']}>
                {equipment ? equipment.filter(({ condition }) => { return !condition || getEquipmentText(project, data, condition, {}) === 'true' }).map(({ name: groupName, value }) => (
                    <div className={styles['group']}>
                        { onlyPrice ? null : <div className={styles['group-caption']}>{groupName}</div> }
                        <div className={styles['group-items']}>
                            {value ? value.filter(({ condition }) => { return !condition || getEquipmentText(project, data, condition, {}) === 'true' }).map(({ name: itemName, value }) => {
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
        <div className={styles['block']}>
            <b className={styles['block-caption']}>База</b>
            <div className={styles['block-content']}>
                <div className={styles['group-caption']}>{complectationBlocks.itemTitle} {item.name} {item.title.toLowerCase()} { withPrice ? <span className={styles['price']}>{` ${numberWithSpaces(price)} рублей`}</span> : null}</div>
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
        <div className={styles['block']}>
            <b className={styles['block-caption']}>{projectBlock.itemTitle}</b>
            <div className={styles['block-content']}>
                <div className={styles['group-caption']}>{eval("eval(`'" + item.name + "'`)")} {item.title} { withPrice ? <span className={styles['price']}>{` ${numberWithSpaces(price)} рублей`}</span> : null}</div>
            </div>
        </div>
    );
}
function renderAdditions(project, data, additions, withPrice) {
    return (
        <div className={styles['block']}>
            <b className={styles['block-caption']}>Дополнения</b>
            <div className={styles['block-content']}>
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
                                    <div className={styles['group-item']}>{name}{type !== 'boolean' && data.additions[_id] > 1 ? ` (${data.additions[_id]} шт) ` : ' '}{ withPrice ? <span className={styles['price']}>{` ${numberWithSpaces(itemPrice)} рублей`}</span> : null}</div>
                                );
                            }
                        });
                    }

                    return items.length ? (
                        <div className={styles['group']}>
                            <div className={styles['group-caption']}>{name}</div>
                            <div className={styles['group-items']}>
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
        <div className={styles['block']}>
            <b className={styles['block-caption']}>Адрес доставки</b>
            <div className={styles['block-content']}>
                <div className={styles['group-caption']}>{delivery.address} ({delivery.length} км)<span className={styles['price']}>{` ${numberWithSpaces(delivery.price)} рублей`}</span></div>
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

function CP({ formValue, data, project, finalPrice, infoBlock }) {
    const { categoryId } = project;
    return (
        <div className={styles.container}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginTop: '32px' }}>Коммерческое предложение компании "Брус бани"</div>
            <div className={cx(styles['header'], styles['block'])}>
                <Logo className={styles['logo']}/>
                <div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>https://brus-bany.ru</div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>info@brus-bany.ru</div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>{renderManager(formValue.manager)}</div>
                </div>
            </div>
            <div className={styles['block']} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <img src={formValue.images.other[0].image} style={{ width: '100%', maxWidth: '250px', marginBottom: '16px' }} />
                <div style={{ maxWidth: '400px' }}>
                    {infoBlock}
                </div>
            </div>
            <div className={cx(styles['block'], styles['images'])}>
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
    );
}

export default memo(CP);
