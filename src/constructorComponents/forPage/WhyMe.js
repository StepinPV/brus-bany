import React, { memo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Caption from '../components/Caption';
import Text from '../components/Text';
import ContainerComponent from './Container';

import caska from '../images/caska.svg';
import galka from '../images/galka.svg';
import money from '../images/money.svg';

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: stretch;
    ${props => css`
        max-width: ${props.theme['max-width']['m'].v};
    `}
    
    @media (max-width: 640px) {
        flex-direction: column;
    }
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    margin: 16px;
    width: 300px;
    max-width: 100%;
    padding: 16px;
    box-sizing: border-box;
`;

const Icon = styled.i`
    background-repeat: no-repeat;
    background-position: center;
    width: 100px;
    height: 100px;
`;

const items = [{
    icon: money,
    caption: 'Работаем без предоплаты',
    text: 'Оплата производится после успешной сдачи объекта. Более подробная информация в <a href="/usloviya-oplaty" style="color:#013885;font-weight:bold;text-decoration:none">условиях оплаты</a>'
}, {
    icon: caska,
    caption: 'Построили более 1000 объектов',
    text: 'Накопили достаточно опыта, чтобы построить объект любой сложности, <a href="/photos" style="color:#013885;font-weight:bold;text-decoration:none">убедитесь сами</a>'
}, {
    icon: galka,
    caption: 'Гарантия<br/>качества',
    text: 'Строим строго по <a href="/gosty-i-snipy" style="color:#013885;font-weight:bold;text-decoration:none">ГОСТу</a>. По договору обслуживаем постройку в течение 3-х лет'
}];

function WhyMe(props) {
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
                                <Caption
                                    containerStyles={css`padding-top: 16px;padding-bottom: 16px;`}
                                    align='center'
                                    size='s'
                                    __fieldsValue__={props.__fieldsValue__}>
                                    {item.caption}
                                </Caption>
                                <Text
                                    size='m'
                                    align='center'
                                    __fieldsValue__={props.__fieldsValue__}>
                                    {item.text}
                                </Text>
                            </Item>
                        </>
                    );
                })}
            </Container>
        </ContainerComponent>
    );
}

export default memo(WhyMe);
