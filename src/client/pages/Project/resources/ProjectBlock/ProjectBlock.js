import React, { memo } from 'react';
import Card from '../../../../components/Card';
import DataSection from '../../../../components/DataSection';
import numberWithSpaces from '../../../../../utils/numberWithSpaces';
import styles from './ProjectBlock.module.css';

import cx from "classnames";

function ProjectBlock({ id, selectedId, onChange, name, description, items, itemTitle, itemButtonTitle, project, required }) {
    return (
        <DataSection bgStyle='grey' caption={name} captionTag='h2' description={description} isDescriptionHTML>
            <div className={styles.items}>
                {items.map(item => {
                    return (
                        <Card
                            key={item.id}
                            imageAlt={`${itemTitle} ${item.name.toLowerCase()}`}
                            className={cx({[styles.selected]: selectedId === item.id})}
                            style={{ order: item.order }}
                            onClick={() => {
                                if (item.id === selectedId) {
                                    if (!required) {
                                        onChange(null);
                                    }
                                } else {
                                    onChange(item.id);
                                }
                            }}
                            firstImage={item.image}
                            firstButton={itemButtonTitle}
                            secondButton={project.projectBlocks && project.projectBlocks[id] && project.projectBlocks[id][item.id] ? `${numberWithSpaces(project.projectBlocks[id][item.id].price)} руб` : null}
                            bgStyle='white'
                            content={(
                                <div className={styles['bake-info']}>
                                    <div className={styles['bake-title']}>{itemTitle}</div>
                                    <div className={styles['bake-name']}>{item.name}</div>
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
