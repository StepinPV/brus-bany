import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Text from '../../../../components/Text';
import DataSection from '../../../../components/DataSection';
import cx from 'classnames';
import styles from './Additions.module.css';

class Additions extends PureComponent {
    static propTypes = {
        additions: PropTypes.array,
        layout: PropTypes.object,
        onChange: PropTypes.func,
        value: PropTypes.object
    };

    state = {
        expandedAdditions: []
    };

    render() {
        // eslint-disable-next-line no-unused-vars
        const { additions, value: v, layout: params } = this.props;
        const { expandedAdditions } = this.state;

        const getPrice = price => {
            // eslint-disable-next-line
            try {
                // eslint-disable-next-line
                return Math.round(eval(price) / 100) * 100;
            } catch(err) {
                return 0;
            }
        };

        return (
            <DataSection id='additions' bgStyle='white' caption='Выберите дополнения' captionTag='h2'>
                <div className={styles.container}>
                    <div className={styles.items}>
                        {additions.map(({ name, id, value }) => (
                            <Fragment key={id}>
                                <div
                                    className={cx(styles.item, styles.title, styles['item-header'])}
                                    onClick={() => { this.expandAdditionBlock(id)}}>
                                    <Text>{name}</Text>
                                </div>
                                {
                                    expandedAdditions.includes(id) ? (
                                        <div className={styles['sub-items']}>
                                            {
                                                value ? value.sort((a, b) => {
                                                    if (a.order > b.order) return 1;
                                                    if (a.order === b.order) return 0;
                                                    if (a.order < b.order) return -1;
                                                }).map(({ type, name, id, price }) => (
                                                    <div className={styles.item} key={id}>
                                                        <div className={styles['item-wrapper']}>
                                                            {type === 'boolean' ? (
                                                                <input
                                                                    type='checkbox'
                                                                    checked={v.values[id] ? v.values[id].value : false}
                                                                    onChange={(e) => {this.changeValue(id, name, price, type, e.target.checked)}} />
                                                            ) : (
                                                                <input
                                                                    value={v.values[id] ? v.values[id].value : 0}
                                                                    className={styles['item-input']}
                                                                    type='number'
                                                                    min='0'
                                                                    onChange={(e) => {this.changeValue(id, name, price, type, e.target.value)}}/>
                                                            )}

                                                        </div>
                                                        <div className={styles.title}>
                                                            <Text>{name}</Text>
                                                        </div>
                                                        <div className={styles.price}>
                                                            <Text>{`${getPrice(price)} р.`}</Text>
                                                        </div>
                                                    </div>
                                                )) : null
                                            }
                                        </div>
                                    ) : null
                                }
                            </Fragment>
                        ))}
                    </div>
                    <div className={styles.sum}>{`Стоимость: ${v.price} р`}</div>
                </div>
            </DataSection>
        );
    }

    expandAdditionBlock = (id) => {
        const { expandedAdditions } = this.state;

        this.setState({
            expandedAdditions: expandedAdditions.includes(id) ? expandedAdditions.filter(_id => _id !== id) : [...expandedAdditions, id]
        })
    };

    getFinalPriceByValues = (values) => {
        const { layout: params } = this.props;
        let sumPrice = 0;

        const getPrice = price => {
            try {
                // eslint-disable-next-line
                return Math.round(eval(price) / 100) * 100;
            } catch(err) {
                return 0;
            }
        };

        Object.keys(values).forEach(id => {
            const { value, type, price } = values[id];
            if (type === 'boolean') {
                sumPrice += value ? getPrice(price) : 0;
            } else {
                sumPrice += getPrice(price) * parseInt(value);
            }
        });

        return sumPrice;
    };

    changeValue = (id, name, price, type, val) => {
        const { onChange, value } = this.props;

        const newValues = {
            ...value.values,
            [id]: { name, value: val, type, price }
        };

        if (!val || val === '0') {
            delete newValues[id];
        }

        onChange({
            values: newValues,
            price: this.getFinalPriceByValues(newValues)
        });
    };
}

export default Additions;
