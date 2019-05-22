import React, { PureComponent } from 'react';
import Caption from '../../../../components/Caption';
import Card from '../../../../components/Card';
import Section from '../../../../components/Section';
import styles from './Foundation.module.css';

import img1 from './resources/1.jpg';
import img2 from './resources/2.jpg';

const items = [{
    image: img1,
    name: 'Свайно-винтовой',
    description: 'Хорошее решение для малоэтажного строительства. Его можно быстро собрать и не потратить при этом много денег',
    price: '27200'
}, {
    image: img2,
    name: 'Опорно-столбчатый',
    description: 'Технология, применяемая для возведения легких зданий. К преимуществам технологии можно отнести экономичность и быстроту',
    price: '8000'
}];

class Foundation extends PureComponent {
    render() {
       return (
           <Section bgStyle='white'>
               <Caption>Выберите фундамент</Caption>
               {this.renderItems()}
           </Section>
       );
    }

    renderItems = () => {
        return (
            <div className={styles.items}>
                {items.map(item => {

                    return (
                        <Card
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
        )
    }
}

export default Foundation;
