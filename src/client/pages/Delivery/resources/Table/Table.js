import React, {PureComponent} from 'react';
import Caption from '../../../../components/Caption';
import styles from './Table.module.css';

class Table extends PureComponent {
    render() {
        return (
            <div className={styles.container}>
                <Caption size='s'>Или воспользуйтесь таблицей</Caption>
                <table className={styles.table}>
                    <tbody>
                    <tr>
                        <th>Область доставки</th>
                        <th>км</th>
                        <th>Бани из бруса / каркасные бани</th>
                        <th>Мобильные бани до 7 метров</th>
                    </tr>
                    <tr>
                        <td>Новгородская область</td>
                        <td>220</td>
                        <td>15 400 руб</td>
                        <td>8 800 руб</td>
                    </tr>
                    <tr>
                        <td>Тверская область</td>
                        <td>280</td>
                        <td>19 600 руб</td>
                        <td>11 200 руб</td>
                    </tr>
                    <tr>
                        <td>Ярославская область</td>
                        <td>320</td>
                        <td>22 400 руб</td>
                        <td>12 800 руб</td>
                    </tr>
                    <tr>
                        <td>Московская область</td>
                        <td>400</td>
                        <td>28 000 руб</td>
                        <td>16 000 руб</td>
                    </tr>
                    <tr>
                        <td>Ленинградская область</td>
                        <td>500</td>
                        <td>35 000 руб</td>
                        <td>20 000 руб</td>
                    </tr>
                    <tr>
                        <td>Псковская область</td>
                        <td>560</td>
                        <td>39200 руб</td>
                        <td>22400 руб</td>
                    </tr>
                    <tr>
                        <td>Ивановская область</td>
                        <td>560</td>
                        <td>39 200 руб</td>
                        <td>22 400 руб</td>
                    </tr>
                    <tr>
                        <td>Смоленская область</td>
                        <td>590</td>
                        <td>41 300 руб</td>
                        <td>23 600 руб</td>
                    </tr>
                    <tr>
                        <td>Калужская область</td>
                        <td>610</td>
                        <td>42 700 руб</td>
                        <td>24 400 руб</td>
                    </tr>
                    <tr>
                        <td>Владимерская область</td>
                        <td>620</td>
                        <td>43 400 руб</td>
                        <td>24 800 руб</td>
                    </tr>
                    <tr>
                        <td>Тульская область</td>
                        <td>630</td>
                        <td>44 100 руб</td>
                        <td>25 200 руб</td>
                    </tr>
                    <tr>
                        <td>Костромская область</td>
                        <td>640</td>
                        <td>44 800 руб</td>
                        <td>25 600 руб</td>
                    </tr>
                    <tr>
                        <td>Вологодская область</td>
                        <td>650</td>
                        <td>45 500 руб</td>
                        <td>26 000 руб</td>
                    </tr>
                    <tr>
                        <td>Рязанская область</td>
                        <td>700</td>
                        <td>49 000 руб</td>
                        <td>28 000 руб</td>
                    </tr>
                    <tr>
                        <td>Нижегородская область</td>
                        <td>750</td>
                        <td>52 500 руб</td>
                        <td>30 000 руб</td>
                    </tr>
                    <tr>
                        <td>Орловская область</td>
                        <td>830</td>
                        <td>58 100 руб</td>
                        <td>33 200 руб</td>
                    </tr>
                    <tr>
                        <td>Брянская область</td>
                        <td>850</td>
                        <td>59 500 руб</td>
                        <td>34 000 руб</td>
                    </tr>
                    <tr>
                        <td>Липецкая область</td>
                        <td>860</td>
                        <td>60 200 руб</td>
                        <td>34 400 руб</td>
                    </tr>
                    <tr>
                        <td>Тамбовская область</td>
                        <td>920</td>
                        <td>64 400 руб</td>
                        <td>36 800 руб</td>
                    </tr>
                    <tr>
                        <td>Республика Карелия</td>
                        <td>960</td>
                        <td>67 200 руб</td>
                        <td>38 400 руб</td>
                    </tr>
                    <tr>
                        <td>Курская область</td>
                        <td>980</td>
                        <td>68 600 руб</td>
                        <td>39 200 руб</td>
                    </tr>
                    <tr>
                        <td>Пензенская область</td>
                        <td>1000</td>
                        <td>70 000 руб</td>
                        <td>40 000 руб</td>
                    </tr>
                    <tr>
                        <td>Республика Мордовия</td>
                        <td>1000</td>
                        <td>70 000 руб</td>
                        <td>40 000 руб</td>
                    </tr>
                    <tr>
                        <td>Республика Марий Эл</td>
                        <td>1000</td>
                        <td>70 000 руб</td>
                        <td>40 000 руб</td>
                    </tr>
                    <tr>
                        <td>Воронежская область</td>
                        <td>1100</td>
                        <td>77 000 руб</td>
                        <td>44 000 руб</td>
                    </tr>
                    <tr>
                        <td>Белгородская область</td>
                        <td>1100</td>
                        <td>77 000 руб</td>
                        <td>44 000 руб</td>
                    </tr>
                    <tr>
                        <td>Архангельская область</td>
                        <td>1100</td>
                        <td>77 000 руб</td>
                        <td>44 000 руб</td>
                    </tr>
                    <tr>
                        <td>Кировская область</td>
                        <td>1100</td>
                        <td>77 000 руб</td>
                        <td>44 000 руб</td>
                    </tr>
                    <tr>
                        <td>Чувашская Республика</td>
                        <td>1100</td>
                        <td>77 000 руб</td>
                        <td>44 000 руб</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;
