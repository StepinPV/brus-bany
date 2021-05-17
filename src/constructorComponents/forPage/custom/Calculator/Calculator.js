import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import Additions, { getAdditionsPrice } from './resources/Additions';
import DeliveryMap from './resources/DeliveryMap';
import ProjectBlock from './resources/ProjectBlock';
import Equipment, { getEquipmentFinalPrice } from './resources/Equipment';
import withForm from '@plugins/Form/withForm';
import numberWithSpaces from '@utils/numberWithSpaces';
import filterObject from '@utils/filterObject';
import Caption from '../../../components/Caption';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import { applyFields } from '../../../helpers';
import styles from './Calculator.module.css';
import { css } from '@emotion/core';

function parseQuery(uri) {
    const [, params] = uri.split('?');

    return decodeURIComponent(params).split('&').reduce((acc, item) => {
        const [key, value] = item.split('=');
        acc[key] = value;
        return acc;
    }, {});
}

const CP = loadable(() => import('./resources/CP'));

class Calculator extends PureComponent {
    static propTypes = {
        match: PropTypes.object,
        history: PropTypes.object,
        showForm: PropTypes.func,
        baseEquipment: PropTypes.array,
        deliveryData: PropTypes.object,
        additions: PropTypes.array,
        projectBlocks: PropTypes.array,
        complectationBlocks: PropTypes.object,
        cpSettings: PropTypes.object
    };

    constructor(props) {
        super(props);

        if (props.staticContext && props.staticContext.simplePage) {
            props.staticContext.simplePage = false;
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let newState = {};

        if (nextProps.location.search !== prevState.search) {
            let query;
            let data = {};
            let CPData = null;

            try {
                query = nextProps.location.search ? parseQuery(nextProps.location.search) : null;
            } catch(err) {}

            try {
                data = query && query.data ? JSON.parse(query.data) : {};
            } catch(err) {}

            try {
                CPData = query && query.CPData ? JSON.parse(query.CPData) : null;
            } catch(err) {}

            newState = {
                ...newState,
                search: nextProps.location.search,
                data,
                CPMode: query ? (query.CPMode || false) : null,
                CPData
            }
        }

        return newState;
    }

    state = {
        data: {},
        CPMode: false
    };

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            if(e.keyCode === 49 && e.shiftKey) {
                e.preventDefault();
                e.stopPropagation();
                this.historyPush({ CPMode: !this.state.CPMode });
            }
        });
    }

    render = () => {
        const { CPMode } = this.state;

        if (CPMode) {
            return this.renderCP();
        }

        return (
            <>
                <div className={styles['page-info']}>
                    <div className={styles['page-info-icon']}>!</div>
                    <div className={styles['page-info-text-container']}>
                        <div className={styles['page-info-text']}>
                            Далее вы можете самостоятельно рассчитать итоговую стоимость проекта, выбрав комплектацию, дополнения и адрес доставки
                        </div>
                    </div>
                </div>
                {this.renderComplectationBlock()}
                {this.renderProjectBlocks()}
                {this.renderEquipment()}
                {this.renderDelivery()}
                {this.renderAdditions()}
                {this.renderFinalPrice()}
            </>
        );
    };

    renderComplectationBlock = () => {
        const { complectationBlocks, __fieldsValue__, __images__ } = this.props;
        const { data } = this.state;

        return complectationBlocks ? (
            <div className={styles.block}>
                {complectationBlocks.name ? <Caption tag='h2' align='center' containerStyles={css`padding: 0 16px 32px`}>{complectationBlocks.name}</Caption> : null}
                {complectationBlocks.description ? <Text align='center' containerStyles={css`padding: 0 16px 32px; margin: 0 auto; max-width: 1200px;`}>{complectationBlocks.description}</Text> : null}
                <ProjectBlock
                    {...complectationBlocks}
                    __fieldsValue__={__fieldsValue__}
                    __images__={__images__}
                    required
                    customEval={this.eval}
                    selectedId={data.complectation || complectationBlocks.defaultItemId}
                    onChange={value => {
                        this.setData({ ...data, complectation: value === complectationBlocks.defaultItemId ? null : value })
                    }} />
            </div>
        ) : null;
    };
    renderProjectBlocks = () => {
        const { projectBlocks, __fieldsValue__, __images__ } = this.props;
        const { data: { blocks={} } } = this.state;

        return projectBlocks && projectBlocks.length ? projectBlocks.map(projectBlock => (
            <div className={styles.block} key={projectBlock.id}>
                {projectBlock.name ? <Caption tag='h2' align='center' containerStyles={css`padding: 0 16px 32px`}>{projectBlock.name}</Caption> : null}
                {projectBlock.description ? <Text align='center' containerStyles={css`padding: 0 16px 32px; margin: 0 auto; max-width: 1200px;`}>{projectBlock.description}</Text> : null}
                <ProjectBlock
                    {...projectBlock}
                    __fieldsValue__={__fieldsValue__}
                    __images__={__images__}
                    selectedId={blocks[projectBlock.id]}
                    customEval={this.eval}
                    onChange={value => {
                        const newProjectValues = {
                            ...blocks,
                            [projectBlock.id]: value
                        };

                        this.setData({
                            ...this.state.data,
                            blocks: Object.keys(newProjectValues).reduce((calc, key) => {
                                if (newProjectValues[key]) {
                                    calc = calc || {};
                                    calc[key] = newProjectValues[key];
                                }
                                return calc;
                            }, undefined)
                        })
                    }} />
            </div>
        )) : null;
    };
    renderEquipment = () => {
        const { baseEquipment } = this.props;
        const { data } = this.state;

        return baseEquipment && baseEquipment.length ? (
            <div className={styles.block}>
                <Caption tag='h2' align='center' containerStyles={css`padding: 0 16px 32px`}>Соберите комплектацию</Caption>
                <Equipment
                    value={data.equipment}
                    customEval={this.eval}
                    equipment={baseEquipment}
                    onChange={(equipment) => {
                        this.setData({ ...data, equipment });
                    }} />
            </div>
        ) : null;
    }
    renderDelivery = () => {
        const { data: { delivery } } = this.state;
        const { deliveryData } = this.props;

        const handleDelivery = (value) => {
            let delivery;

            if (value) {
                delivery = {
                    length: value.length,
                    address: value.address,
                    price: this.eval(deliveryData ? deliveryData.delivery : 0, {
                        delLength: value.length
                    })
                }
            }

            this.setData({ ...this.state.data, delivery });
        };

        return deliveryData && deliveryData.delivery ? (
            <div className={styles.delivery}>
                <DeliveryMap
                    defaultAddress={delivery ? delivery.address : ''}
                    onChange={handleDelivery}
                    content={delivery ? (
                        <>
                            <div>{`Расстояние: ${delivery.length} км`}</div>
                            <div>{`Стоимость доставки: ${numberWithSpaces(delivery.price)} руб`}</div>
                        </>
                    ) : null} />
            </div>
        ) : null;
    };
    renderAdditions = () => {
        const { additions } = this.props;
        const { data } = this.state;

        return additions && additions.length ? (
            <div className={styles.block}>
                <Caption tag='h2' align='center' containerStyles={css`padding: 0 16px 32px`}>Выберите дополнения</Caption>
                <Additions
                    data={data}
                    additions={additions}
                    customEval={this.eval}
                    value={data.add || {}}
                    onChange={(add) => {
                        this.setData({ ...data, add });
                    }} />
            </div>
        ) : null;
    }

    renderFinalPrice = () => {
        const { showForm, match } = this.props;
        const finalPrice = this.getFinalPrice();

        return (
            <>
                <div className={styles['final-price-block-static']}>
                    <div className={styles['final-price-block-static-title']}>Итоговая стоимость:</div>
                    <div className={styles['final-price-block-static-price']}>{`${numberWithSpaces(finalPrice)} рублей`}</div>
                    <Button
                        onClick={() => { showForm({ source: match.url, title: 'Оформление заявки' }) }}
                        caption='Оформить заявку'
                        size='m'
                        color='{ "type": "base", "value": "black" }'
                        background='{ "type": "base", "value": "yellow" }' />
                </div>
                <div className={styles['final-price-block']}>
                    <div className={styles['final-price-block-content']}>
                        <div className={styles['final-price-block-title']}><span className={styles['final-price-block-title-desktop']}>Итоговая стоимость: </span><span className={styles['final-price-block-title-mobile']}>Итого: </span>{numberWithSpaces(finalPrice)} руб</div>
                        <Button
                            onClick={() => { showForm({ source: match.url, title: 'Оформление заявки' }) }}
                            caption='Оформить заявку'
                            size='s'
                            color='{ "type": "base", "value": "black" }'
                            background='{ "type": "base", "value": "yellow" }' />
                    </div>
                </div>
            </>
        )
    };

    renderCP = () => {
        const {
            baseEquipment,
            deliveryData,
            additions,
            projectBlocks,
            complectationBlocks,
            cpSettings,
            __fieldsValue__,
            __images__
            } = this.props;

        return (
            <CP
                onClose={() => { this.historyPush({ CPMode: false }) }}
                onChange={(data) => { this.historyPush({ CPData: data }) }}
                CPData={this.state.CPData}
                data={this.state.data}
                blocks={{ baseEquipment, deliveryData, additions, projectBlocks, complectationBlocks }}
                cpSettings={cpSettings || {}}
                customEval={this.eval}
                finalPrice={this.getFinalPrice()}
                __fieldsValue__={__fieldsValue__}
                __images__={__images__} />
        );
    }

    getFinalPrice = () => {
        const { projectBlocks, complectationBlocks, baseEquipment, additions } = this.props;
        const { data } = this.state;

        let finalPrice = 0;

        if (projectBlocks && data.blocks) {
            projectBlocks.forEach(block => {
                const selectedItemId = data.blocks[block.id];

                if (selectedItemId) {
                    const selectedItem = block.items.find(item => item.id === selectedItemId);

                    if (selectedItem) {
                        try {
                            finalPrice += parseInt(this.eval(selectedItem.price));
                        } catch(e) {}
                    }
                }
            });
        }

        if (complectationBlocks && complectationBlocks.items) {
            const selectedComplectation = complectationBlocks.items.find(block => block.id === (data.complectation || complectationBlocks.defaultItemId));
            if (selectedComplectation) {
                try {
                    finalPrice += parseInt(this.eval(selectedComplectation.price));
                } catch(e) {}
            }
        }

        if (data.equipment) {
            finalPrice += getEquipmentFinalPrice(this.eval, baseEquipment, data.equipment);
        }

        if (data.add) {
            finalPrice += getAdditionsPrice(this.eval, additions, data.add);
        }

        if (data.delivery && data.delivery.price) finalPrice += data.delivery.price;

        finalPrice = Math.round(finalPrice / 100) * 100;

        return finalPrice;
    };

    historyPush = ({ data=this.state.data, CPMode=this.state.CPMode, CPData=this.state.CPData }) => {
        const { history, location } = this.props;

        const filteredData = filterObject(data);
        const filteredCPData = filterObject(CPData);

        const params = filterObject({
            data: filteredData ? JSON.stringify(filteredData) : null,
            CPMode: CPMode || null,
            CPData: filteredCPData ? JSON.stringify(filteredCPData) : null
        });

        const query = Object.keys(params || {}).reduce((str, key) => {
            str = str || '?';
            str += `${key}=${encodeURI(params[key])}&`;
            return str;
        }, '');

        history.push(`${location.pathname}${query}`);
    };

    setData = (data) => {
        this.historyPush({ data });
    };

    eval = (str, vars) => {
        const { __fieldsValue__ } = this.props;
        let { data } = this.state;
        data = data || {}

        const res = applyFields(__fieldsValue__, str);
        return eval(res);
    }
}

export default withForm(withRouter(Calculator));
