import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Caption from '../../../../components/Caption';
import Text from '../../../../components/Text';
import Section from '../../../../components/Section';
import cx from 'classnames';
import styles from './Additions.module.css';

class Additions extends PureComponent {
    static propTypes = {
        additions: PropTypes.array,
        layout: PropTypes.object
    };

    state = {
        expandedAdditions: []
    };

    render() {
        // eslint-disable-next-line
        const { additions, layout: params } = this.props;
        const { expandedAdditions } = this.state;

        const getPrice = price => {
            // eslint-disable-next-line
            return eval(price);
        };

        return (
            <Section bgStyle='white'>
                <div className={styles.container}>
                    <Caption>Выберите дополнения</Caption>
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
                                                value ? value.map(({ type, name, id, price }) => (
                                                    <div className={styles.item} key={id}>
                                                        <div className={styles['item-wrapper']}>
                                                            {type === 'boolean' ? (
                                                                <input type='checkbox' />
                                                            ) : (
                                                                <input className={styles['item-input']} type='number' min='0' defaultValue={0} />
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
                </div>
            </Section>
        );
    }

    expandAdditionBlock = (id) => {
        const { expandedAdditions } = this.state;

        this.setState({
            expandedAdditions: expandedAdditions.includes(id) ? expandedAdditions.filter(_id => _id !== id) : [...expandedAdditions, id]
        })
    };
}

export default Additions;
