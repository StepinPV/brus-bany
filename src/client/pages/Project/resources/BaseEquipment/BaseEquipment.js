import React, { PureComponent } from 'react';
import DataSection from '../../../../components/DataSection';
import Text from '../../../../components/Text';
import styles from './BaseEquipment.module.css';

const items = [{
    title: 'Обвязка',
    description: 'Усиленная из бруса 100/150мм в 2 ряда'
}, {
    title: 'Лаги пола',
    description: 'Несущая балка, брус 150*100. Лаги пола доска 40х150 с интервалом 59см'
}, {
    title: 'Черновой пол',
    description: 'Доска 20*100 сорт 2. Гидроизоляция Наноизол А'
}, {
    title: 'Утеплитель',
    description: 'Пол и потолок -100мм, минеральная вата Изовер или Кнауф. В мойке утепление пола керамзит. Пароизоляция Наноизол В'
}, {
    title: 'Чистовой пол',
    description: 'Доска шпунт 28мм камерной сушки, монтаж на саморезы, под перетяжку. В мойке делаются полы с уклоном в центр, устанавливается сифон, с выводом гофры под баню'
}, {
    title: 'Сруб',
    description: 'Брус профилированный естественной влажности, сорт А-Б. Профиль прямой или овал. Сечение 140х90мм. Сборка углов в тёплый угол. Высота сруба 16 венцов, +/- 2,15м. Отделка углов сруба доска строганная'
}, {
    title: 'Перегородки',
    description: 'Брус профилированный естественной влажности, сорт А-Б. Профиль прямой. Сечение 140х90мм. Перегородки впиливаются в стены сруба с заглублением не более 30мм'
}, {
    title: 'Монтаж',
    description: 'Монтаж сруба на металлические нагеля (гвозди 200-250мм) Монтаж вагонки на оцинкованные гвозди'
}];

class Bakes extends PureComponent {
    render() {
       return (
           <DataSection bgStyle='grey' caption='Базовая комплектация'>
               {this.renderItems()}
           </DataSection>
       );
    }

    renderItems = () => {
        return (
            <div className={styles['items-wrapper']}>
                <div className={styles.items}>
                    {items.map(item => {

                        return (
                            <div className={styles.item}>
                                <div className={styles.title}>
                                    <Text>{item.title}</Text>
                                </div>
                                <div className={styles.description}>
                                    <Text>{item.description}</Text>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default Bakes;
