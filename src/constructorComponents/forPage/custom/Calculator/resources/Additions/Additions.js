import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './Additions.module.css';
import numberWithSpaces from '@utils/numberWithSpaces';
import stringHash from '@utils/stringHash';

export function getPrice(customEval, formula) {
    try {
        return Math.round(customEval(formula) / 100) * 100;
    } catch(err) {
        return 0;
    }
}

export const getFinalPriceByValues = (customEval, additions, values) => {
    let sumPrice = 0;

    Object.keys(values).forEach(id => {
        const addition = additions.find(({ name }) => stringHash(name).toString() === id);

        if (addition) {
            if (addition.type === 'boolean') {
                sumPrice += values[id] ? getPrice(customEval, addition.price) : 0;
            } else {
                sumPrice += getPrice(customEval, addition.price) * parseInt(values[id]);
            }
        }
    });

    return sumPrice;
};

class Additions extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        additions: PropTypes.array,
        value: PropTypes.object,
        customEval: PropTypes.func
    };

    render() {
        const { value: v, additions, customEval } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.items}>
                    {additions.map(({ type, name, price }) => (
                        <div className={styles.item} key={name}>
                            <div className={styles['item-wrapper']}>
                                {type === 'boolean' ? (
                                    <input
                                        type='checkbox'
                                        checked={v && v[stringHash(name)] ? v[stringHash(name)] : false}
                                        onChange={(e) => {this.changeValue(stringHash(name), e.target.checked)}} />
                                ) : (
                                    <input
                                        value={v && v[stringHash(name)] ? v[stringHash(name)] : 0}
                                        className={styles['item-input']}
                                        type='number'
                                        min='0'
                                        onChange={(e) => {this.changeValue(stringHash(name), e.target.value)}}/>
                                )}
                            </div>
                            <div className={styles.title}>
                                {name}
                            </div>
                            <div className={styles.price}>
                                {`${numberWithSpaces(getPrice(customEval, price))} р.`}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    changeValue = (id, val) => {
        const { onChange, value } = this.props;

        const newValues = {
            ...(value || {}),
            [id]: val
        };

        if (!val || val === '0') {
            delete newValues[id];
        }

        onChange(Object.keys(newValues).length ? newValues : undefined);
    };
}

export default Additions;
