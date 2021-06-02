import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import stringHash from '@utils/stringHash';
import filterObject from '@utils/filterObject';
import numberWithSpaces from '@utils/numberWithSpaces';
import replaceAll from '@utils/replaceAll';
import styles from './Equipment.module.css';

export const getElementValue = (value, groupName, itemName) => {
    if (!value) return false;

    const groupValue = value[stringHash(groupName)];
    if (!groupValue) return false;

    const itemValue = groupValue[stringHash(itemName)];
    if (!itemValue) return false;

    return itemValue;
}

export function getPrice(customEval, formula, vars) {
    try {
        return Math.round(customEval(formula, vars) / 100) * 100 || 0;
    } catch(err) {
        return 0;
    }
}

export function getText(customEval, formula, vars, isTZ) {
    try {
        if (isTZ) {
            formula = formula.replace(new RegExp('\\[\\{', 'g'), '(').replace(new RegExp('\\}\\]', 'g'), ')');
        } else {
            formula = formula.replace(new RegExp('\\[\\{(.)*\\}\\]', 'g'), '');
        }
        return customEval("eval(`'" + formula + "'`)", vars);
    } catch(err) {
        return '';
    }
}

export const getFinalPrice = (customEval, equipment, values) => {
    let sumPrice = 0;

    equipment.filter(({ condition }) => { return !condition || getText(customEval, condition, {}) === 'true' }).forEach(({ name: groupName, value }) => {
        if (value && value.length) {
            value.filter(({ condition }) => { return !condition || getText(customEval, condition, {}) === 'true' }).forEach(({ name: itemName, value }) => {
                switch(value.typeId) {
                    case 'select': {
                        const val = getElementValue(values, groupName, itemName);
                        if (value && value.value) {
                            const item = value.value.filter(({ condition }) => { return !condition || getText(customEval, condition, {}) === 'true' }).find(item => val ? val === stringHash(item.name) : item.default);

                            if (item) {
                                sumPrice += getPrice(customEval, item.price, {});
                            }
                        }
                        break;
                    }

                    case 'list': {
                        let list = null;

                        try {
                            list = value.value.source ? customEval(value.value.source) : null;
                        } catch(err){}

                        if (list && list.length) {
                            list.forEach((item, index) => {
                                const val = getElementValue(values, groupName, `${itemName}[${index}]`);

                                if (val) {
                                    if (value.value.values[val]) {
                                        sumPrice += getPrice(customEval, value.value.values[val].price, { item });
                                    }
                                }
                            });
                        }
                        break;
                    }

                    case 'number': {
                        const val = getElementValue(values, groupName, itemName);
                        if (val && value && value.value) {
                            sumPrice += (parseInt(val) - parseInt(getText(customEval, value.value.default, {}))) * getPrice(customEval, value.value.price, {});
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
        value: PropTypes.object
    };

    state = {
        selected: 0
    };

    render() {
        const { equipment, customEval } = this.props;
        const { selected } = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    {equipment.filter(({ condition }) => { return !condition || getText(customEval, condition, {}) === 'true' }).map(({ name }, index) => (
                        <div
                            key={name}
                            className={cx(styles['header-item'], {[styles['header-item-selected']]: selected === index })}
                            onClick={() => { this.setState({ selected: index }) }}>
                            {name}
                        </div>
                    ))}
                </div>
                {equipment.filter(({ condition }) => { return !condition || getText(customEval, condition, {}) === 'true' }).map(({ name: groupName, value }, index) => (
                    <div key={groupName} className={cx(styles.items, {[styles['items-hidden']]: selected !== index })}>
                        {value ?
                            value.map(({ name: itemName, value, condition }) => this.renderItem(groupName, itemName, value || {}, !condition || getText(customEval, condition, {}) === 'true'))
                            : null
                        }
                    </div>
                ))}
            </div>
        );
    }

    renderItem = (groupName, itemName, { typeId, value }, enabled) => {
        const { customEval } = this.props;

        if (!typeId) {
            return;
        }

        switch(typeId) {
            case 'select': {
                let val = getElementValue(this.props.value, groupName, itemName);
                const filteredValues = value ? value.filter(({ condition }) => { return !condition || getText(customEval, condition, {}) === 'true' }) : [];

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
                                <div className={styles['item-text']}>{getText(customEval, item.name, {})}</div>
                                { item.price ? <div className={styles['item-price']}>+ {numberWithSpaces(getPrice(customEval, item.price, {}))} рублей</div> : null}
                            </div>
                        ))}
                    </div>
                )
            }

            case 'list': {
                let list = null;

                try {
                    list = value && value.source ? customEval(value.source) : null;
                } catch(err) {}

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
                                <div className={styles['item-text']}>{getText(customEval, value.default, { item })}</div>
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
                                    <div className={styles['item-text']}>{getText(customEval, v.value, { item })}</div>
                                    { v.price ? <div className={styles['item-price']}>+ {numberWithSpaces(getPrice(customEval, v.price, { item }))} рублей</div> : null}
                                </div>
                            )) : null}
                        </div>
                    )
                }) : null;
            }

            case 'base':
                return value ? (
                    <div className={cx(styles.item, {[styles['item-disabled']]: !enabled})} key={itemName}>
                        <div className={cx(styles['item-text'], styles['base-item'])}>{getText(customEval, value, {})}</div>
                    </div>
                ) : null;

            case 'number': {
                const val = parseInt(getElementValue(this.props.value, groupName, itemName));
                return value ? (
                    <div className={cx(styles.item, {[styles['item-disabled']]: !enabled})} key={itemName}>
                        <div className={cx(styles['item-text'], styles['base-item'])}>{getText(customEval, value.name, {})}</div>
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
                                        this.setElementValue(groupName, itemName, newValue === parseInt(getText(customEval, value.default, {})) ? null : newValue.toString());
                                    } : null}>-
                                </div>
                                <div className={styles['f-block-value']}>{val || getText(customEval, value.default, {})} шт</div>
                                <div
                                    className={
                                        cx(styles['number-item-block-button'], styles[`number-item-block-button-active`])
                                    }
                                    onClick={() => {
                                        if (!enabled) {
                                            return;
                                        }
                                        this.setElementValue(groupName, itemName, (parseInt(val || getText(customEval, value.default, {})) + 1).toString());
                                    }}>+
                                </div>
                            </div>
                            { val && value.price ? <div className={styles['item-price']}>+ {numberWithSpaces((val - parseInt(getText(customEval, value.default, {}))) * getPrice(customEval, value.price, {}))} рублей</div> : null}
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
