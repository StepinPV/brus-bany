import React, { memo } from 'react';
import styled from '@emotion/styled';
import Text from '../components/Text';
import ContainerComponent from './Container';

import call from '../images/call.svg';
import calc from '../images/calc.svg';
import dogovor from '../images/dogovor.svg';
import arrow from '../images/arrow.svg';
import {css} from "@emotion/react";

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
   
    @media (max-width: 640px) {
        flex-direction: column;
    }
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px;
    width: 300px;
    max-width: 100%;
    padding: 16px;
    box-sizing: border-box;
`;

const Icon = styled.i`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100px;
    height: 100px;
`;

const ArrowIcon = styled.i`
    background-image: url('${arrow}');
    background-repeat: no-repeat;
    background-position: center;
    width: 60px;
    height: 30px;
    flex-shrink: 0;
    
    @media (max-width: 640px) {
        transform: rotate(90deg);
    }
`;

const items = [{
    icon: call,
    text: 'Позвоните нам<br><a href="tel:88002010729" style="color:#91001d;text-decoration:none;font-weight:bold">8&nbsp;(800)&nbsp;201-07-29</a><br>или <a href="#requestForm" style="color:#013885;font-weight:bold;cursor:pointer">оставьте заявку</a>'
}, {
    icon: calc,
    text: 'Подберем оптимальный вариант бани, рассчитаем стоимость и пришлем подробную смету'
}, {
    icon: dogovor,
    text: '<a href="/documents/dogovor.docx" download="" style="color:#013885;text-decoration:none;font-weight:bold;cursor:pointer">Заключим договор</a>, приступим к строительству бани или привезем уже готовую'
}];

function HowWork(props) {
    return (
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container>
                {items.map((item, index) => {
                    return (
                        <>
                            <Item>
                                <Icon style={{ backgroundImage: `url('${item.icon}')` }} />
                                <Text
                                    containerStyles={css`padding-top: 16px;`}
                                    align='center'
                                    __fieldsValue__={props.__fieldsValue__}>
                                    {item.text}
                                </Text>
                            </Item>
                            {index !== items.length - 1 ? (
                                <ArrowIcon />
                            ) : null}
                        </>
                    );
                })}
            </Container>
        </ContainerComponent>
    );
}

export default memo(HowWork);
