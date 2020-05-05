import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Text from '../../../../components/Text';
import DataSection from '../../../../components/DataSection';
import cx from 'classnames';
import styles from './Additions.module.css';
import numberWithSpaces from '../../../../../utils/numberWithSpaces';

class Additions extends PureComponent {
    static propTypes = {
        additions: PropTypes.array,
        onChange: PropTypes.func,
        value: PropTypes.object,
        getPrice: PropTypes.func,
        caption: PropTypes.string,
        description: PropTypes.string
    };

    state = {
        expandedAdditions: []
    };

    render() {
        const { additions, value: v, getPrice, caption, description } = this.props;
        const { expandedAdditions } = this.state;

        return (
            <DataSection id='additions' bgStyle='white' caption={caption} description={description} isDescriptionHTML captionTag='h2'>
                <div className={styles.container}>
                    <div className={styles.items}>
                        {additions.map(({ name, _id, value }) => (
                            <Fragment key={_id}>
                                {additions.length > 1 ? <div
                                    className={cx(styles.item, styles.title, styles['item-header'])}
                                    onClick={() => { this.expandAdditionBlock(_id)}}>
                                    <Text>{name}</Text>
                                </div> : null}
                                <div className={cx(styles['sub-items'], {[styles['sub-items-hidden']]: additions.length > 1 ? !expandedAdditions.includes(_id) : false})}>
                                    {
                                        value ? value.map(({ type, name, _id, price }) => (
                                            <div className={styles.item} key={_id}>
                                                <div className={styles['item-wrapper']}>
                                                    {type === 'boolean' ? (
                                                        <input
                                                            type='checkbox'
                                                            checked={v.values[_id] ? v.values[_id].value : false}
                                                            onChange={(e) => {this.changeValue(_id, name, price, type, e.target.checked)}} />
                                                    ) : (
                                                        <input
                                                            value={v.values[_id] ? v.values[_id].value : 0}
                                                            className={styles['item-input']}
                                                            type='number'
                                                            min='0'
                                                            onChange={(e) => {this.changeValue(_id, name, price, type, e.target.value)}}/>
                                                    )}

                                                </div>
                                                <div className={styles.title}>
                                                    <Text>{name}</Text>
                                                </div>
                                                <div className={styles.price}>
                                                    <Text>{`${numberWithSpaces(getPrice(price))} р.`}</Text>
                                                </div>
                                            </div>
                                        )) : null
                                    }
                                </div>
                            </Fragment>
                        ))}
                    </div>
                    <div className={styles.sum}>{`Стоимость: ${numberWithSpaces(v.price)} руб`}</div>
                </div>
            </DataSection>
        );
    }

    expandAdditionBlock = (_id) => {
        const { expandedAdditions } = this.state;

        this.setState({
            expandedAdditions: expandedAdditions.includes(_id) ? expandedAdditions.filter(__id => __id !== _id) : [...expandedAdditions, _id]
        })
    };

    getFinalPriceByValues = (values) => {
        const { getPrice } = this.props;
        let sumPrice = 0;

        Object.keys(values).forEach(_id => {
            const { value, type, price } = values[_id];
            if (type === 'boolean') {
                sumPrice += value ? getPrice(price) : 0;
            } else {
                sumPrice += getPrice(price) * parseInt(value);
            }
        });

        return sumPrice;
    };

    changeValue = (_id, name, price, type, val) => {
        const { onChange, value } = this.props;

        const newValues = {
            ...value.values,
            [_id]: { name, value: val, type, price }
        };

        if (!val || val === '0') {
            delete newValues[_id];
        }

        onChange({
            values: newValues,
            price: this.getFinalPriceByValues(newValues)
        });
    };
}

export default Additions;
