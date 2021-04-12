import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DataSection from '../../../../components/DataSection';
import cx from 'classnames';
import stringHash from "../../../../../utils/stringHash";
import filterObject from '../../../../../utils/filterObject';
import styles from './Equipment.module.css';
import numberWithSpaces from '../../../../../utils/numberWithSpaces';

export const getElementValue = (value, groupName, itemName) => {
    if (!value) return false;

    const groupValue = value[stringHash(groupName)];
    if (!groupValue) return false;

    const itemValue = groupValue[stringHash(itemName)];
    if (!itemValue) return false;

    return itemValue;
}

export function getPrice(project, data = {}, formula, { item }) {
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

export function getText(project, data = {}, formula, { item }) {
    // eslint-disable-next-line no-unused-vars
    const { layoutId: layout } = project;
    // eslint-disable-next-line no-unused-vars
    const { length: deliveryLength } = data.delivery || { length: 0 };
    // eslint-disable-next-line no-unused-vars
    const complectation = data.complectation;
    // eslint-disable-next-line no-unused-vars
    const equipment = data.equipment;
    // eslint-disable-next-line no-unused-vars
    const additions = data.additions;

    // eslint-disable-next-line
    try {
        // eslint-disable-next-line
        return eval("eval(`'" + formula + "'`)");
    } catch(err) {
        return '';
    }
}

export const getFinalPrice = (project, data, equipment, values) => {
    let sumPrice = 0;

    equipment.filter(({ condition }) => { return !condition || getText(project, data, condition, {}) === 'true' }).forEach(({ name: groupName, value }) => {
        if (value && value.length) {
            value.filter(({ condition }) => { return !condition || getText(project, data, condition, {}) === 'true' }).forEach(({ name: itemName, value }) => {
                switch(value.typeId) {
                    case 'select': {
                        const val = getElementValue(values, groupName, itemName);
                        if (value && value.value) {
                            const item = value.value.filter(({ condition }) => { return !condition || getText(project, data, condition, {}) === 'true' }).find(item => val ? val === stringHash(item.name) : item.default);

                            if (item) {
                                sumPrice += getPrice(project, data, item.price, {});
                            }
                        }
                        break;
                    }

                    case 'list': {
                        const list = project.layoutId[value.value.source];
                        if (list && list.length) {
                            list.forEach((item, index) => {
                                const val = getElementValue(values, groupName, `${itemName}[${index}]`);

                                if (val) {
                                    if (value.value.values[val]) {
                                        sumPrice += getPrice(project, data, value.value.values[val].price, { item });
                                    }
                                }
                            });
                        }
                        break;
                    }

                    case 'number': {
                        const val = getElementValue(values, groupName, itemName);
                        if (val && value && value.value) {
                            sumPrice += (parseInt(val) - parseInt(getText(project, data, value.value.default, {}))) * getPrice(project, data, value.value.price, {});
                        }
                        break;
                    }
                }
            });
        }
    });

    return sumPrice;
};

class Equipment extends PureComponent {
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
        const { equipment, project, data } = this.props;
        const { selected } = this.state;

        return (
            <DataSection id='base' bgStyle='white' caption='Соберите комплектацию' captionTag='h2'>
                <div className={styles.container}>
                    <div className={styles.header}>
                        {equipment.filter(({ condition }) => { return !condition || getText(project, data, condition, {}) === 'true' }).map(({ name }, index) => (
                            <div
                                key={name}
                                className={cx(styles['header-item'], {[styles['header-item-selected']]: selected === index })}
                                onClick={() => { this.setState({ selected: index }) }}>
                                {name}
                            </div>
                        ))}
                    </div>
                    {equipment.filter(({ condition }) => { return !condition || getText(project, data, condition, {}) === 'true' }).map(({ name: groupName, value }, index) => (
                        <div key={groupName} className={cx(styles.items, {[styles['items-hidden']]: selected !== index })}>
                            {value ?
                                value.map(({ name: itemName, value, condition }) => this.renderItem(groupName, itemName, value, !condition || getText(project, data, condition, {}) === 'true'))
                                : null
                            }
                        </div>
                    ))}
                </div>
            </DataSection>
        );
    }

    renderItem = (groupName, itemName, { typeId, value }, enabled) => {
        const { project, data } = this.props;

        switch(typeId) {
            case 'select': {
                let val = getElementValue(this.props.value, groupName, itemName);
                const filteredValues = value ? value.filter(({ condition }) => { return !condition || getText(project, data, condition, {}) === 'true' }) : [];

                if (!filteredValues.some(item => val === stringHash(item.name))) {
                    val = null;
                }

                return (
                    <div className={cx(styles.item, {[styles['item-disabled']]: !enabled})} key={itemName}>
                        {filteredValues.map(item => (
                            <div
                                key={item.name}
                                className={cx(styles['select-item'], val ? (val === stringHash(item.name) ? styles['select-item-checked'] : '') : (item.default ? styles['select-item-checked'] : ''))}
                                onClick={() => {
                                    if (!enabled) {
                                        return;
                                    }
                                    this.setElementValue(groupName, itemName, val === stringHash(item.name) || item.default ? undefined : item.name, {
                                        hashValue: true
                                    });
                                }}>
                                <div className={styles['select-item-checker']} />
                                <div className={styles['item-text']}>{getText(project, data, item.name, {})}</div>
                                { item.price ? <div className={styles['item-price']}>+ {numberWithSpaces(getPrice(project, data, item.price, {}))} рублей</div> : null}
                            </div>
                        ))}
                    </div>
                )
            }

            case 'list': {
                const list = project.layoutId[value.source];

                return list && list.length ? list.map((item, listIndex) => {
                    let val = getElementValue(this.props.value, groupName, `${itemName}[${listIndex}]`);

                    return (
                        <div className={cx(styles.item, {[styles['item-disabled']]: !enabled})} key={itemName + item.name}>
                            <div
                                className={cx(styles['select-item'], val ? false : styles['select-item-checked'])}
                                onClick={() => {
                                    if (!enabled) {
                                        return;
                                    }
                                    this.setElementValue(groupName, `${itemName}[${listIndex}]`, undefined);
                                }}>
                                <div className={styles['select-item-checker']} />
                                <div className={styles['item-text']}>{getText(project, data, value.default, { item })}</div>
                            </div>
                            {value.values ? value.values.map((v, index) => (
                                <div
                                    key={v.value}
                                    className={cx(styles['select-item'], val ? (val === index.toString() ? styles['select-item-checked'] : '') : '')}
                                    onClick={() => {
                                        if (!enabled) {
                                            return;
                                        }
                                        this.setElementValue(groupName, `${itemName}[${listIndex}]`, index.toString());
                                    }}>
                                    <div className={styles['select-item-checker']} />
                                    <div className={styles['item-text']}>{getText(project, data, v.value, { item })}</div>
                                    { v.price ? <div className={styles['item-price']}>+ {numberWithSpaces(getPrice(project, data, v.price, { item }))} рублей</div> : null}
                                </div>
                            )) : null}
                        </div>
                    )
                }) : null;
            }

            case 'base':
                return value ? (
                    <div className={cx(styles.item, {[styles['item-disabled']]: !enabled})} key={itemName}>
                        <div className={cx(styles['item-text'], styles['base-item'])}>{getText(project, data, value, {})}</div>
                    </div>
                ) : null;

            case 'number': {
                const val = parseInt(getElementValue(this.props.value, groupName, itemName));
                return value ? (
                    <div className={cx(styles.item, {[styles['item-disabled']]: !enabled})} key={itemName}>
                        <div className={cx(styles['item-text'], styles['base-item'])}>{getText(project, data, value.name, {})}</div>
                        <div className={styles['number-item-block']}>
                            <div className={styles['number-item-block-content']}>
                                <div
                                    className={
                                        cx(styles['number-item-block-button'], styles[`number-item-block-button-${val ? 'active' : 'inactive'}`])
                                    }
                                    onClick={val ? () => {
                                        if (!enabled) {
                                            return;
                                        }
                                        const newValue = parseInt(val) - 1;
                                        this.setElementValue(groupName, itemName, newValue === parseInt(getText(project, data, value.default, {})) ? null : newValue.toString());
                                    } : null}>-
                                </div>
                                <div className={styles['f-block-value']}>{val || getText(project, data, value.default, {})} шт</div>
                                <div
                                    className={
                                        cx(styles['number-item-block-button'], styles[`number-item-block-button-active`])
                                    }
                                    onClick={() => {
                                        if (!enabled) {
                                            return;
                                        }
                                        this.setElementValue(groupName, itemName, (parseInt(val || getText(project, data, value.default, {})) + 1).toString());
                                    }}>+
                                </div>
                            </div>
                            { val && value.price ? <div className={styles['item-price']}>+ {numberWithSpaces((val - parseInt(getText(project, data, value.default, {}))) * getPrice(project, data, value.price, {}))} рублей</div> : null}
                        </div>
                    </div>
                ) : null;
            }
        }
    };

    setElementValue = (groupName, itemName, val, opts) => {
        const { value, onChange } = this.props;
        const _val = val ? (opts && opts.hashValue ? stringHash(val === true ? '1' : val) : val) : undefined;

        onChange(filterObject({
            ...(value || {}),
            [stringHash(groupName)]: filterObject({
                ...(value && value[stringHash(groupName)] || {}),
                [stringHash(itemName)]: _val
            })
        }));
    }
}

export default Equipment;
