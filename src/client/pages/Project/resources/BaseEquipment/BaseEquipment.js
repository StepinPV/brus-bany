import React, { memo } from 'react';
import DataSection from '../../../../components/DataSection';
import Text from '../../../../components/Text';
import styles from './BaseEquipment.module.css';


function BaseEquipment({ equipment }) {
    return (
        <DataSection id='base' bgStyle='grey' caption='Базовая комплектация' captionTag='h2'>
            <div className={styles['items-wrapper']}>
                <div className={styles.items}>
                    {equipment.map(item => {
                        return (
                            <div key={item.name} className={styles.item}>
                                <div className={styles.title}>
                                    <Text>{item.name}</Text>
                                </div>
                                <div className={styles.description}>
                                    <Text>{item.text}</Text>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </DataSection>
    );
}

export default memo(BaseEquipment);
