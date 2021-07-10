import React, { Fragment, memo, useEffect, useState } from 'react';
import numberWithSpaces from '@utils/numberWithSpaces';
import rubles from '@utils/rubles';
import wordByNumber from '@utils/wordByNumber';
import renderDate from '@utils/RenderDate';
import stringHash from "../../../stringHash";
import { getItemPrice as getAdditionPrice } from '../../../Additions';
import { getEquipmentItemPrice, getEquipmentText, getEquipmentElementValue } from '../../../Equipment';
import styles from './Dogovor.module.css';

const PAGE_HEIGHT = 1048;

function getFinalPrice({ customEval, finalPrice, data, blocks, cpSettings }) {
    if (data.blocks && data.blocks[cpSettings['fund-block-id']] && cpSettings['fund-block-items-id'] && cpSettings['fund-block-items-id'].includes(data.blocks[cpSettings['fund-block-id']])) {
        const block = blocks.projectBlocks.find(projectBlock => projectBlock.id === cpSettings['fund-block-id']);
        const item = block.items.find(item => item.id === data.blocks[cpSettings['fund-block-id']]);

        return finalPrice - customEval(item.price);
    }

    return finalPrice;
}

function renderRunningTitles(formValue) {
    return (
        <div className={styles['running-title']}>
            <div>________ Стариков Е.Б.</div>
            <div>________ {formValue.client.name ? renderMiniName(formValue.client.name) : ''}</div>
        </div>
    );
}

function renderPriceWithWords(value) {
    return `${numberWithSpaces(value)} ( ${rubles(value)}) ${wordByNumber(value, 'рубль', 'рубля', 'рублей')}`;
}

function renderBaseEquipment({ customEval, data, equipment, onlyPrice, isTZ }) {
    const renderItem = (groupName, itemName, { typeId, value }) => {
        switch(typeId) {
            case 'select': {
                let val = getEquipmentElementValue(data.equipment, groupName, itemName);
                if (value) {
                    const item = value.filter(({ condition }) => { return !condition || getEquipmentText(customEval, condition, {}, isTZ) === 'true' }).find(item => val ? val === stringHash(item.name) : item.default);

                    if (item) {
                        const price = getEquipmentItemPrice(customEval, item.price, {});
                        if (onlyPrice && !price) return;
                        return <div>{getEquipmentText(customEval, item.name, {}, isTZ)} {price && onlyPrice ? ` ${numberWithSpaces(getEquipmentItemPrice(customEval, item.price, {}))} рублей` : null}</div>;
                    }
                }
                return;
            }

            case 'list': {
                let list = null;

                try {
                    list = value.source ? customEval(value.source) : null;
                } catch(err){}

                return list && list.length ? list.map((item, listIndex) => {
                    let val = getEquipmentElementValue(data.equipment, groupName, `${itemName}[${listIndex}]`);

                    if (val) {
                        if (value.values[val]) {
                            const price = getEquipmentItemPrice(customEval, value.values[val].price, { item });
                            if (onlyPrice && !price) return;
                            return <div key={JSON.stringify(item)}>{getEquipmentText(customEval, value.values[val].value, { item }, isTZ)} {price && onlyPrice ? ` ${numberWithSpaces(getEquipmentItemPrice(customEval, value.values[val].price, { item }))} рублей` : null}</div>;
                        }
                    } else {
                        if (onlyPrice) return;
                        return <div key={JSON.stringify(item)}>{getEquipmentText(customEval, value.default, { item }, isTZ)}</div>;
                    }
                }) : null;
            }

            case 'base':
                return value && !onlyPrice ? <div>{getEquipmentText(customEval, value, {}, isTZ)}</div> : null;

            case 'number': {
                let val = getEquipmentElementValue(data.equipment, groupName, itemName);
                if (value) {
                    const price = val ? (parseInt(val) - parseInt(getEquipmentText(customEval, value.default, {}, isTZ))) * getEquipmentItemPrice(customEval, value.price, {}) : 0;
                    if (onlyPrice && !price) return;
                    return <div>{getEquipmentText(customEval, value.name, {}, isTZ)} {val ? val : getEquipmentText(customEval, value.default, {}, isTZ)} шт {price ? ` ${numberWithSpaces(price)} рублей` : null}</div>;
                }
            }
        }
    };

    return (
        <>
            {equipment ? equipment.filter(({ condition }) => { return !condition || getEquipmentText(customEval, condition, {}, isTZ) === 'true' }).map(({ name: groupName, value }) => (
                <Fragment key={groupName}>
                    { onlyPrice ? null : <b>{groupName}</b>}
                    <div>
                        {value ? value.filter(({ condition }) => { return !condition || getEquipmentText(customEval, condition, {}, isTZ) === 'true' }).map(({ name: itemName, value }) => {
                            return (
                                <Fragment key={itemName}>
                                    {renderItem(groupName, itemName, value)}
                                </Fragment>
                            );
                        }) : null}
                    </div>
                </Fragment>
            )) : null}
        </>
    );
}

function renderComplectation({ customEval, blocks, data, withPrice }) {
    const { complectation } = data;
    const { complectationBlocks } = blocks;

    const item = complectationBlocks.items.find(item => item.id === (complectation || complectationBlocks.defaultItemId))
    const price = customEval(item.price);

    return (
        <>
            <b>База</b>
            <div>{complectationBlocks.itemTitle} {item.name} {item.title.toLowerCase()} { withPrice ? ` ${numberWithSpaces(price)} рублей` : null}</div>
        </>
    );
}

function renderProjectBlock({ customEval, projectBlock, data, withPrice, hideFund, cpSettings }) {
    const { blocks={} } = data;
    const selectedId = blocks[projectBlock.id];

    if (!selectedId) {
        return;
    }

    const item = projectBlock.items.find(item => item.id === selectedId)
    const price = customEval(item.price);

    return hideFund && projectBlock.id === cpSettings['fund-block-id'] && cpSettings['fund-block-items-id'] && cpSettings['fund-block-items-id'].includes(selectedId) ? null : (
        <>
            <b>{projectBlock.itemTitle}</b>
            <div>{customEval("eval(`'" + item.name + "'`)")} {item.title}{ withPrice ? ` ${numberWithSpaces(price)} рублей` : null}</div>
        </>
    );
}

function renderAdditions({ customEval, data, additions, withPrice }) {
    const items = [];

    additions.forEach(({ type, name, price }) => {
        const id = stringHash(name);
        if (data.add[id]) {
            let itemPrice = getAdditionPrice(customEval, price);

            if (type !== 'boolean') {
                itemPrice *= data.add[id];
            }

            items.push(
                <div>{name}{type !== 'boolean' && data.add[id] > 1 ? ` (${data.add[id]} шт) ` : ' '}{ withPrice ? ` ${numberWithSpaces(itemPrice)} рублей` : null}</div>
            );
        }
    });

    return items ? (
        <>
            <b>Дополнения</b>
            {items}
        </>
    ) : null;
}

function renderAdditionalFormData(formValue, withPrice) {
    return (
        <>
            {formValue.additionalData.map(addition => {
                return <div key={addition.caption}>{addition.caption} {withPrice && addition.price ? ` ${numberWithSpaces(addition.price)} рублей` : null}</div>
            })}
        </>
    )
}

function getCustomAdditionsPrice(formValue) {
    let price = 0;

    if (formValue && formValue.additionalData) {
        formValue.additionalData.forEach(addition => {
            price += addition.price || 0;
        });
    }
    return price;
}

function renderPassport(passport) {
    return (
        <span dangerouslySetInnerHTML={{ __html: ` паспорт номер ${passport && passport.number || '<span style="word-break: break-all">________________ </span>'}
            выдан ${passport && passport.where || '<span style="word-break: break-all">________________________________________________________________ </span>'}
            дата выдачи ${passport && passport.when || '<span style="word-break: break-all">_________________________ </span>'}
            дата рождения ${passport && passport.whenBirth || '<span style="word-break: break-all">__________________________ </span>'}
            место рождения ${passport && passport.whereBirth || '<span style="word-break: break-all">____________________________________________________ </span>'}
            зарегистрирован по адресу ${passport && passport.registration || '<span style="word-break: break-all">____________________________________________________ </span>'}`}} />
    );
}

function renderMiniName(fullName) {
    const names = fullName.split(' ');

    if (names.length === 3) {
        return `${names[0]} ${names[1][0]}. ${names[2][0]}.`
    }

    return '';
}

const renderDogovorHeader = (caption, formValue, name1, name2) => {
    return (
        <>
            <h3 style={{ textAlign: 'center' }}>{caption} № {formValue.documentNumber}</h3>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                <span>г. Пестово, Новгородская область</span>
                <span>{renderDate(new Date(formValue.date))} года</span>
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                Общество с ограниченной ответственностью «Русская Баня» в лице генерального директора
                Старикова Евгения Борисовича, действующего на основании Устава, именуемый в дальнейшем
                “{name1}”, и Гражданин РФ {formValue.client.name || <span style={{ wordBreak: 'break-all' }}>_____________________________________________________________ </span> },
                именуемый в дальнейшем "{name2}",
                {renderPassport(formValue.client.passport)}
                контактный телефон {formValue.client.phone || <span style={{ wordBreak: 'break-all' }}>_____________________ </span> } с
                другой стороны, далее именуемые Стороны, заключили настоящий договор (далее – «Договор») о нижеследующем:
            </div>
        </>
    )
};

const renderDeliveryAddress = (data, formValue) => {
    return data.delivery ? `${data.delivery.address} ${(formValue.addressAddition ? `(${formValue.addressAddition})` : '')}` : '';
};

const renderRequizits = (formValue) => {
    return (
        <table>
            <thead>
            <tr>
                <td style={{ width: '50%'}}>
                    <div><b>Продавец:</b></div>
                    <br />
                </td>
                <td style={{ width: '50%'}}>
                    <div><b>Покупатель:</b></div>
                    <br />
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    ООО «Русская Баня» ИНН 5313015082, ОГРН 1185321002910, Р/С
                    40702810001090000294, К/С 30101810900000000746, В
                    ПАО УКБ «НОВОБАНК» г. Великий Новгород.
                    174510, Новгородская область, г. Пестово, ул.
                    Курганная 12 Тел. 8921 706-63-62, e-mail: info@brus-bany.ru
                    <br /><br />
                </td>
                <td>
                    Гражданин РФ {formValue.client.name || <span style={{ wordBreak: 'break-all' }}>_____________________________________________________________ </span>},
                    {renderPassport(formValue.client.passport)}
                    контактный телефон {formValue.client.phone || <span style={{ wordBreak: 'break-all' }}>_____________________ </span>}
                    <br /><br />
                </td>
            </tr>
            <tr>
                <td>_____________ Стариков Е.Б.</td>
                <td>_____________ {formValue.client.name ? renderMiniName(formValue.client.name) : ''}</td>
            </tr>
            </tbody>
        </table>
    );
}

const renderProtocol = ({ customEval, blocks, formValue, finalPrice, data, cpSettings }) => {
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>ПРОТОКОЛ СОГЛАСОВАНИЯ ЦЕНЫ</h3>
            <br/>
            {renderComplectation({ customEval, blocks, data, withPrice: true })}
            {blocks.projectBlocks && blocks.projectBlocks.length ? blocks.projectBlocks.map(projectBlock => {
                return data.blocks && data.blocks[projectBlock.id] ? <Fragment key={projectBlock.id}>{renderProjectBlock({ projectBlock, customEval, data, withPrice: true, hideFund: true, cpSettings })}</Fragment> : null
            }) : null}
            {data.equipment && blocks.baseEquipment ? (
                <>
                    <b>Комплектация</b>
                    {renderBaseEquipment({ customEval, data, equipment: blocks.baseEquipment, onlyPrice: true })}
                </>
            ) : null}
            {data.add && blocks.additions ? <>{renderAdditions({ customEval, data, additions: blocks.additions, withPrice: true })}</> : null}
            {data.delivery && blocks.deliveryData.delivery ? (
                <>
                    <b>Адрес доставки</b>
                    <div>{data.delivery.address} ({data.delivery.length} км) {numberWithSpaces(data.delivery.price)} рублей</div>
                </>
            ) : null}
            {formValue && formValue.additionalData && formValue.additionalData.length ? renderAdditionalFormData(formValue, true) : null}
            <b>Итоговая стоимость: {numberWithSpaces(getFinalPrice({ customEval, finalPrice, data, blocks, cpSettings }) + getCustomAdditionsPrice(formValue))} рублей</b>
            <br/><br/>
            {data.blocks && data.blocks[cpSettings['fund-block-id']] && cpSettings['fund-block-items-id'] && cpSettings['fund-block-items-id'].includes(data.blocks[cpSettings['fund-block-id']]) ? blocks.projectBlocks.map(projectBlock => {
                if (projectBlock.id === cpSettings['fund-block-id']) {
                    const item = projectBlock.items.find(item => item.id === data.blocks[cpSettings['fund-block-id']])
                    const price = customEval(item.price);

                    return (
                        <Fragment key={projectBlock.id}>
                            <b>{projectBlock.itemTitle}</b>
                            <div>{customEval("eval(`'" + item.name + "'`)")} {numberWithSpaces(price)} рублей</div>
                            <div>Примечание: по фундаменту заключается отдельный договор</div>
                        </Fragment>
                    );
                }
            }) : null}
        </div>
    )
}

const renderSpecification = ({ projectName, customEval, blocks, formValue, data, cpSettings, isTZ }) => {
    return (
        <>
            <h3 style={{ textAlign: 'center' }}>СПЕЦИФИКАЦИЯ</h3>
            <br/>
            <div>{projectName}</div>
            {renderComplectation({ customEval, blocks, data })}
            {blocks.projectBlocks && blocks.projectBlocks.length ? blocks.projectBlocks.map(projectBlock => {
                return data.blocks && data.blocks[projectBlock.id] ? <Fragment key={projectBlock.id}>{renderProjectBlock({ projectBlock, customEval, data, cpSettings })}</Fragment> : null
            }) : null}
            {blocks.baseEquipment && blocks.baseEquipment.length ? renderBaseEquipment({ customEval, data, equipment: blocks.baseEquipment, isTZ }) : null}
            {data.add && blocks.add ? <>{renderAdditions({ customEval, data, additions: blocks.additions })}</> : null}
            {formValue && formValue.additionalData && formValue.additionalData.length ? renderAdditionalFormData(formValue, false) : null}
        </>
    )
}
const pravila = () => {
    return (
        <>
            <h3 style={{ textAlign: 'center' }}>ПРАВИЛА ЭКСПЛУАТАЦИИ</h3>
            <div style={{ textAlign: 'justify' }}>
                1. Вследствие использования в строительстве стенового материала атмосферной сушки, внутри
                построенного сооружения наблюдается повышенная влажность воздуха. Во избежание порчи
                отделочных материалов (половой доски, вагонки, столярных изделий) необходимо в течение
                одного сезона (не считая зиму) после постройки сооружения обеспечить в нем необходимую
                естественную вентиляцию, для этого необходимо держать все двери и окна в открытом
                состоянии. (Только для сооружений, выполненных из бруса естественной влажности).
            </div>
            <div style={{ textAlign: 'justify' }}>
                2. Перед использованием изделия по назначению, необходимо протопить печь, не менее двух раз,
                (будьте внимательны, без воды в баке печь топить нельзя), для обеспечения выветривания
                составов, которыми обработана печь. После этого необходимо проветрить сооружение.
            </div>
            <div style={{ textAlign: 'justify' }}>
                3. После каждого использования изделия необходимо обеспечивать сквозное проветривание:
                открывать окна, двери и отдушину для проветривания на 4-5 часов минимум.
            </div>
            <div style={{ textAlign: 'justify' }}>
                4. Для топки печи используйте сухие дрова или древесные топливные брикеты.
            </div>
            <div style={{ textAlign: 'justify' }}>
                5. При нахождении в парной необходимо соблюдать меры предосторожности, связанные с
                нагретыми поверхностями печи, дымохода и бака для нагрева воды.
            </div>
            <div style={{ textAlign: 'justify' }}>
                6. Не оставляйте детей без присмотра и не разрешайте им топить печь.
            </div>
            <div style={{ textAlign: 'justify' }}>
                7. Прочищайте и проверяйте на прогорание дымоход не реже 1-го раза в 3 месяца.
            </div>
            <br/>
            <h3 style={{ textAlign: 'center' }}>ЗАПРЕЩЕНО</h3>
            <div>1. Растапливать печь легковоспламеняющимися жидкостями (бензин, керосин и т. п.)</div>
            <div>2. Находиться в изделии в состоянии алкогольного опьянения</div>
            <div>3. Оставлять без надзора горящую печь, а также поручать надзор малолетним детям</div>
            <div>4. Разогревать трубы дымохода печи до красного цвета</div>
            <div>5. Высыпать вблизи строений непогашенные угли или золу</div>
            <div>6. Применять не разрешенные к использованию виды топлива</div>
            <div>7. Применять дрова, длина которых превышает размер топки</div>
            <div>8. Топить печь с открытой дверцей</div>
            <div>9. Оставлять воду в баке после использования</div>
            <div>10. Сушить дрова, одежду и другие сгораемые предметы на печи или около нее</div>
            <div>11. Хранить в помещении дрова в количестве, превышающем потребность для разового использования изделия</div>
            <div>12. Вносить изменения в конструкцию изделия и её оборудование</div>
            <div>13. Топить банную печь без воды</div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                Изготовитель предоставляет гарантию только при соблюдении условий эксплуатаций и правил ухода.
                Если вы нарушаете правила эксплуатации, мы не можем гарантировать сохранение эксплуатационных
                свойств изделия, и не принимаем претензии по качеству.
            </div>
        </>
    )
}

const renderDogovor1 = (setContainerRef, pageHeights, cpSettings, blocks, customEval, formValue, data, finalPrice) => {
    return (
        <div ref={ref => { setContainerRef(ref) }} className={styles.container}>
            <div data-content='page' data-page-id='0' className={styles.page} style={pageHeights['0'] ? { height: `${pageHeights['0']}px` } : null}>
                <div style={{ flexGrow: 1 }}>
                    <br/>
                    <br/>
                    {renderDogovorHeader('ДОГОВОР КУПЛИ - ПРОДАЖИ', formValue, 'Продавец', 'Покупатель')}
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>1. ПРЕДМЕТ ДОГОВОРА</h3>
                    <div style={{ textAlign: 'justify' }}>
                        1.1 В соответствии с условиями настоящего Договора Продавец обязуется изготовить из
                        собственных материалов, доставить и установить Покупателю мобильное сооружение (далее именуемая
                        «Баня») в комплектации и стоимости согласно спецификации приложения №1, которое является
                        неотъемлемой частью настоящего Договора, а Покупатель – принять ее в установленном порядке
                        и оплатить.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        1.2 Одновременно с передачей Бани Продавец передает Покупателю относящиеся к Бане
                        документы: Оригинал данного Договора, накладную.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        1.3 Продавец обязуется доставить и установить, в сроки, указанные в договоре, изготовленную
                        Баню по адресу: {renderDeliveryAddress(data, formValue)}.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>2. ЦЕНА ДОГОВОРА, СРОКИ, ПОРЯДОК ОПЛАТЫ ТОВАРА</h3>
                    <div style={{ textAlign: 'justify' }}>
                        2.1 Цена настоящего договора составляет {renderPriceWithWords(getFinalPrice({ customEval, finalPrice, data, blocks, cpSettings }) + getCustomAdditionsPrice(formValue))} без
                        НДС на основании п. 2 ст. 346.11 НК РФ.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        2.2 Доставка осуществляется продавцом, выгрузка {data.add && data.add['726251879'] ? 'входит' : 'не входит'} в стоимость продукции.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        2.3 Цена Договора остается неизменной в течение всего срока действия данного Договора.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        2.4 Ориентировочный срок поставки Бани {renderDate(new Date(formValue.projectDate))} , по согласованию с заказчиком.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        2.5 Авансирование Продавцу подлежащей поставке Бане не предусматривается.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        2.6 Оплата поставляемой Бани, в рамках настоящего договора, осуществляется Покупателем путем
                        передачи наличных денежных средств, представителю Продавца (водителю) по факту поставки Бани
                        по приходно-кассовому ордеру с подписанием акта приема-передачи Бани.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>3. КАЧЕСТВО, КОМПЛЕКТНОСТЬ и ГАРАНТИЯ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        3.1 Качество и комплектность поставляемой Бани определяется в соответствии со спецификацией
                        (Приложение № 1 к настоящему Договору) к поставляемой бане.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.2 В случае передачи поставляемой Бани с нарушением требования о комплектности и качеству
                        Покупатель вправе требовать соразмерного уменьшения покупной цены либо доукомплектования в
                        течение 10 рабочих дней с момента направления претензии письменно на электронный адрес
                        info@brus-bany.ru.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.3 На изделие дается гарантия сроком на 24 месяца: а именно, на протекание кровли, на целостность
                        конструкции, на установку печи с дымоходными трубами типа сендвич труба, двухконтурными.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.4 Гарантийные обязательства вступают в силу с момента полной оплаты договорной стоимости и
                        подписании договора обеими сторонами, при условии соблюдения «Заказчиком» правил эксплуатации
                        строения.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.5 Гарантийные обязательства не распространяются на одноконтурные трубы серии эконом, на
                        случай неравномерного оседания фундаментов при строительстве на торфяниках и заболоченной
                        местности. На посинение, распирание - рассыхание вагонки, полов, бруса, при несоблюдении
                        проветривания после окончания строительства, на протекание и внешний вид кровли, выполненной из
                        рубероида, шифера, аналогов ондулина.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.6 Древесина материал гигроскопичный, для минимизации процесса образования трещин, щелей в
                        брусе, нужно покрыть защитным антисептиком 2-3 раза и выдержать условия сушки.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.7 Гарантийные обязательства не распространяются на ущерб, нанесенный третьими лицами, либо
                        Заказчиком, вследствие неправильной эксплуатации строения.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.8 Гарантийные обязательства утрачивают силу, если Заказчик, в течение действия гарантийного
                        срока изменяет конструкцию изделия.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.9 Подгонка столярных изделий (окна, двери) осуществляется один раз при сдаче объекта.
                        В дальнейшей эксплуатации «Подрядчик» не выезжает к «Заказчику» на данную операцию,
                        так как древесина является материалом гигроскопичным. Рекомендуем столярные изделия покрыть защитным
                        составом незамедлительно.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.10 Гарантийные обязательства не распространяются на строительные материалы, приобретаемые
                        заказчиком самостоятельно.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.11 Гарантийные обязательства имеют силу при наличии у заказчика экземпляра данного договора.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>4. ПОРЯДОК ИЗГОТОВЛЕНИЯ И ПОСТАВКИ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        4.1 Продавец обязуется изготовить и доставить Покупателю баню, по указанному в приложение 1
                        адресу. Доставка производится автотранспортом Продавца.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        4.2 Покупатель заранее осуществляет подготовку участка для установки бани, (Уборка мусора, снега,
                        выравнивание участка, обеспечение подъездных путей к участку).
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        4.3 Установку бани на блоки производится водителем крана.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        4.4 Покупатель гарантирует возможность подъезда транспортного средства (автотранспорт общего
                        назначения, не повышенной проходимости) Продавца непосредственно к месту разгрузки
                        бани. Если дорога или местность не позволяет транспортному средству проехать (подъехать) к месту
                        разгрузки или произвести необходимые маневры, то Баня, разгружаются в наиболее близком и
                        удобном месте по согласованию с Покупателем.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        4.5 При необходимости Покупатель организовывает и оплачивает трактор (вездеход) для буксировки
                        автотранспорта «Продавца» для выгрузки бани на место, и обратно до твердого покрытия дороги.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        4.6 При условии платного въезда автотранспорта на территорию садоводства, Покупатель
                        дополнительно оплачивает расходы по въезду машин подрядчика.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        4.7 В случаях, когда невозможен подъезд автотехники Продавца к месту разгрузки изделия, состояние
                        дорог, не позволяющее проехать и произвести машине необходимые маневры (определяет
                        представитель Продавца), ограничения, наложенные ГИБДД, не позволяющие проехать к месту
                        разгрузки бани, готовое сооружение возвращается назад с оплатой Покупателем транспортных расходов в
                        соответствии с п. 2.2, по двойному тарифу.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>5. ПРИЕМКА ТОВАРА</h3>
                    <div style={{ textAlign: 'justify' }}>
                        5.1 Приемка Бани по внешнему виду, качеству, количеству и комплектности производится
                        Покупателем в присутствии представителя Продавца и оформляется двусторонним актом приема-
                        передачи Бани (все акты согласуются подписями по почте или передаются с водителями).
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        5.2 Покупатель вправе предъявить претензии по качеству, количеству и комплектности Бани в
                        течение всего гарантийного срока. Устранение неисправностей, замена, допоставка оборудования
                        осуществляется Продавцом за свой счет в течение десяти календарных дней с момента обнаружения
                        таковых.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>6. ИМУЩЕСТВЕННАЯ ОТВЕТСТВЕННОСТЬ СТОРОН</h3>
                    <div style={{ textAlign: 'justify' }}>
                        6.1 При неисполнении или ненадлежащем исполнении обязательств, установленных настоящим
                        Договором, виновная сторона обязана возместить другой стороне убытки в полном объеме в течение
                        десяти календарных дней с момента получения претензии.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.2 За просрочку поставки или недопоставку Бани по вине Продавца, Продавец уплачивает
                        Покупателю неустойку в размере 0,01% стоимости бани за каждый день просрочки или недопоставки.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.3 За нарушение договорных обязательств Покупателем по оплате или приемке, Покупатель
                        выплачивает Продавцу пени в размере 0,01% суммы платежа за каждый день просрочки.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.4 Если поставленная Баня не соответствует по качеству, техническим условиям или условиям
                        настоящего Договора, Стороны руководствуются положениями действующего законодательства и
                        условиями настоящего Договора.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.5 Неустойки, предусмотренные настоящим Договором, начисляются в случае предъявления
                        письменного требования об их уплате. Их выплата не освобождает стороны от исполнения
                        обязательств по Договору.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>7. СРОК ДЕЙСТВИЯ ДОГОВОРА. ИЗМЕНЕНИЕ И РАСТОРЖЕНИЕ ДОГОВОРА</h3>
                    <div style={{ textAlign: 'justify' }}>
                        7.1 Настоящий Договор вступает в силу с момента его подписания и согласования Сторонами и
                        заканчивает свое действие после надлежащего выполнения Сторонами всех своих обязательств,
                        вытекающих из Договора.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        7.2 Все изменения и дополнения к настоящему Договору выполняются в письменном виде и
                        оформляются дополнительным соглашением, подписанным Сторонами.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        7.3 Любая договоренность между Сторонами, влекущая за собой новые обстоятельства, не
                        предусмотренные настоящим договором, считается действительной, если она подтверждена
                        Сторонами в письменной форме в виде дополнительного соглашения или протокола.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        7.4 Расторжение Договора возможно с соблюдением действующего законодательства.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>8. РАЗРЕШЕНИЕ СПОРОВ МЕЖДУ СТОРОНАМИ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        8.1 Спорные вопросы, возникающие в ходе исполнения настоящего договора, разрешаются
                        Сторонами путем переговоров, а возникшие договоренности в обязательном порядке фиксируются
                        дополнительным соглашением Сторон или протоколом, становящимися с момента их подписания
                        неотъемлемой частью настоящего Договора.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        8.2 Если, по мнению одной из Сторон, не имеется возможность разрешения возникшего между
                        сторонами спора в порядке настоящего Договора, то спор передается на разрешение Гражданского
                        суда по месту нахождения истца в порядке, установленном законодательством РФ.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>9. ОСОБЫЕ УСЛОВИЯ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        9.1 Любое уведомление сторон по данному Договору отправляется в виде заказного письма с
                        уведомлением о вручении по его адресу. Уведомление считается переданным на момент получения
                        Отправителем уведомления о вручении письма Получателю.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        9.2 При выполнении настоящего Договора Стороны руководствуются законодательными и
                        нормативными актами Российской Федерации.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        9.3 Все указанные в Договоре приложения являются его неотъемлемой частью.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        9.4 Настоящий Договор составлен на русском языке в двух экземплярах, имеющих равную
                        юридическую силу, по одному для каждой из Сторон.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>10. ПРИЛОЖЕНИЯ К ДОГОВОРУ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        10.1 Приложение № 1 – Спецификация бани.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        10.2 Приложение № 2 – Акт приёма передачи
                    </div>
                    {cpSettings.pravila ? (
                        <div style={{ textAlign: 'justify' }}>
                            10.3 Приложение №3 – Правила эксплуатации
                        </div>
                    ) : null}
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>11. ЮРИДИЧЕСКИЕ АДРЕСА И РЕКВИЗИТЫ СТОРОН</h3>
                    <br/>
                    {renderRequizits(formValue)}
                    <br/><br/>
                    {renderProtocol({ customEval, blocks, formValue, finalPrice, data, cpSettings })}
                </div>
                {renderRunningTitles(formValue)}
            </div>
            <div data-content='page' data-page-id='1' className={styles.page} style={pageHeights['1'] ? { height: `${pageHeights['1']}px` } : null}>
                <div style={{ flexGrow: 1 }}>
                    <br/><br/>
                    <div style={{ textAlign: 'end' }}>
                        Приложение №1 к договору купли-продажи № {formValue.documentNumber} от {renderDate(new Date(formValue.date))}
                    </div>
                    <br/><br/>
                    {renderSpecification({ projectName: customEval("eval(`'" + cpSettings['product-dogovor-name'] + "'`)"), customEval, blocks, formValue, data, cpSettings })}
                    <br/>
                    <div style={{ textAlign: 'justify' }}>
                        Допускается стыковка: брус по всему периметру стен, вагонка по каждой стене и потолку в отдельно взятом
                        помещении, половой доски в каждой комнате.
                    </div>
                    <br/><br/>
                    <div>Планировка:</div>
                    <img src={formValue.__images__[formValue.images['scheme']]} style={{ width: '100%' }} />
                </div>
                {renderRunningTitles(formValue)}
            </div>
            <div data-content='page' data-page-id='2' className={styles.page} style={pageHeights['2'] ? { height: `${pageHeights['2']}px` } : null}>
                <div style={{ flexGrow: 1 }}>
                    <br/><br/>
                    <div style={{ textAlign: 'end' }}>
                        Приложение №2 к договору купли-продажи № {formValue.documentNumber} от {renderDate(new Date(formValue.date))}
                    </div>
                    <br/><br/>
                    <h3 style={{ textAlign: 'center' }}>АКТ ПРИЕМА - ПЕРЕДАЧИ</h3>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                        <span>___________________</span>
                        <span>«____» ___________ 2021г.</span>
                    </div>
                    <br/><br/>
                    <div style={{ textAlign: 'justify' }}>
                        Мы нижеподписавшиеся, в лице Покупателя {formValue.client.name2 || <span style={{ wordBreak: 'break-all' }}>__________________________________________________________ </span>}, с одной стороны, и в лице генерального
                        директора, ООО «Русская Баня» Старикова Евгения Борисовича или его представителя
                        <span style={{ wordBreak: 'break-all' }}>_______________________________________________________</span>, с другой стороны,
                        удостоверяем, что работы согласно договору № {formValue.documentNumber} и приложений №1 и №2 к данному
                        договору выполнены: произведен общий визуальный осмотр бани, проверена установка
                        комплектующих и столярных изделий.
                    </div>
                    <br/><br/>
                    <div>
                        Работы выполнены в срок.
                    </div>
                    <br/><br/>
                    <div>
                        Замечания:
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        <div style={{ borderBottom: '1px solid #000', height: '20px' }} />
                        <div style={{ borderBottom: '1px solid #000', height: '20px' }} />
                        <div style={{ borderBottom: '1px solid #000', height: '20px' }} />
                    </div>
                    <br/><br/>
                    <div>
                        Подпись представителя Покупателя: _______________
                    </div>
                    <br/><br/>
                    <div>Подпись продавца: _______________ Стариков Е.Б.</div>
                </div>
                {renderRunningTitles(formValue)}
            </div>
            {cpSettings.pravila ? (
                <div data-content='page' data-page-id='3' className={styles.page} style={pageHeights['3'] ? { height: `${pageHeights['3']}px` } : null}>
                    <div style={{ flexGrow: 1 }}>
                        <br/><br/>
                        <div style={{ textAlign: 'end' }}>
                            Приложение №3 к договору купли-продажи № {formValue.documentNumber} от {renderDate(new Date(formValue.date))}
                        </div>
                        <br/><br/>
                        {pravila()}
                    </div>
                    {renderRunningTitles(formValue)}
                </div>
            ) : null}
        </div>
    )
}
const renderDogovor2 = (setContainerRef, pageHeights, cpSettings, blocks, customEval, formValue, data, finalPrice) => {
    return (
        <div ref={ref => { setContainerRef(ref) }} className={styles.container}>
            <div data-content='page' data-page-id='0' className={styles.page} style={pageHeights['0'] ? { height: `${pageHeights['0']}px` } : null}>
                <div style={{ flexGrow: 1 }}>
                    <br/>
                    <br/>
                    {renderDogovorHeader('ДОГОВОР НА ВЫПОЛНЕНИЕ ПОДРЯДНЫХ РАБОТ', formValue, 'Подрядчик', 'Заказчик')}
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>1. ПРЕДМЕТ ДОГОВОРА</h3>
                    <div style={{ textAlign: 'justify' }}>
                        1.1 Подрядчик обязуется по заданию Заказчика в сроки и в порядке, предусмотренном Договором,
                        выполнить работы по изготовлению, доставке и сборке, на указанном Заказчиком земельном участке,
                        {' '}{customEval("eval(`'" + cpSettings['product-dogovor-name'] + "'`)").toLowerCase()}, в комплектации согласно спецификации (Приложение №1и № 2, №3, №4 к Договору)
                        (далее – Изделие, Результат работ), а Заказчик – принять Изделие в установленном порядке и оплатить
                        его в соответствии с разделом 3 Договора.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>2. СРОКИ И ПОРЯДОК ПРОИЗВОДСТВА РАБОТ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        2.1 Подрядчик обязуется:
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        2.1.1 Скомплектовать и доставить составные части и комплектующие Изделия: ориентировочно
                        {' '}{renderDate(new Date(formValue.projectDate))}, по согласованию с заказчиком
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        2.1.2 Собрать Изделие и передать Результат работ Заказчику, не позднее пятнадцати
                        календарных дней с даты доставки Изделия. Допускается досрочное выполнение работ и передача их Результата Заказчику.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        2.2 О предполагаемой дате доставки составных частей и комплектующих Изделия Подрядчик
                        оповещает Заказчика не позднее, чем за 2 календарных дня до даты доставки.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        2.3 Доставка производится силами и средствами Подрядчика по адресу: {renderDeliveryAddress(data, formValue)}
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>3. СТОИМОСТЬ РАБОТ И ПОРЯДОК РАСЧЕТОВ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        3.1 Стоимость Изделия по Договору в соответствии со спецификацией составляет {renderPriceWithWords(getFinalPrice({ customEval, finalPrice, data, blocks, cpSettings }) + getCustomAdditionsPrice(formValue))},
                        НДС не облагается на основании п. 2 ст. 346.11 НК РФ.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.2 Расчеты между Сторонами производятся в два этапа:
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.3 Предоплата в размере 70% от стоимости изделия {renderPriceWithWords(Math.round((getFinalPrice({ customEval, finalPrice, data, blocks, cpSettings }) + getCustomAdditionsPrice(formValue)) * 0.7 / 100) * 100)} без
                        НДС на основании п. 2 ст. 346.11 НК РФ оплачивается Покупателем в день доставки и разгрузки составных частей и комплектующих Изделия по адресу, указанному в п. 2.3 Договора.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.4 Окончательная оплата в размере 30% от стоимости изделия {renderPriceWithWords(Math.round((getFinalPrice({ customEval, finalPrice, data, blocks, cpSettings }) + getCustomAdditionsPrice(formValue)) * 0.3 / 100) * 100)} без
                        НДС на основании п.2 ст. 346.11 НК РФ в день подписания Акта-сдачи приемки изделия.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        3.5 В случае просрочки окончательной оплаты Работ по Договору на срок более 2 банковских дней,
                        с Заказчика взимается штраф в размере 0,1 % от суммы платежа за каждые сутки просрочки,
                        но не более 5 %, начиная с даты сдачи Изделия, подписания акта приёма передачи, Результата работ Заказчику.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>4. ТРАНСПОРТНЫЕ УСЛУГИ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        4.1 Заказчик заранее осуществляет подготовку участка для строительства изделия,
                        (Уборка мусора, снега, выравнивание участка, обеспечение подъездных путей к участку)
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        4.2 При необходимости Заказчик организовывает и оплачивает трактор (вездеход)
                        для буксировки автотранспорта «Подрядчика» с материалом или для перегрузки и доставки
                        до места строительства и обратно до твердого покрытия дороги.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        4.3 Заказчик гарантирует возможность подъезда транспортного средства
                        (автотранспорта с прицепом общего назначения, не повышенной проходимости)
                        типа Маз, Камаз, непосредственно к месту разгрузки материала.
                        Если дорога или местность не позволяет транспортному средству проехать
                        (подъехать) к месту разгрузки или произвести необходимые маневры,
                        то Изделия и иные материалы, разгружаются в наиболее близком и удобном месте
                        по согласованию с Заказчиком. Поднос материала на расстояние более 30 метров
                        до места строительства, оплачивается отдельно, из расчёта 1000 (Тысяча) рублей
                        за 1 метр кубический, в пределах не более 60 м до места строения, за счет Заказчика,
                        или иными силами по согласованию с Подрядчиком. В случае перемещения комплектующих и
                        материалов силами и средствами Заказчика срок данного перемещения не включается в
                        общий срок производства Работ, а соразмерно продлевается. Перегруз материалов с
                        прицепа на автомобиль – 6000 (шесть тысяч) рублей, но не более 10 кубов.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        4.4 При условии платного въезда автотранспорта на территорию садоводства,
                        Заказчик дополнительно оплачивает расходы по въезду машин подрядчика.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        4.5 В случаях когда невозможен подъезд авто-техники Подрядчика к месту разгрузки изделия,
                        состояние дорог не позволяющее проехать и произвести машине необходимые маневры
                        (определяет Подрядчик), составные части и комплектующие возвращается назад
                        с оплатой Заказчиком транспортных расходов в соответствии из расчёта 65 (Шестьдесят пять) рублей за 1 км.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>5. ТРЕБОВАНИЯ, ПРЕДЪЯВЛЯЕМЫЕ К КАЧЕСТВУ РАБОТ И МАТЕРИАЛА</h3>
                    <div style={{ textAlign: 'justify' }}>
                        5.1 Качество работ, выполняемых Подрядчиком, должно одновременно соответствовать:
                        <br/>а) требованиям, установленным Договором и приложениям к нему;
                        <br/>б) требованиям, предъявляемым к данным видам работ и Изделиям.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        5.2 Результаты работ должны также соответствовать применимым строительным нормам и правилам.
                        Однако в случае согласования Заказчиком в приложениях к Договору конструктивных и
                        технологических решений, все риски возникновения несоответствий и отступлений от СНиП, ГОСТ,
                        и иных обязательных нормативных актов несет Заказчик, при этом такие отступления
                        не могут служить причиной отказа Заказчика от приемки выполненных Подрядчиком работ.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        5.3 Все пиломатериалы должны соответствовать ГОСТам (ГОСТ 8486-86, ГОСТ 24454-80),
                        не иметь признаков гнилости, рыхлости, без синевы и грибка,
                        не иметь сквозных трещин, брус должен быть ровным, не иметь изгибов и волн.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        5.4 В случае доставки и передачи Изделия с нарушением требования о комплектности Заказчик
                        вправе требовать соразмерного уменьшения цены Договора либо доукомплектования
                        в течение 5 рабочих дней с момента направления претензии Подрядчику.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        5.5 Гарантийный срок на выполненную Работу и материалы составляет 12 (двенадцать) месяцев
                        с момента подписания Акта приемки-передачи на выполнение работ по данному Договору
                        при условии выполнения Заказчиком правил эксплуатации и рекомендаций.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>6. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h3>
                    <div style={{ textAlign: 'justify' }}>
                        6.1 Права и обязанности Подрядчика.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.1.1 Подрядчик обязан надлежащим образом выполнить Работы в сроки и в пределах,
                        предусмотренных Договором, сдать результат Работ Заказчику, устранить все недостатки Работ,
                        а также обеспечить их устранение в период Гарантийного срока.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.1.2 Подрядчик гарантирует, что его персонал и субподрядчики обладают необходимым
                        опытом и способностями для производства и успешного завершения Работ.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.1.3 Подрядчик обязан обеспечить соблюдение своим персоналом, а
                        также персоналом привлеченных им Субподрядчиков всех применимых правил техники безопасности.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.1.4 Подрядчик обязуется выполнять работы на земельном участке Заказчика с
                        использованием оборудования и инструментов, достаточных для надлежащего производства Работ.
                        Все оборудование Подрядчика должно быть исправным и пригодным для производства соответствующих
                        видов Работ.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.1.5 Подрядчик вправе привлекать субподрядчиков к производству Работ, производить замену
                        отдельных сотрудников или бригаду в целом.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.1.6 Подрядчик вправе заменять используемые в строительстве материалы на аналогичные
                        по свойствам и качеству, только по согласованию с «Заказчиком».
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.2 Права и обязанности Заказчика:
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.2.1 Заказчик вправе в разное время проверять ход и качество Работ, выполняемых Подрядчиком, не вмешиваясь в его деятельность.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.2.2 Заказчик обязан предоставить необходимые условия для производства работ
                        в соответствии с разделом 9 Договора, предоставить земельный участок для производства работ.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.2.3 Заказчик обязан принять Изделие, а также результат Работ по их завершении в порядке,
                        предусмотренном в настоящем Договоре, а также оплатить их в порядке и сроки согласно разделу 3 Договора.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.2.4 Осуществлять надзор за ходом и качеством проведения работ лично, приостанавливать
                        работы при обнаружении отклонений от договорных условий с обязательным немедленным извещением
                        об этом «Подрядчика». В случае необоснованности, согласно условиям Договора, приостановления
                        работ «Заказчиком», «Подрядчик» вправе пролонгировать в одностороннем порядке срок Договора
                        и потребовать возмещение ущерба в результате вынужденного простоя.
                        В случае простоя бригады ( изменения планировки Изделия, замена кровли, или материалов)
                        по вине «Заказчика» более 24 (двадцати четырёх) часов «Заказчик» обязуется выплатить
                        компенсацию бригаде «Подрядчика» из расчета 4000 (четыре тысячи) рублей за сутки
                        простоя на каждого члена бригады.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.2.5 Заказчик вправе привлекать для производства строительных или инженерных
                        работ по согласованию с «Подрядчиком» другие подрядные организации только в
                        том случае, если выполнение ими работ не создаст препятствий для плановой работы «Подрядчика».
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.2.6 Заказчик обязан до начала строительства определить границы своего участка,
                        местоположение будущего строения, подготовить участок: площадка под объект должна
                        быть достаточно ровная, очищена от деревьев, снега, мусора, пней, железобетона, камней.
                        Все старые строения, мешающие новому строительству, должны быть убраны.
                        При строительстве на фундамент «Заказчика» размеры фундамента должны соответствовать
                        заказанному размеру объекта, фундамент должен соответствовать по диагоналям и уровню.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.2.7 Обеспечить для проведения строительных работ.
                        <br/> - Подключение к электросети.
                        <br/> - Помещение для проживания рабочих предоставляется «Заказчиком».
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.2.8 Своевременно производить прием и оплату выполненных работ.
                        В случае непринятия работ «Заказчиком» не подписания акта приема-сдачи,
                        Заказчик на месте согласовывает с бригадиром со Стороны Подрядчика, причины по
                        которым Заказчик не принимает работы, Бригадир на месте в присутствии Заказчика
                        устраняет все недочёты.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        6.2.9 Информировать «Подрядчика» по телефону, и далее в письменном виде об обнаружении
                        им отклонений от условий Договора при производстве работ, ухудшающих качество,
                        или иных недостатках.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>7. ПОРЯДОК ПРИЕМКИ РАБОТ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        7.1 Приемка результата Работ по внешнему виду, качеству и комплектности производится
                        на земельном участке Заказчика в присутствии представителя Подрядчика и
                        оформляется двусторонним актом. Подрядчик или его представитель не
                        позднее, чем за 2 дня до предполагаемого завершения Работ предупреждает
                        телефонным звонком или направляет Заказчику уведомление о завершении Работ и необходимости их приемки.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        7.2 В день окончания Работ представители Подрядчика передают Заказчику или его
                        представителю по доверенности 2 (Два) экземпляра Акта сдачи-приемки Работ,
                        который Заказчик обязан подписать или предоставить мотивированный отказ от приемки
                        результата Работ на месте с подробным указанием на конкретные недостатки Работ.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        7.3 В случае не подписания Заказчиком или его представителем Акта сдачи-приемки Работ
                        и непредставления мотивированного отказа от приемки, Работы считаются принятыми
                        в одностороннем порядке и подлежат оплате согласно условиям Договора.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        7.4 В случае обнаружения недостатков и предоставления Подрядчику мотивированного
                        отказа от приемки Работ, Подрядчик оценивает обнаруженные недостатки Работ и сообщает
                        Заказчику на месте, о сроках их устранения в срок не позднее 3 дней с момента
                        получения мотивированного отказа. Несущественные недостатки, которые
                        могут быть исправлены на месте без завоза дополнительных материалов исправляются незамедлительно.
                        Срок устранения остальных недостатков определяется по соглашению Сторон,
                        но в любом случае составляет не более 30 рабочих дней.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        7.5 В случае обнаружения Заказчиком недостатков Работ после приемки Работ он
                        вправе предъявить свои требования в течение всего гарантийного срока.
                        Устранение неисправностей, замена, допоставка материалов при условии признания
                        случая гарантийным осуществляется Подрядчиком за свой счет в кратчайшие разумные сроки.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>8. ОТВЕТСТВЕННОСТЬ СТОРОН</h3>
                    <div style={{ textAlign: 'justify' }}>
                        8.1 За неисполнение или ненадлежащее исполнение настоящего Договора
                        Стороны несут ответственность в соответствии с действующим законодательством Российской Федерации.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        8.2 За просрочку поставки или недопоставку Изделия по вине Подрядчика,
                        Заказчик вправе взыскать с Подрядчика неустойку в размере 0,01% от стоимости Изделия за каждый день просрочки или недопоставки,
                        но не более 2% стоимости Изделия.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        8.3 В случае задержки окончания Работ по Договору, Заказчик вправе взыскать с
                        Подрядчика неустойку в размере 0,1% от стоимости Договора, но не более 2% стоимости Договора.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        8.4 За нарушение договорных обязательств Заказчиком по оплате или приемке,
                        Заказчик выплачивает Подрядчику пени в размере 0,1% суммы платежа за каждый день
                        просрочки, но не более 2% стоимости Изделия по Договору.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        8.5 Неустойки, предусмотренные настоящим Договором, начисляются в случае предъявления
                        письменного требования об их уплате. Их выплата не освобождает Стороны от
                        исполнения обязательств по Договору.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        8.6 Если результат Работ не соответствует по качеству, техническим условиям
                        или условиям настоящего Договора, Заказчик вправе требовать безвозмездного
                        устранения недостатков в согласованный Сторонами разумный срок.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>9. УСЛОВИЯ ПРОВЕДЕНИЯ РАБОТ НА ЗЕМЕЛЬНОМ УЧАСТКЕ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        9.1 Заказчик за свой счет обеспечивает бригаду Подрядчика временным жильём, электричеством,
                        водой и полевым туалетом. В случае отсутствия у «Заказчика» места для проживания рабочих,
                        жилье обеспечивает «Подрядчик» за дополнительную плату.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        9.2 Стороны составляют чертеж, на котором схематично указывается привязка будущего
                        строения к местности на земельном участке Заказчика.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        9.3 Заказчик обеспечивает наличие и несет ответственность в случае отсутствия у него правоустанавливающих
                        документов на земельный участок (свидетельство о праве собственности, аренды,
                        постоянного (бессрочного) пользования и др.).
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        9.4 Заказчик обеспечивает беспрепятственный доступ Подрядчика на свой участок в
                        течение всего периода строительства.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        9.5 Подрядчик обеспечивает доставку строительных материалов и рабочих, а также их питание.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        9.6 Подрядчик обеспечивает необходимую противопожарную, санитарную, экологическую
                        безопасность и общий порядок той части участка Заказчика, где производятся работы.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        9.7 Подрядчик обеспечивает сохранность составных частей и комплектующих Изделия
                        с даты доставки Изделия на участок Заказчика на весь период проведения работ по сборке изделия".
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>10. ГАРАНТИЙНЫЕ ОБЯЗАТЕЛЬСТВА</h3>
                    <div style={{ textAlign: 'justify' }}>
                        10.1 На Изделие, дается гарантия сроком на 12 месяцев: а именно, на протекание кровли,
                        на целостность конструкции.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        10.2 Гарантийные обязательства вступают в силу с момента полной оплаты договорной
                        стоимости, при условии соблюдения «Заказчиком» правил эксплуатации строения.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        10.3 Гарантийные обязательства не распространяются на случай неравномерного
                        оседания фундаментов при строительстве на торфяниках и заболоченной местности.
                        На посинение, распирание – рассыхание вагонки, полов, бруса, при несоблюдении проветривания
                        после окончания строительства, на протекание и внешний вид кровли, выполненной из рубероида,
                        шифера, аналогов Ондулина, гарантия не дается в связи с не соответствующими «Подрядчика»
                        эксплуатационными характеристиками данных кровельных материалов (низкое качество,
                        механическая (ветровая) неустойчивость рубероида и погодно-температурная зависимость
                        битумных аналогов Ондулина).
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        10.4 Древесина материал гигроскопичный, для минимизации процесса образования
                        трещин, щелей в брусе, нужно покрыть защитным антисептиком 2-3 раза и выдержать условия сушки.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        10.5 Гарантийные обязательства не распространяются на ущерб, нанесенный третьими
                        лицами, либо Заказчиком, вследствие неправильной эксплуатации строения.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        10.6 Гарантийные обязательства утрачивают силу, если Заказчик,
                        в течение действия гарантийного срока изменяет конструкцию Изделия.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        10.7 Подгонка столярных изделий (окна, двери) осуществляется один раз при
                        сдаче объекта.  В дальнейшей эксплуатации «Подрядчик» не выезжает
                        к «Заказчику» на данную операцию, так как древесина является материалом
                        гигроскопичным. Рекомендуем столярные изделия покрыть защитным составом незамедлительно.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        10.8 Гарантийные обязательства не распространяются на строительные материалы,
                        приобретаемые заказчиком самостоятельно.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        10.9 Гарантийные обязательства не распространяются на ущерб, вследствие
                        неправильной эксплуатации строения Заказчиком.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>11. ФОРС-МАЖОР</h3>
                    <div style={{ textAlign: 'justify' }}>
                        11.1 Стороны освобождаются от ответственности за полное или частичное неисполнение
                        своих обязательств по настоящему Договору, если их неисполнение явилось следствием
                        форс-мажорных обстоятельств. Наступление этих обстоятельств должно быть подтверждено
                        соответствующими уполномоченными органами.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        11.2 Сторона, у которой возникли обстоятельства форс-мажора, обязаны в течение
                        десяти рабочих дней письменно информировать другую Сторону о случившемся и
                        его причинах. Если от Заказчика не поступает иных письменных уведомлений,
                        Подрядчик продолжает выполнять свои обязательства по Договору, насколько это целесообразно.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        11.3 Если такие обстоятельства продолжаются свыше 30 (Тридцати) календарных дней,
                        то Стороны вправе рассмотреть вопрос о расторжении настоящего Договора, при этом
                        Подрядчик обязуется вернуть Заказчику денежные средства, полученные в качестве
                        аванса, за вычетом стоимости фактически доставленного Изделия и стоимости произведенных Работ.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        11.4 Согласно ст. 485 п.3 ГК РФ, в случае непредвиденного подорожания материала,
                        используемого для изготовления Изделия или комплектующих, стоимости транспортных услуг,
                        Продавец в праве увеличить стоимость договора на сумму равную сумме увеличенной
                        стоимости материалов и транспортных услуг. Если поставка
                        бани была отложена по просьбе Покупателя на неопределенный срок, то цена договора может быть
                        увеличена.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>12. СРОК ДЕЙСТВИЯ ДОГОВОРА, ПОРЯДОК ЕГО ИЗМЕНЕНИЯ И РАСТОРЖЕНИЯ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        12.1 Договор вступает в силу с даты его подписания Сторонами и действует
                        до полного исполнения Сторонами взятых на себя обязательств.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        12.2 Изменения и дополнения настоящего Договора оформляются в виде
                        дополнительного соглашения, подписанного Сторонами, в двух экземплярах, имеющих
                        одинаковую юридическую силу. Все изменения и дополнения к настоящему Договору действительны,
                        если они подписаны уполномоченными представителями Поставщика и Покупателя и заверены их
                        печатями (при наличии).
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        12.3 Стороны вправе расторгнуть настоящий Договор по соглашению Сторон в любое время.
                        Одностороннее расторжение настоящего Договора допускается по основаниям, предусмотренным
                        настоящим Договором и действующим законодательством Российской Федерации.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        12.4 Заказчик вправе в одностороннем порядке расторгнуть настоящий Договор
                        в случае существенного нарушения Подрядчиком срока выполнения Работ.
                        Под существенным понимается просрочка в 15 календарных дней и более.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        12.5 Подрядчик вправе в одностороннем порядке отказаться от исполнения
                        Договора в случае просрочки Заказчиком любого из платежей по Договору на
                        срок более 10 календарных дней.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        12.6 При прекращении Договора по основаниям иным, чем полное его исполнение:
                        <br/> а) Подрядчик в течение 15 (пятнадцати) календарных дней передаст Заказчику результаты Работ, выполненных на момент прекращения Договора;
                        <br/> б) Если стоимость надлежаще выполненных Работ, определенная в соответствии с Договором
                        превышает сумму денежных средств, поступивших от Заказчика к Подрядчику, Заказчик в течение
                        пятнадцати дней с момента передачи результатов Работ уплатит Подрядчику сумму, составляющую
                        разницу между двумя указанными величинами. Если сумма денежных средств, поступивших от
                        Заказчика к Подрядчику, превышает стоимость надлежаще выполненных Работ, то Подрядчик в
                        течение пятнадцати календарных дней с момента передачи результатов Работ вернет Заказчику
                        излишек денежных средств.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        12.7 При прекращении Договора вследствие заявления Заказчиком отказа от Договора,
                        не связанного с неисполнением или ненадлежащим исполнением Подрядчиком своих
                        обязательств, Заказчик уплачивает Подрядчику часть установленной цены пропорционально
                        части Работы, выполненной до получения уведомления об отказе, а также возмещает
                        Подрядчику убытки, причиненные прекращением Договора в пределах разницы между ценой
                        Договора и частью цены, выплаченной за выполненные Работы.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>13. ОСОБЫЕ УСЛОВИЯ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        13.1 Все разногласия в рамках настоящего Договора Стороны осуществляют путем переговоров
                        и в претензионном порядке. Срок ответа на претензию – 10 календарных дней с
                        момента ее получения. В случае неполучения ответа на претензию в установленный
                        срок или не согласия с ответом Сторона для разрешения возникшего спора обращается
                        в суд общей юрисдикции в порядке, установленном действующим законодательством.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        13.2 Документы, переданные посредством факсимильной связи или электронной почты,
                        имеют для Сторон юридическую силу при исполнении настоящего Договора, при условии
                        предоставления в последующем Стороне подлинников документов или направления их по почте.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        13.3 Любое уведомление по настоящему Договору отправляется получателю в виде заказного
                        или ценного письма с уведомлением о вручении по его реквизитам, указанным в разделе 16
                        настоящего Договора. Допускается отправка документации экспресс - почтой.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        13.4 В случае изменения реквизитов Сторона обязана незамедлительно,
                        в письменной форме, известить другую Сторону. Неблагоприятные последствия,
                        возникшие в связи с ненадлежащим извещением, возлагаются на Сторону, изменившую свои реквизиты.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        13.5 Во всем, что не предусмотрено настоящим Договором, Стороны руководствуются
                        действующим законодательством Российской Федерации.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        13.6 Стороны берут на себя взаимные обязательства по соблюдению режима
                        конфиденциальности информации и документации, полученных при исполнении условий
                        настоящего Договора и дополнительных соглашений к нему.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        13.7 Стороны должны за свой счет принять меры по взаимной защите своих интересов
                        от третьих лиц, которые могли бы нанести Сторонам какие-либо материальные убытки,
                        ущербы, финансовые претензии и др., в процессе исполнения Сторонами
                        обязательств по настоящему Договору.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        13.8 Подрядчик вправе вывести с участка «Заказчика»
                        строительные материалы, оставшиеся после строительства. Строительные
                        материалы отгружаются изначально с запасом.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>14. ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        14.1 Подрядчиком не выполняются электрические, сантехнические, малярные и
                        другие работы, непредусмотренные настоящим Договором.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        14.2 Подрядчик не вывозит с участка Заказчика строительный мусор и грунт,
                        образовавшийся в результате работ. Мусор, что образуется во время строительства
                        Изделия, складывается в кучи.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        14.3 Подрядчик не выполняет работы по согласованию проекта, архитектурного решения,
                        размещения строения на участке, подводки коммуникаций и т.д. с местными
                        административными органами и не несет за это ответственности.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        14.4 Если «Заказчик» в процессе выполнения работ по данному Договору берет на себя
                        поставку отдельных материалов или оборудования, то он обязан согласовать с «Подрядчиком»
                        стоимость материалов, до момента поставки этих материалов, на которую уменьшается
                        стоимость Договора. «Подрядчик» имеет право увеличить стоимость работ, связанных с
                        применением более дорогостоящих материалов при обязательном согласовании с «Заказчиком».
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        14.5 Согласованные с «Заказчиком» размеры и конструктивные решения являются обязательными
                        для «Подрядчика» и «Заказчика», независимо от имеющихся отступлений от СниП-ов, ГОСТов,
                        и не могут служить причиной отказа от приема выполненных работ.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        14.6 Заказчик не вправе привлекать работников «Подрядчика», для выполнения
                        каких-либо работ вне настоящего Договора.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        14.7 Устные соглашения между «Заказчиком» и работниками «Подрядчика» по изменениям и
                        дополнениям к настоящему Договору не имеют юридической силы, и ведут к аннулированию
                        гарантийных обязательств.
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        14.8 «Заказчик» несет ответственность за все изменения, внесенные в ходе строительства,
                        согласованные только с работниками «Подрядчика» без согласования с «Подрядчиком»
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        14.9 Данный Договор вступает в силу с момента подписания его Сторонами, составлен в 2-х
                        экземплярах, имеющих равную юридическую силу. Приложения № 1, № 2 являются неотъемлемой частью Договора.
                        Приложением к Договору могут служить: Спецификация, эскизы, инструкции, памятка и т.д.
                    </div>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>15. ПРИЛОЖЕНИЯ К ДОГОВОРУ</h3>
                    <div style={{ textAlign: 'justify' }}>
                        15.1 Приложение №1 – Спецификация изделия
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        15.2 Приложение №2 – Планировочное решение
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        15.3 Приложение №3 – Акт приёма передачи
                    </div>
                    {cpSettings.pravila ? (
                        <div style={{ textAlign: 'justify' }}>
                            15.4 Приложение №4 – Правила эксплуатации
                        </div>
                    ) : null}
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>16. ЮРИДИЧЕСКИЕ АДРЕСА И РЕКВИЗИТЫ СТОРОН</h3>
                    <br/>
                    {renderRequizits(formValue)}
                    <br/><br/>
                    {renderProtocol({ customEval, blocks, formValue, finalPrice, data, cpSettings })}
                </div>
                {renderRunningTitles(formValue)}
            </div>
            <div data-content='page' data-page-id='1' className={styles.page} style={pageHeights['1'] ? { height: `${pageHeights['1']}px` } : null}>
                <div style={{ flexGrow: 1 }}>
                    <br/><br/>
                    <div style={{ textAlign: 'end' }}>
                        Приложение №1 к договору на выполнение подрядных работ № {formValue.documentNumber} от {renderDate(new Date(formValue.date))}
                    </div>
                    <br/><br/>
                    {renderSpecification({ projectName: customEval("eval(`'" + cpSettings['product-dogovor-name'] + "'`)"), customEval, blocks, formValue, data, cpSettings })}
                    <br/>
                    <div style={{ textAlign: 'justify' }}>
                        Допускается стыковка: брус по всему периметру стен, вагонка по каждой стене и потолку в отдельно взятом
                        помещении, половой доски в каждой комнате.
                    </div>
                </div>
                {renderRunningTitles(formValue)}
            </div>
            <div data-content='page' data-page-id='2' className={styles.page} style={pageHeights['2'] ? { height: `${pageHeights['2']}px` } : null}>
                <div style={{ flexGrow: 1 }}>
                    <br/><br/>
                    <div style={{ textAlign: 'end' }}>
                        Приложение №2 к договору на выполнение подрядных работ № {formValue.documentNumber} от {renderDate(new Date(formValue.date))}
                    </div>
                    <br/><br/>
                    <h3 style={{ textAlign: 'center' }}>СХЕМА</h3>
                    <img src={formValue.__images__[formValue.images['scheme']]} style={{ width: '100%' }} />
                </div>
                {renderRunningTitles(formValue)}
            </div>
            <div data-content='page' data-page-id='3' className={styles.page} style={pageHeights['3'] ? { height: `${pageHeights['3']}px` } : null}>
                <div style={{ flexGrow: 1 }}>
                    <br/><br/>
                    <div style={{ textAlign: 'end' }}>
                        Приложение №3 к договору на выполнение подрядных работ № {formValue.documentNumber} от {renderDate(new Date(formValue.date))}
                    </div>
                    <br/><br/>
                    <h3 style={{ textAlign: 'center' }}>АКТ ПРИЕМА - ПЕРЕДАЧИ</h3>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                        <span>___________________</span>
                        <span>«____» ___________ 2021г.</span>
                    </div>
                    <br/><br/>
                    <div style={{ textAlign: 'justify' }}>
                        Мы нижеподписавшиеся, в лице Покупателя {formValue.client.name2 || <span style={{ wordBreak: 'break-all' }}>__________________________________________________________ </span>}, с одной стороны, и в лице генерального
                        директора, ООО «Русская Баня» Старикова Евгения Борисовича или его представителя
                        <span style={{ wordBreak: 'break-all' }}>_______________________________________________________</span>, с другой стороны,
                        удостоверяем, что работы согласно договору № {formValue.documentNumber} и приложений №1 и №2 к данному
                        договору выполнены: произведен общий визуальный осмотр построенного объекта, проверена установка
                        окон и дверей, а также скрытых работ – утепление полов, потолков, утепление стен и углов.
                        Работы выполнены в срок.
                    </div>
                    <br/><br/>
                    <div>
                        Замечания:
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        <div style={{ borderBottom: '1px solid #000', height: '20px' }} />
                        <div style={{ borderBottom: '1px solid #000', height: '20px' }} />
                        <div style={{ borderBottom: '1px solid #000', height: '20px' }} />
                    </div>
                    <br/><br/>
                    <div>
                        Подпись представителя заказчика: _______________
                    </div>
                    <br/><br/>
                    <div>
                        Подпись представителя подрядчика: _______________
                    </div>
                </div>
                {renderRunningTitles(formValue)}
            </div>
            {cpSettings.pravila ? (
                <div data-content='page' data-page-id='4' className={styles.page} style={pageHeights['4'] ? { height: `${pageHeights['4']}px` } : null}>
                    <div style={{ flexGrow: 1 }}>
                        <br/><br/>
                        <div style={{ textAlign: 'end' }}>
                            Приложение №4 к договору на выполнение подрядных работ № {formValue.documentNumber} от {renderDate(new Date(formValue.date))}
                        </div>
                        <br/><br/>
                        {pravila()}
                    </div>
                    {renderRunningTitles(formValue)}
                </div>
            ) : null}
        </div>
    );
};

const renderTZ = (blocks, cpSettings, customEval, formValue, data, finalPrice, hasAddBlock) => {
    return (
        <div className={styles.container}>
            <br/>
            <br/>
            <h3 style={{ textAlign: 'center' }}>ТЗ ДОГОВОР №{formValue.documentNumber}</h3>
            <div style={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}>{customEval("eval(`'" + cpSettings['product-cp-name'] + "'`)")}</div>
            <br/>
            <div>{formValue.client.name}, {formValue.client.phone}, {renderDate(new Date(formValue.projectDate))}, {data.delivery ? `${data.delivery.address} ${(formValue.addressAddition ? `(${formValue.addressAddition})` : '')}` : ''}</div>
            <br/>
            <br/>
            {renderSpecification({ projectName: customEval("eval(`'" + cpSettings['product-cp-name'] + "'`)").toLowerCase(), customEval, blocks, formValue, data, cpSettings, isTZ: true })}
            {hasAddBlock ? (
                <>
                    <br/>
                    <div style={{ textAlign: 'justify' }}>
                        Допускается стыковка: брус по всему периметру стен, вагонка по каждой стене и потолку в отдельно взятом
                        помещении, половой доски в каждой комнате.
                    </div>
                </>
            ) : null}
            {hasAddBlock ? (
                <>
                    <br/><br/>
                    {renderProtocol({ customEval, blocks, formValue, finalPrice, data, cpSettings })}
                </>
            ) : null}
            <br/>
            <div style={{ textAlign: 'center', fontStyle: 'italic' }}>Схема</div>
            <img src={formValue.__images__[formValue.images.scheme]} style={{ width: '100%' }} />
            <br/><br/>
            <div style={{ textAlign: 'center', fontStyle: 'italic' }}>Визуализация</div>
            <img src={formValue.__images__[formValue.images.main]} style={{ width: '100%' }} />
            {formValue.images['forTZ'] && formValue.images['forTZ'].length ? (
                formValue.images['forTZ'].map(({ comment, image }) => (
                    <>
                        <br/><br/>
                        <div style={{ textAlign: 'center', fontStyle: 'italic' }}>{comment}</div>
                        <img src={formValue.__images__[image]} style={{ width: '100%' }} />
                    </>
                ))
            ) : null}
        </div>
    )
}

function Dogovor({ blocks, customEval, cpSettings, type, formValue, data, finalPrice }) {
    const [containerRef, setContainerRef] = useState(null);
    const [pageHeights, setPageHeights] = useState({});

    useEffect(() => {
        setPageHeights({});
    }, [formValue]);

    useEffect(() => {
        if (containerRef && JSON.stringify(pageHeights) === '{}') {
            const pages = containerRef.querySelectorAll('[data-content="page"]');

            const newHeights = {};

            pages.forEach(page => {
                let pagesCount = Math.ceil(page.offsetHeight / (window.PAGE_HEIGHT || PAGE_HEIGHT));
                newHeights[page.getAttribute('data-page-id')] = pagesCount * (window.PAGE_HEIGHT || PAGE_HEIGHT);
            });

            setPageHeights(newHeights);
        }
    }, [containerRef, pageHeights]);

    const razbornObject = cpSettings.type === '0' || data.add && data.add['360904924'];

    switch(type) {
        case 'dogovor':
            if (razbornObject) {
                return renderDogovor2(setContainerRef, pageHeights, cpSettings, blocks, customEval, formValue, data, finalPrice);
            } else {
                return renderDogovor1(setContainerRef, pageHeights, cpSettings, blocks, customEval, formValue, data, finalPrice);
            }
        case 'tz':
            return renderTZ(blocks, cpSettings, customEval, formValue, data, finalPrice, razbornObject);
        default:
            return null;
    }
}

export default memo(Dogovor);
