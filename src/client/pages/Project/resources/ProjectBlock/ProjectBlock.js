import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../components/Card';
import DataSection from '../../../../components/DataSection';
import styles from './ProjectBlock.module.css';

import cx from "classnames";

class ProjectBlock extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        items: PropTypes.array,
        itemTitle: PropTypes.string,
        itemButtonTitle: PropTypes.string,
        project: PropTypes.object,
        selectedId: PropTypes.string,
        required: PropTypes.bool,
        useInBuildingPrice: PropTypes.bool
    };

    render() {
        const { id, selectedId, onChange, name, description, items, itemTitle, itemButtonTitle, project, required, useInBuildingPrice } = this.props;
        return (
           <DataSection bgStyle='grey' caption={name} captionTag='h2' description={description}>
               <div className={styles.items}>
                   {items.map(item => {
                       return (
                           <Card
                               key={item.id}
                               imageAlt={`${itemTitle} ${item.name.toLowerCase()}`}
                               className={cx({[styles.selected]: selectedId === item.id})}
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
                               secondButton={useInBuildingPrice ? null : `${project.projectBlocks[id][item.id].price.toLocaleString()} руб`}
                               bgStyle='white'
                               content={(
                                   <div className={styles['bake-info']}>
                                       <div className={styles['bake-title']}>{itemTitle}</div>
                                       <div className={styles['bake-name']}>{item.name}</div>
                                       <div className={styles['bake-params']}>
                                           {item.description}
                                       </div>
                                       <div className={styles['bake-param']}>Установка печи входит в стоимость</div>
                                   </div>
                               )}
                           />
                       );
                   })}
               </div>
           </DataSection>
       );
    }
}

export default ProjectBlock;
