import React, { memo } from 'react';
import Card from '../CardMini';
import numberWithSpaces from '@utils/numberWithSpaces';
import { applyFields } from '../../../../../helpers';
import styles from './ProjectBlock.module.css';
import cx from 'classnames';

function ProjectBlock(props) {
    const { idField='id', selectedId, onChange, items, required, __fieldsValue__, __images__, customEval } = props;
    return (
        <div className={styles.items}>
            {items ? items.map(item => {
                let price;
                try {
                    price = customEval(item.price);
                } catch(e) {}
                return (
                    <Card
                        key={item[idField]}
                        imageAlt={item.imageAlt}
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
                        firstImage={__images__[item.image]}
                        firstButton='Выбрать'
                        secondButton={price ? `${numberWithSpaces(price, '&nbsp;')}&nbsp;руб` : null}
                        bgStyle='white'
                        content={(
                            <div className={styles['bake-info']}>
                                <div className={styles['bake-title']} dangerouslySetInnerHTML={{ __html: applyFields(__fieldsValue__, item.title) }} />
                                <div className={styles['bake-name']} dangerouslySetInnerHTML={{ __html: applyFields(__fieldsValue__, item.name) }} />
                                <div className={styles['bake-params']} dangerouslySetInnerHTML={{ __html: applyFields(__fieldsValue__, item.description) }} />
                            </div>
                        )}
                    />
                );
            }) : null}
        </div>
    );
}

export default memo(ProjectBlock);
