import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Text from '@components/Text';
import DataSection from '../../../../components/DataSection';
import cx from 'classnames';
import styles from './Additions.module.css';
import numberWithSpaces from '../../../../../utils/numberWithSpaces';

const getAdditionById = (additions, _id) => {
    let addition;

    for (const { value } of additions) {
        if (value && value.length) {
            for (const item of value) {
                if (item['_id'] === _id) {
                    addition = item;
                    break;
                }
            }

            if (addition) {
                break;
            }
        }
    }

    return addition;
};

export function getPrice(project, data, formula) {
    const { layoutId: params } = project;
    const { length: deliveryLength } = data.delivery || { length: 0 };

    // eslint-disable-next-line
    try {
        // eslint-disable-next-line
        return Math.round(eval(formula) / 100) * 100;
    } catch(err) {
        return 0;
    }
}

export const getFinalPriceByValues = (project, data, additions, values) => {
    let sumPrice = 0;

    Object.keys(values).forEach(_id => {
        const addition = getAdditionById(additions, _id);
        const value = values[_id];
        if (addition.type === 'boolean') {
            sumPrice += value ? getPrice(project, data, addition.price) : 0;
        } else {
            sumPrice += getPrice(project, data, addition.price) * parseInt(value);
        }
    });

    return sumPrice;
};

class Additions extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        data: PropTypes.object,
        additions: PropTypes.array,
        value: PropTypes.object,
        project: PropTypes.object,
        caption: PropTypes.string,
        description: PropTypes.string
    };

    state = {
        expandedAdditions: []
    };

    render() {
        const { value: v, project, caption, description, data, additions } = this.props;
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
                                                            checked={v && v[_id] ? v[_id] : false}
                                                            onChange={(e) => {this.changeValue(_id, e.target.checked)}} />
                                                    ) : (
                                                        <input
                                                            value={v && v[_id] ? v[_id] : 0}
                                                            className={styles['item-input']}
                                                            type='number'
                                                            min='0'
                                                            onChange={(e) => {this.changeValue(_id, e.target.value)}}/>
                                                    )}
                                                </div>
                                                <div className={styles.title}>
                                                    <Text>{name}</Text>
                                                </div>
                                                <div className={styles.price}>
                                                    <Text>{`${numberWithSpaces(getPrice(project, data, price))} р.`}</Text>
                                                </div>
                                            </div>
                                        )) : null
                                    }
                                </div>
                            </Fragment>
                        ))}
                    </div>
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

    changeValue = (_id, val) => {
        const { onChange, value } = this.props;

        const newValues = {
            ...(value || {}),
            [_id]: val
        };

        if (!val || val === '0') {
            delete newValues[_id];
        }

        onChange(Object.keys(newValues).length ? newValues : undefined);
    };
}

export default Additions;
