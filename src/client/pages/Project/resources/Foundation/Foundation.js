import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../components/Card';
import DataSection from '../../../../components/DataSection';
import styles from './Foundation.module.css';
import cx from 'classnames';

import img1 from './resources/1.jpg';
import img2 from './resources/2.jpg';

const items = [{
    image: img1,
    name: 'Свайно-винтовой',
    description: 'Хорошее решение для малоэтажного строительства. Его можно быстро собрать и не потратить при этом много денег',
    price: 27200
}, {
    image: img2,
    name: 'Опорно-столбчатый',
    description: 'Технология, применяемая для возведения легких зданий. К преимуществам технологии можно отнести экономичность и быстроту',
    price: 8000
}];

class Foundation extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.object
    };

    render() {
        const { value, onChange } = this.props;
        return (
           <DataSection id='foundation' bgStyle='white' caption='Выберите фундамент' description='Если вы сомневаетесь в выборе фундамента,
оставьте заявку, мы поможем подобрать самый оптимальный для вас вариант'>
               <div className={styles.items}>
                   {items.map(item => {
                       return (
                           <Card
                               key={item.name}
                               className={cx({[styles.selected]: value && value.name === item.name})}
                               onClick={() => { onChange(value && value.name === item.name ? null : { name: item.name, price: item.price }) }}
                               firstImage={item.image}
                               firstButton='Выбрать фундамент'
                               secondButton={`${item.price.toLocaleString()} руб`}
                               bgStyle='grey'
                               content={(
                                   <div className={styles['bake-info']}>
                                       <div className={styles['bake-title']}>Фундамент</div>
                                       <div className={styles['bake-name']}>{item.name}</div>
                                       <div className={styles['bake-params']}>
                                           <div className={styles['bake-param']}>
                                               {item.description}
                                           </div>
                                       </div>
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

export default Foundation;
