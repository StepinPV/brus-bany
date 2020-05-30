import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DataSection from '../../../../components/DataSection';
import cx from 'classnames';
import stringHash from "../../../../../utils/stringHash";
import filterObject from '../../../../../utils/filterObject';
import styles from './NewBaseEquipment.module.css';

const getElementValue = (value, groupName, itemName) => {
    if (!value) return false;

    const groupValue = value[stringHash(groupName)];
    if (!groupValue) return false;

    const itemValue = groupValue[stringHash(itemName)];
    if (!itemValue) return false;

    return itemValue;
}

export function getPrice(project, data, formula) {
    // eslint-disable-next-line no-unused-vars
    const { layoutId: params } = project;
    // eslint-disable-next-line no-unused-vars
    const { length: deliveryLength } = data.delivery || { length: 0 };
    // eslint-disable-next-line no-unused-vars
    const complectation = data.complectation;

    // eslint-disable-next-line
    try {
        // eslint-disable-next-line
        return Math.round(eval(formula) / 100) * 100 || 0;
    } catch(err) {
        return 0;
    }
}

export const getFinalPrice = (project, data, equipment, values) => {
    let sumPrice = 0;

    equipment.forEach(({ name: groupName, value }) => {
        if (value && value.length) {
            value.forEach(({ name: itemName, value }) => {
                switch(value.typeId) {
                    case 'select': {
                        const val = getElementValue(values, groupName, itemName);

                        if (value && value.value) {
                            const item = value.value.find(item => val ? val === stringHash(item.name) : item.default);

                            if (item) {
                                sumPrice += getPrice(project, data, item.price);
                            }
                        }
                        break;
                    }
                }
            });
        }
    });

    return sumPrice;
};

class NewBaseEquipment extends PureComponent {
    static propTypes = {
        equipment: PropTypes.array,
        value: PropTypes.object,
        data: PropTypes.object,
        project: PropTypes.object,
    };

    state = {
        selected: 0
    };

    render() {
        const { equipment } = this.props;
        const { selected } = this.state;

        return (
            <DataSection id='base' bgStyle='grey' caption='Базовая комплектация' captionTag='h2'>
                <div className={styles.container}>
                    <div className={styles.header}>
                        {equipment.map(({ name }, index) => (
                            <div
                                key={name}
                                className={cx(styles['header-item'], {[styles['header-item-selected']]: selected === index })}
                                onClick={() => { this.setState({ selected: index }) }}>
                                {name}
                            </div>
                        ))}
                    </div>
                    {equipment.map(({ name: groupName, value }, index) => (
                        <div key={groupName} className={cx(styles.items, {[styles['items-hidden']]: selected !== index })}>
                            {
                                value ? value.map(({ name: itemName, value }) => (
                                    <div className={styles.item} key={itemName}>{this.renderItem(groupName, itemName, value)}</div>
                                )) : null
                            }
                        </div>
                    ))}
                </div>
            </DataSection>
        );
    }

    renderItem = (groupName, itemName, { typeId, value }) => {
        const { project, data } = this.props;

        switch(typeId) {
            case 'select':
                const val = getElementValue(this.props.value, groupName, itemName);
                return value ? value.map(item => (
                    <div
                        key={item.name}
                        className={cx(styles['select-item'], val ? (val === stringHash(item.name) ? styles['select-item-checked'] : '') : (item.default ? styles['select-item-checked'] : ''))}
                        onClick={() => {
                            this.setElementValue(groupName, itemName, val === stringHash(item.name) || item.default ? undefined : item.name);
                        }}>
                        <div className={styles['select-item-checker']} />
                        <div className={styles['item-text']}>{item.name}</div>
                        { item.price ? <div className={styles['item-price']}>+ {getPrice(project, data, item.price)} рублей</div> : null}
                    </div>
                )) : null;

            case 'base':
                return value ? <div className={cx(styles['item-text'], styles['base-item'])}>{value}</div> : null;
        }
    };

    setElementValue = (groupName, itemName, val) => {
        const { value, onChange } = this.props;

        onChange(filterObject({
            ...(value || {}),
            [stringHash(groupName)]: filterObject({
                ...(value && value[stringHash(groupName)] || {}),
                [stringHash(itemName)]: val ? stringHash(val === true ? '1' : val) : undefined
            })
        }));
    }
}

export default NewBaseEquipment;
