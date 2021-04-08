import React, { memo } from 'react';
import Card from '../../../../../components/CardMini';
import DataSection from '../../../../components/DataSection';
import styles from './ProjectBlock.module.css';

import cx from "classnames";

function ProjectBlock({ idField='id', selectedId, onChange, name, description, items, itemTitle, itemButtonTitle, required, getSecondButtonTitle, getName }) {
    return (
        <DataSection bgStyle='white' caption={name} captionTag='h2' description={description} isDescriptionHTML>
            <div className={styles.items}>
                {items.map(item => {
                    return (
                        <Card
                            key={item[idField]}
                            imageAlt={`${itemTitle} ${item.name.toLowerCase()}`}
                            className={cx(selectedId === item[idField] ? styles['selected'] : styles['not-selected'])}
                            onClick={() => {
                                if (item[idField] === selectedId) {
                                    if (!required) {
                                        onChange(undefined);
                                    }
                                } else {
                                    onChange(item[idField]);
                                }
                            }}
                            firstImage={item.image}
                            firstButton={itemButtonTitle}
                            secondButton={getSecondButtonTitle(item)}
                            bgStyle='white'
                            content={(
                                <div className={styles['bake-info']}>
                                    <div className={styles['bake-title']}>{item.title}</div>
                                    <div className={styles['bake-name']}>{getName ? getName(item) : item.name}</div>
                                    <div className={styles['bake-params']} dangerouslySetInnerHTML={{ __html: item.description }} />
                                </div>
                            )}
                        />
                    );
                })}
            </div>
        </DataSection>
    );
}

export default memo(ProjectBlock);
