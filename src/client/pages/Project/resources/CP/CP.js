import React, { memo } from 'react';
import numberWithSpaces from '@utils/numberWithSpaces';
import Logo from '@components/Logo';
import Caption from '../../../../components/Caption';
import { Button } from '../../../../../components/Button';
import Form from '../../../../../admin/components/Form';
import { getItemPrice as getAdditionPrice } from '../Additions';
import withNotification from '@plugins/Notifications/withNotification';
import renderDate from '@utils/RenderDate';
import styles from './CP.module.css';
import cx from "classnames";

function renderManager(id) {
    switch(id) {
        case '1': return 'C уважением, Марина: 8 (921) 204-65-12';
        case '2': return 'C уважением, Константин: 8 (901) 543-85-19';
        case '3': return 'C уважением, Юлия: 8 (977) 384-88-52';
    }
}

function renderBaseEquipment(equipment) {
    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-caption']}>Базовая комплектация</div>
            <div className={styles['preview-block-content']}>
                {equipment ? equipment.map(({ name, value }) => (
                    <div className={styles['preview-group']}>
                        <div className={styles['preview-group-caption']}>{name}</div>
                        <div className={styles['preview-group-items']}>
                            {value ? value.map(({ name }) => (
                                <div className={styles['preview-group-item']}>{name}</div>
                            )) : null}
                        </div>
                    </div>
                )) : null}
            </div>
        </div>
    );
}
function renderComplectation(project, data) {
    const { complectation } = data;
    const { complectationBlocks } = project.categoryId;

    const defaultItemId = complectationBlocks.defaultItemId;

    const item = complectationBlocks.items.find(item => item.id === (complectation || defaultItemId))

    const price = project.prices && project.prices[item.id] ? project.prices[item.id] : 0;

    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-caption']}>База</div>
            <div className={styles['preview-block-content']}>
                <div className={styles['preview-group-caption']}>{complectationBlocks.itemTitle} {item.name} {item.title.toLowerCase()}<span className={styles['preview-price']}>{` ${numberWithSpaces(price)} рублей`}</span></div>
            </div>
        </div>
    );
}
function renderProjectBlock(projectBlock, project, data) {
    const { blocks={} } = data;
    const selectedId = blocks[projectBlock._id];

    if (!selectedId) {
        return;
    }

    const item = projectBlock.items.find(item => item._id === selectedId)

    const { layoutId: params } = project;
    const price = eval(item.price);

    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-caption']}>{projectBlock.itemTitle}</div>
            <div className={styles['preview-block-content']}>
                <div className={styles['preview-group-caption']}>{item.name}<span className={styles['preview-price']}>{` ${numberWithSpaces(price)} рублей`}</span></div>
            </div>
        </div>
    );
}
function renderAdditions(project, data, additions) {
    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-caption']}>Дополнения</div>
            <div className={styles['preview-block-content']}>
                {additions ? additions.map(({ name, _id, value }) => {
                    const items = [];

                    if (value) {
                        value.forEach(({ type, name, _id, price }) => {
                            if (data.additions[_id]) {
                                let itemPrice = getAdditionPrice(project, data, price);

                                if (type !== 'boolean') {
                                    itemPrice *= data.additions[_id];
                                }

                                items.push(
                                    <div className={styles['preview-group-item']}>{name} <span className={styles['preview-price']}>{` ${numberWithSpaces(itemPrice)} рублей`}</span></div>
                                );
                            }
                        });
                    }

                    return items.length ? (
                        <div className={styles['preview-group']}>
                            <div className={styles['preview-group-caption']}>{name}</div>
                            <div className={styles['preview-group-items']}>
                                {items}
                            </div>
                        </div>
                    ) : null;
                }) : null}
            </div>
        </div>
    );
}
function renderDelivery(data) {
    const { delivery } = data;

    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-caption']}>Адрес доставки</div>
            <div className={styles['preview-block-content']}>
                <div className={styles['preview-group-caption']}>{delivery.address}<span className={styles['preview-price']}>{` ${numberWithSpaces(delivery.price)} рублей`}</span></div>
            </div>
        </div>
    );
}
function renderDeliveryAdditions(project, data, additions) {
    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-caption']}>Дополнения к доставке</div>
            <div className={styles['preview-block-content']}>
                {additions ? additions.map(({ name, _id, value }) => {
                    const items = [];

                    if (value) {
                        value.forEach(({ type, name, _id, price }) => {
                            if (data.deliveryAdditions[_id]) {
                                let itemPrice = getAdditionPrice(project, data, price);

                                if (type !== 'boolean') {
                                    itemPrice *= data.deliveryAdditions[_id];
                                }

                                items.push(
                                    <div className={styles['preview-group-caption']}>{name} <span className={styles['preview-price']}>{` ${numberWithSpaces(itemPrice)} рублей`}</span></div>
                                );
                            }
                        });
                    }

                    return items.length ? items : null;
                }) : null}
            </div>
        </div>
    );
}
function renderCustomAdditions(additions) {
    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-content']}>
                {additions.map(addition => {
                    return <div className={styles['preview-group-caption']}>{addition.caption} {addition.price ? <span className={styles['preview-price']}>{` ${numberWithSpaces(addition.price)} рублей`}</span> : null}</div>
                })}
            </div>
        </div>
    );
}
function renderFinalPrice(finalPrice) {
    return (
        <div className={styles['preview-block']}>
            <div className={styles['preview-block-caption']}>Итоговая стоимость: <span className={styles['preview-price']}>{numberWithSpaces(finalPrice)} рублей</span></div>
        </div>
    );
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

const renderCP = (project, formValue, data, infoBlock, finalPrice) => {
    const { categoryId } = project;
    return (
        <div className={styles.cp}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginTop: '32px' }}>Коммерческое предложение компании "Брус бани"</div>
            <div className={cx(styles['preview-header'], styles['preview-block'])}>
                <Logo className={styles['preview-logo']}/>
                <div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>https://brus-bany.ru</div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>info@brus-bany.ru</div>
                    <div style={{ textAlign: 'right', margin: '4px 0' }}>{renderManager(formValue.manager)}</div>
                </div>
            </div>
            <div className={styles['preview-block']} style={{ display: 'flex' }}>
                <img src={formValue.images[0].image} style={{ width: '50%' }}/>
                {infoBlock}
            </div>
            <div className={cx(styles['preview-block'], styles['preview-images'])}>
                {formValue.images.map(({ image }) => (
                    <img src={image} />
                ))}
            </div>
            {categoryId.newEquipment && categoryId.newEquipment.length ? renderBaseEquipment(categoryId.newEquipment) : null}
            {renderComplectation(project, data)}
            {categoryId.projectBlocks && categoryId.projectBlocks.length ? categoryId.projectBlocks.map(projectBlock => {
                return renderProjectBlock(projectBlock, project, data)
            }) : null}
            {data.additions && project.categoryId.additions ? renderAdditions(project, data, project.categoryId.additions) : null}
            {data.delivery && project.categoryId.deliveryData.delivery ? renderDelivery(data) : null}
            {data.deliveryAdditions && project.categoryId.deliveryData.additions ? renderDeliveryAdditions(project, data, project.categoryId.deliveryData.additions) : null}
            {formValue && formValue.additionalData && formValue.additionalData.length ? renderCustomAdditions(formValue.additionalData) : null}
            {renderFinalPrice(finalPrice + getCustomAdditionsPrice(formValue))}
        </div>
    )
}
const renderDogovor = (project, formValue, data, finalPrice, schemeImage) => {
    const { categoryId } = project;
    return (
        <div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>ДОГОВОР КУПЛИ - ПРОДАЖИ БАНИ №{formValue.documentNumber}</h3>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                <span>г. Пестово.</span>
                <span>{renderDate(new Date(formValue.date))}</span>
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                Общество с ограниченной ответственностью «Русская Баня» в лице генерального директора
                Старикова Евгений Борисовича, действующего на основании Устава, именуемый в дальнейшем
                “Продавец”, и Гражданин РФ ___________________________________________________ , именуемый в
                дальнейшем "Покупатель", паспорт _____________ выдан _________________________ г., контактный
                телефон _____________ с другой стороны, далее именуемые Стороны, заключили настоящий договор (далее
                – «Договор») о нижеследующем:
            </div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>1. ПРЕДМЕТ ДОГОВОРА</h3>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                1.1 В соответствии с условиями настоящего Договора Продавец обязуется изготовить из
                собственных материалов, доставить и установить Покупателю мобильную баню (далее именуемая
                «Баня») в комплектации и стоимости согласно спецификации приложения №1, которое является
                неотъемлемой частью настоящего Договора, а Покупатель – принять ее в установленном порядке
                и оплатить.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                1.2 Одновременно с передачей Бани Продавец передает Покупателю относящиеся к Бане
                документы: Оригинал данного Договора, накладную.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                1.3 Продавец обязуется доставить и установить, в сроки, указанные в договоре, изготовленную
                Баню по адресу: {data.delivery ? data.delivery.address : ''}.
            </div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>2. ЦЕНА ДОГОВОРА, СРОКИ, ПОРЯДОК ОПЛАТЫ ТОВАРА</h3>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                2.1 Цена настоящего договора составляет {numberWithSpaces(finalPrice + getCustomAdditionsPrice(formValue))} рублей
                без НДС на основании п. 2 ст. 346.11 НК РФ.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                2.2 Доставка осуществляется продавцом, выгрузка входит в стоимость продукции.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                2.3 Цена Договора остается неизменной в течение всего срока действия данного Договора.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                2.4 Срок поставки Бани {renderDate(new Date(formValue.projectDate))}, по согласованию с заказчиком.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                2.5 Авансирование Продавцу подлежащей поставке Бане не предусматривается.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                2.6 Оплата поставляемой Бани, в рамках настоящего договора, осуществляется Покупателем путем
                передачи наличных денежных средств, представителю Продавца (водителю) по факту поставки Бани
                по приходно-кассовому ордеру с подписанием акта приема-передачи Бани.
            </div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>3. КАЧЕСТВО, КОМПЛЕКТНОСТЬ и ГАРАНТИЯ</h3>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3.1 Качество и комплектность поставляемой Бани определяется в соответствии со спецификацией
                (Приложение № 1 к настоящему Договору) к поставляемой бане.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3.2 В случае передачи поставляемой Бани с нарушением требования о комплектности и качеству
                Покупатель вправе требовать соразмерного уменьшения покупной цены либо доукомплектования в
                течение 10 рабочих дней с момента направления претензии письменно на электронный адрес
                info@brus-bany.ru.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3.3 На изделие дается гарантия сроком на 24 месяца: а именно, на протекание кровли, на целостность
                конструкции, на установку печи с дымоходными трубами типа сендвич труба, двухконтурными.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3.4 Гарантийные обязательства вступают в силу с момента полной оплаты договорной стоимости и
                подписании договора обеими сторонами, при условии соблюдения «Заказчиком» правил эксплуатации
                строения.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3.5 Гарантийные обязательства не распространяются на одноконтурные трубы серии эконом, на
                случай неравномерного оседания фундаментов при строительстве на торфяниках и заболоченной
                местности. На посинение, распирание - рассыхание вагонки, полов, бруса, при несоблюдении
                проветривания после окончания строительства, на протекание и внешний вид кровли, выполненной из
                рубероида, шифера, аналогов ондулина.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3.6 Древесина материал гигроскопичный, для минимизации процесса образования трещин, щелей в
                брусе, нужно покрыть защитным антисептиком 2-3 раза и выдержать условия сушки.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3.7 Гарантийные обязательства не распространяются на ущерб, нанесенный третьими лицами, либо
                Заказчиком, вследствие неправильной эксплуатации строения.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3.8 Гарантийные обязательства утрачивают силу, если Заказчик, в течение действия гарантийного
                срока изменяет конструкцию изделия.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3.9 Подгонка столярных изделий (окна, двери) осуществляется один раз при сдаче объекта.
                В дальнейшей эксплуатации «Подрядчик» не выезжает к «Заказчику» на данную операцию,
                так как древесина является материалом гигроскопичным. Рекомендуем столярные изделия покрыть защитным
                составом незамедлительно.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3.10 Гарантийные обязательства не распространяются на строительные материалы, приобретаемые
                заказчиком самостоятельно.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3.11 Гарантийные обязательства имеют силу при наличии у заказчика экземпляра данного договора.
            </div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>4. ПОРЯДОК ИЗГОТОВЛЕНИЯ И ПОСТАВКИ</h3>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                4.1 Продавец обязуется изготовить и доставить Покупателю баню, по указанному в приложение 1
                адресу. Доставка производится автотранспортом Продавца.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                4.2 Покупатель заранее осуществляет подготовку участка для установки бани, (Уборка мусора, снега,
                выравнивание участка, обеспечение подъездных путей к участку).
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                4.3 Установку бани на блоки производится водителем крана.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                4.4 Покупатель гарантирует возможность подъезда транспортного средства (автотранспорт общего
                назначения, не повышенной проходимости) Продавца непосредственно к месту разгрузки
                бани. Если дорога или местность не позволяет транспортному средству проехать (подъехать) к месту
                разгрузки или произвести необходимые маневры, то Баня, разгружаются в наиболее близком и
                удобном месте по согласованию с Покупателем.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                4.5 При необходимости Покупатель организовывает и оплачивает трактор (вездеход) для буксировки
                автотранспорта «Продавца» для выгрузки бани на место, и обратно до твердого покрытия дороги.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                4.6 При условии платного въезда автотранспорта на территорию садоводства, Покупатель
                дополнительно оплачивает расходы по въезду машин подрядчика.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                4.7 В случаях, когда невозможен подъезд автотехники Продавца к месту разгрузки изделия, состояние
                дорог, не позволяющее проехать и произвести машине необходимые маневры (определяет
                представитель Продавца), ограничения, наложенные ГИБДД, не позволяющие проехать к месту
                разгрузки бани, готовая баня возвращается назад с оплатой Покупателем транспортных расходов в
                соответствии с п. 2.2, по двойному тарифу.
            </div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>5. ПРИЕМКА ТОВАРА</h3>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                5.1 Приемка Бани по внешнему виду, качеству, количеству и комплектности производится
                Покупателем в присутствии представителя Продавца и оформляется двусторонним актом приема-
                передачи Бани (все акты согласуются подписями по почте или передаются с водителями).
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                5.2 Покупатель вправе предъявить претензии по качеству, количеству и комплектности Бани в
                течение всего гарантийного срока. Устранение неисправностей, замена, допоставка оборудования
                осуществляется Продавцом за свой счет в течение десяти календарных дней с момента обнаружения
                таковых.
            </div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>6. ИМУЩЕСТВЕННАЯ ОТВЕТСТВЕННОСТЬ СТОРОН</h3>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                6.1 При неисполнении или ненадлежащем исполнении обязательств, установленных настоящим
                Договором, виновная сторона обязана возместить другой стороне убытки в полном объеме в течение
                десяти календарных дней с момента получения претензии.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                6.2 За просрочку поставки или недопоставку Бани по вине Продавца, Продавец уплачивает
                Покупателю неустойку в размере 0,01% стоимости бани за каждый день просрочки или недопоставки.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                6.3 За нарушение договорных обязательств Покупателем по оплате или приемке, Покупатель
                выплачивает Продавцу пени в размере 0,01% суммы платежа за каждый день просрочки.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                6.4 Если поставленная Баня не соответствует по качеству, техническим условиям или условиям
                настоящего Договора, Стороны руководствуются положениями действующего законодательства и
                условиями настоящего Договора.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                6.5 Неустойки, предусмотренные настоящим Договором, начисляются в случае предъявления
                письменного требования об их уплате. Их выплата не освобождает стороны от исполнения
                обязательств по Договору.
            </div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>7. СРОК ДЕЙСТВИЯ ДОГОВОРА. ИЗМЕНЕНИЕ И РАСТОРЖЕНИЕ ДОГОВОРА</h3>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                7.1 Настоящий Договор вступает в силу с момента его подписания и согласования Сторонами и
                заканчивает свое действие после надлежащего выполнения Сторонами всех своих обязательств,
                вытекающих из Договора.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                7.2 Все изменения и дополнения к настоящему Договору выполняются в письменном виде и
                оформляются дополнительным соглашением, подписанным Сторонами.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                7.3 Любая договоренность между Сторонами, влекущая за собой новые обстоятельства, не
                предусмотренные настоящим договором, считается действительной, если она подтверждена
                Сторонами в письменной форме в виде дополнительного соглашения или протокола.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                7.4 Расторжение Договора возможно с соблюдением действующего законодательства.
            </div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>8. РАЗРЕШЕНИЕ СПОРОВ МЕЖДУ СТОРОНАМИ</h3>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                8.1 Спорные вопросы, возникающие в ходе исполнения настоящего договора, разрешаются
                Сторонами путем переговоров, а возникшие договоренности в обязательном порядке фиксируются
                дополнительным соглашением Сторон или протоколом, становящимися с момента их подписания
                неотъемлемой частью настоящего Договора.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                8.2 Если, по мнению одной из Сторон, не имеется возможность разрешения возникшего между
                сторонами спора в порядке настоящего Договора, то спор передается на разрешение Гражданского
                суда по месту нахождения истца в порядке, установленном законодательством РФ.
            </div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>9. ОСОБЫЕ УСЛОВИЯ</h3>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                9.1 Любое уведомление сторон по данному Договору отправляется в виде заказного письма с
                уведомлением о вручении по его адресу. Уведомление считается переданным на момент получения
                Отправителем уведомления о вручении письма Получателю.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                9.2 При выполнении настоящего Договора Стороны руководствуются законодательными и
                нормативными актами Российской Федерации.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                9.3 Все указанные в Договоре приложения являются его неотъемлемой частью.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                9.4 Настоящий Договор составлен на русском языке в двух экземплярах, имеющих равную
                юридическую силу, по одному для каждой из Сторон.
            </div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>10. ПРИЛОЖЕНИЯ К ДОГОВОРУ</h3>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                10.1 Приложение № 1 – Спецификация бани.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                10.2 Приложение № 2 – Акт приёма передачи
            </div>
            <br/><br/>
            <h3 style={{ textAlign: 'center' }}>11. ЮРИДИЧЕСКИЕ АДРЕСА И РЕКВИЗИТЫ СТОРОН</h3>
            <br/>
            <table>
                <tr>
                    <td style={{ width: '50%'}}><b>Продавец:</b> ООО «Русская Баня»</td>
                    <td style={{ width: '50%'}}><b>Покупатель:</b></td>
                </tr>
                <tr>
                    <td>
                        ИНН 5313015082, ОГРН 1185321002910, Р/С
                        40702810001090000294, К/С 30101810900000000746, В
                        ПАО УКБ «НОВОБАНК» г. Великий Новгород.
                        174510, Новгородская область, г. Пестово, ул.
                        Курганная 12 Тел. 8921 706-63-62, e-mail: info@brus-bany.ru
                        <br /><br />
                        _____________ Стариков Е.Б
                    </td>
                    <td>
                    </td>
                </tr>
            </table>
            <br/><br/>
            <b>Протокол согласования цены:</b>
            <br/><br/>
            {renderComplectation(project, data)}
            <br/>
            {categoryId.projectBlocks && categoryId.projectBlocks.length ? categoryId.projectBlocks.map(projectBlock => {
                return data.blocks && data.blocks[projectBlock._id] ? <>{renderProjectBlock(projectBlock, project, data)}<br/></> : null
            }) : null}
            {data.additions && project.categoryId.additions ? <>{renderAdditions(project, data, project.categoryId.additions)}<br/></> : null}
            {data.delivery && project.categoryId.deliveryData.delivery ? <>{renderDelivery(data)}<br/></> : null}
            {data.deliveryAdditions && project.categoryId.deliveryData.additions ? <>{renderDeliveryAdditions(project, data, project.categoryId.deliveryData.additions)}<br/></> : null}
            {formValue && formValue.additionalData && formValue.additionalData.length ? <>{renderCustomAdditions(formValue.additionalData)}<br/></> : null}
            {renderFinalPrice(finalPrice + getCustomAdditionsPrice(formValue))}
            <br/><br/>
            <div style={{ textAlign: 'end' }}>
                Приложение №1 к договору Купли-Продажи Бани №{formValue.documentNumber} от {renderDate(new Date(formValue.date))}
            </div>
            <br/><br/><br/>
            <b>Спецификация бани:</b>
            <br/><br/>
            {categoryId.newEquipment && categoryId.newEquipment.length ? categoryId.newEquipment.map(({ name, value }) => (
                <>
                    <b>{name}:</b>
                    <br/><br/>
                    {value ? value.map(({ name }) => (
                        <div style={{ textAlign: 'justify' }}>{name}</div>
                    )) : null}
                    <br/><br/>
                </>
            )) : null}
            <div style={{ textAlign: 'justify' }}>
                Допускается стыковка: брус по всему периметру стен бани, вагонка по каждой стене и потолку в отдельно взятом
                помещении, половой доски в каждой комнате.
            </div>
            <br/><br/>
            <div>Планировка бани:</div>
            <img src={schemeImage} style={{ width: '100%' }} />
            <br/><br/>
            <div style={{ textAlign: 'end' }}>
                Приложение №2 к Договору Купли – Продажи Бани №{formValue.documentNumber} от {renderDate(new Date(formValue.date))}
            </div>
            <br/><br/>
            <div style={{ textAlign: 'center' }}>АКТ приема - передачи</div>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                <span>___________________</span>
                <span>«____» ___________ 2020г.</span>
            </div>
            <br/><br/>
            <div style={{ textAlign: 'justify' }}>
                Мы нижеподписавшиеся, в лице Покупателя
                _________________________________________, с одной стороны, и в лице генерального
                директора, ООО «Русская Баня» Старикова Евгений Борисовича или его представителя
                _______________________________________________________, с другой стороны,
                удостоверяем, что работы согласно договору №{formValue.documentNumber} и приложений №1 и №2 к данному
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
            <div>Подпись продавца: _______________ Стариков Е.Б</div>
            <br/><br/>
            <div style={{ textAlign: 'end' }}>
                Приложение №3 к Договору Купли – Продажи Бани №{formValue.documentNumber} от {renderDate(new Date(formValue.date))}
            </div>
            <br/><br/>
            <b style={{ textAlign: 'center' }}>Правила эксплуатации бани</b>
            <br/><br/>
            <div style={{ textAlign: 'justify' }}>
                1. Вследствие использования в строительстве стенового материала атмосферной сушки, внутри
                построенного сооружения наблюдается повышенная влажность воздуха. Во избежание порчи
                отделочных материалов (половой доски, вагонки, столярных изделий) необходимо в течение
                одного сезона ( не считая зиму) после постройки сооружения обеспечить в нем необходимую
                естественную вентиляцию, для этого необходимо держать все двери и окна в открытом
                состоянии.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                2. Перед использованием бани по назначению, необходимо протопить печь, не менее двух раз,
                (будите внимательны, без воды в баке печь топить нельзя), для обеспечения выветривания
                составов, которыми обработана печь. После этого необходимо проветрить баню.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                3. После каждого использования бани необходимо обеспечивать сквозное проветривание:
                открывать окна, двери и отдушину для проветривания на 4-5 часов минимум.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                4. Для топки печи используйте сухие дрова или древесные топливные брикеты.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                5. При нахождении в парной необходимо соблюдать меры предосторожности, связанные с
                нагретыми поверхностями печи, дымохода и бака для нагрева воды.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                6. Не оставляйте детей без присмотра и не разрешайте им топить печь.
            </div>
            <br/>
            <div style={{ textAlign: 'justify' }}>
                7. Прочищайте и проверяйте на прогорание дымоход не реже 1-го раза в 3 месяца.
            </div>
            <br/><br/>
            <b style={{ textAlign: 'center' }}>Запрещено</b>
            <br/><br/>
            <div>
                1. Растапливать печь легковоспламеняющимися жидкостями (бензин, керосин и т. п.)
            </div>
            <br/>
            <div>
                2. Находиться в бане в состоянии алкогольного опьянения
            </div>
            <br/>
            <div>
                3. Оставлять без надзора горящую печь, а также поручать надзор малолетним детям
            </div>
            <br/>
            <div>
                4. Разогревать трубы дымохода печи до красного цвета
            </div>
            <br/>
            <div>
                5. Высыпать вблизи строений непогашенные угли или золу
            </div>
            <br/>
            <div>
                6. Применять не разрешенные к использованию виды топлива
            </div>
            <br/>
            <div>
                7. Применять дрова, длина которых превышает размер топки
            </div>
            <br/>
            <div>
                8. Топить печь с открытой дверцей
            </div>
            <br/>
            <div>
                9. Оставлять воду в баке после использования
            </div>
            <br/>
            <div>
                10. Сушить дрова, одежду и другие сгораемые предметы на печи или около нее
            </div>
            <br/>
            <div>
                11. Хранить в помещении дрова в количестве, превышающем потребность для разового
                использования бани
            </div>
            <br/>
            <div>
                12. Вносить изменения в конструкцию бани и её оборудование
            </div>
            <br/>
            <div>
                13. Топить банную печь без воды
            </div>
            <br/><br/>
            <div style={{ textAlign: 'justify' }}>
                Изготовитель предоставляет гарантию только при соблюдении условий эксплуатаций и правил ухода.
                Если вы нарушаете правила эксплуатации, мы не можем гарантировать сохранение эксплуатационных
                свойств бани из бруса, и не принимаем претензии по качеству.
            </div>
        </div>
    )
}

const format = [{
    _id: 'mode',
    title: 'Режим',
    type: 'select',
    items: [{
        id: 'dogovor',
        title: 'Договор'
    }, {
        id: 'cp',
        title: 'КП'
    }]
}, {
    _id: 'manager',
    title: 'Менеджер',
    type: 'select',
    items: [{
        id: '1',
        title: 'Марина'
    }, {
        id: '2',
        title: 'Константин'
    }, {
        id: '3',
        title: 'Юлия'
    }]
}, {
    _id: 'images',
    title: 'Изображения',
    type: 'array',
    format: [{
        _id: 'image',
        title: 'Изображение',
        type: 'image'
    }]
}, {
    _id: 'additionalData',
    title: 'Дополнения',
    itemTitleField: 'caption',
    type: 'array',
    format: [{
        _id: 'caption',
        title: 'Заголовок',
        type: 'string'
    }, {
        _id: 'price',
        title: 'Цена',
        type: 'integer number'
    }]
}, {
    _id: 'date',
    title: 'Дата создания договора',
    type: 'date'
}, {
    _id: 'projectDate',
    title: 'Дата поставки бани',
    type: 'date'
}, {
    _id: 'documentNumber',
    title: 'Номер договора',
    type: 'integer number'
}];

function CP({ CPData, images, data, project, infoBlock, finalPrice, onClose, onChange, showNotification, schemeImage }) {
    let containerRef = null;

    const formValue = {
        images: CPData && CPData.images || images,
        manager: CPData && CPData.manager || '1',
        additionalData: CPData && CPData.additionalData || [],
        date: CPData && CPData.date || Date.now(),
        projectDate: CPData && CPData.projectDate || Date.now(),
        documentNumber: CPData && CPData.documentNumber || 0,
        mode: CPData && CPData.mode || 'cp',
    };

    function print() {
        let prtCSS = '';
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(element => {
            prtCSS += element.outerHTML;
        });

        const WinPrint = window.open('','','left=50,    top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');

        WinPrint.document.write(prtCSS);
        WinPrint.document.write(containerRef.outerHTML);

        let linksCount = links.length;
        WinPrint.document.querySelectorAll('link').forEach(function (el) {
            el.onload = function () {
                if(!--linksCount){
                    WinPrint.document.close();
                    WinPrint.focus();
                    WinPrint.print();
                    // WinPrint.close();
                    // onSuccess();
                }
            };
        });
    }

    const renderPreview = () => {
        return (
            <div ref={ref => { containerRef = ref; }}>
                {formValue.mode ==='cp' ?
                    renderCP(project, formValue, data, infoBlock, finalPrice) :
                    renderDogovor(project, formValue, data, finalPrice, schemeImage)}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div>
                <div style={{ marginBottom: '32px' }}>
                    <Caption align='center'>Генерация КП</Caption>
                </div>
                <div style={{ margin: '0 48px' }}>
                    <Button type='yellow' caption='Печать' size='m' className={styles['print-button']} onClick={print} />
                    <Button type='red' caption='К проекту' size='m' className={styles['print-button']} onClick={onClose} />
                    <Button type='red' caption='Скопировать ссылку' size='m' className={styles['print-button']} onClick={() => {
                        navigator.clipboard.writeText(document.location.href)
                            .then(() => {
                                showNotification({ message: 'Ссылка скопирована', status: 'success' });
                            })
                            .catch(err => {
                                showNotification({ message: 'Скопируйте ссылку вручную', status: 'error' });
                            });
                    }} />
                </div>
                <div className={styles.form}>
                    <Form
                        format={format}
                        value={formValue}
                        errors={{}}
                        onChange={onChange} />
                </div>
            </div>
            <div className={styles['content-preview']}>
                {renderPreview()}
            </div>
        </div>
    );
}

export default memo(withNotification(CP));
