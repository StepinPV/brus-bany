import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import DataSection from '../../../../components/DataSection';
import cx from 'classnames';
import styles from './NewBaseEquipment.module.css';

class NewBaseEquipment extends PureComponent {
    static propTypes = {
        equipment: PropTypes.array
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
                                className={cx(styles['header-item'], {[styles['header-item-selected']]: selected === index })}
                                onClick={() => { this.setState({ selected: index }) }}>
                                {name}
                            </div>
                        ))}
                    </div>
                    {equipment.map(({ name, value }, index) => (
                        <div key={name} className={cx(styles.items, {[styles['items-hidden']]: selected !== index })}>
                            {
                                value ? value.map(({ name }) => (
                                    <div className={styles.item} key={name}>{name}</div>
                                )) : null
                            }
                        </div>
                    ))}
                </div>
            </DataSection>
        );
    }
}

export default NewBaseEquipment;
