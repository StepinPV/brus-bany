import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../components/Card';
import DataSection from '../../../../components/DataSection';
import styles from './Bakes.module.css';

import img1 from './resources/1.jpg';
import img1_1 from './resources/1_1.jpg';

import img2 from './resources/2.jpg';

import img3 from './resources/3.jpg';
import img3_1 from './resources/3_1.jpg';

import img4 from './resources/4.jpg';
import img4_1 from './resources/4_1.jpg';

import img5 from './resources/5.jpg';
import img5_1 from './resources/5_1.jpg';

import img6 from './resources/6.jpg';
import img6_1 from './resources/6_1.jpg';

import cx from "classnames";

const bakes = [{
    image1: img1,
    image2: img1_1,
    name: 'Ермак 16',
    param1min: '8',
    param1max: '18',
    param2: '16',
    param3: 'сталь',
    price: 49000
}, {
    image1: img2,
    name: 'Ермак 16-ПС',
    param1min: '8',
    param1max: '16',
    param2: '16',
    param3: 'сталь',
    price: 58000
}, {
    image1: img3,
    image2: img3_1,
    name: 'Ермак 16 сетка стандарт',
    param1min: '8',
    param1max: '16',
    param2: '16',
    param3: 'сталь',
    price: 59000
}, {
    image1: img4,
    image2: img4_1,
    name: 'Ермак 16 Премиум',
    param1min: '8',
    param1max: '18',
    param2: '16',
    param3: 'сталь',
    price: 63000
}, {
    image1: img5,
    image2: img5_1,
    name: 'Ермак 16 Премиум ч',
    param1min: '8',
    param1max: '18',
    param2: '16',
    param3: 'чугун',
    price: 68000
}, {
    image1: img6,
    image2: img6_1,
    name: 'Ермак 20 Премиум',
    param1min: '12',
    param1max: '22',
    param2: '21.5',
    param3: 'сталь',
    price: 67000
}];

class Bakes extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.object
    };

    render() {
        const { value, onChange } = this.props;
        return (
           <DataSection id='bake' bgStyle='grey' caption='Выберите печь' captionTag='h2' description={(
               <>
                   В комплект печи входят: установка, кирпичный портал, бак для горячей воды на 60л и комплект двустенного дымохода из нержавейки ferrum.
                   Не можете определиться? <a style={{ color: '#003093', fontWeight: 'bold' }} href='#requestForm'>Оставьте заявку</a>
               </>
           )}>
               <div className={styles.items}>
                   {bakes.map(bake => {
                       return (
                           <Card
                               key={bake.name}
                               imageAlt={`Печь ${bake.name.toLowerCase()}`}
                               className={cx({[styles.selected]: value && value.name === bake.name})}
                               onClick={() => { onChange(value && value.name === bake.name ? null : { name: bake.name, price: bake.price }) }}
                               firstImage={bake.image1}
                               firstButton='Выбрать печь'
                               secondButton={`${bake.price.toLocaleString()} руб`}
                               bgStyle='white'
                               content={(
                                   <div className={styles['bake-info']}>
                                       <div className={styles['bake-title']}>Дровяная печь для бани</div>
                                       <div className={styles['bake-name']}>{bake.name}</div>
                                       <div className={styles['bake-params']}>
                                           <div className={styles['bake-param']}>
                                               {`Объем помещения: ${bake.param1min} - ${bake.param1max} м³`}
                                           </div>
                                           <div className={styles['bake-param']}>
                                               {`Мощность: ${bake.param2} кВт`}
                                           </div>
                                           <div className={styles['bake-param']}>
                                               {`Материал топки: ${bake.param3}`}
                                           </div>
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

export default Bakes;
