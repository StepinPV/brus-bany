import React, { memo, useEffect, useState } from 'react';
import Caption from '../components/Caption';
import Text from '../components/Text';
import Button from '../components/Button';
import SocialNetworks from '../components/SocialNetworks';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ContainerComponent from './Container';

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    max-width: 1168px;
    margin: 0 auto;
    @media (max-width: 600px) {
        flex-direction: column;
    }
    
`;

const Map = styled.div`
    flex-grow: 1;
    flex-basis: 50%;
    @media (max-width: 600px) {
        height: 300px;
    }
`;

const Info = styled.div`
    flex-grow: 1;
    flex-basis: 50%;
    padding: 0 16px;
    box-sizing: border-box;
    flex-shrink: 0;
`;

const AddressPhoneLayout = css`
    font-size: 22px;
`;

const Rekvizity = styled.a`
    margin: 0 16px;
`;

const Address = styled.div`
    ${AddressPhoneLayout}
    margin: 0 16px 16px;
`;

const PhoneEmailContainer = styled.div`
    margin: 0 16px;
`;

const PhoneTitle = styled.div`
    color: #919191;
    font-size: 18px;
`;

const PhoneEmail = css`
    display: block;
    text-decoration: none;
    color: #000;
`;

const Phone = styled.a`
    ${AddressPhoneLayout}
    ${PhoneEmail}
`;

const Email = styled.a`
    ${AddressPhoneLayout}
    ${PhoneEmail}
`;

const Time = styled.div`
    margin: 0 16px;
    font-size: 18px;
`;

function Contacts(props) {
    if (props.staticContext && props.staticContext.simplePage) {
        props.staticContext.simplePage = false;
    }

    const [renderMap, setRenderMap] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setRenderMap(true);
        }, 1000);
    }, []);

    return (
        <ContainerComponent
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container>
                <Map>
                    {renderMap ? (
                        <iframe title="Адресс офиса" src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=111422907145" width="100%" height="100%" frameBorder="0" />
                    ) : null }
                </Map>
                <Info>
                    <Caption
                        size='s'
                        align='left'
                        containerStyles={css`padding-bottom: 16px;margin: 0 16px;`}>
                        Брус бани
                    </Caption>
                    <Address>
                        <span>174510</span>, <span>Новгородская область</span>,
                        <br/>
                        <span>Пестово</span>, <span>Курганная, 12</span>
                    </Address>
                    <PhoneEmailContainer>
                        <PhoneTitle>Звонок по России бесплатный</PhoneTitle>
                        <Phone href="tel:88002010729">8 (800) 201-07-29</Phone>
                        <Email href="mailto:info@brus-bany.ru">info@brus-bany.ru</Email>
                    </PhoneEmailContainer>
                    <Text align='left' __fieldsValue__={props.__fieldsValue__} containerStyles={css`margin: 16px;`}>
                        Построим баню или дом любой сложности с нуля или привезем готовый объект!
                        Если вы не нашли на сайте проект интересующей вас бани, напишите или позвоните нам, мы с удовольствием вам поможем
                    </Text>
                    <Time>
                        <span style={{ fontWeight: 'bold' }}>Время работы: </span>
                        <span>c 8:00 до 22:00 без выходных</span>
                    </Time>
                    <Button
                        href='#requestForm'
                        color='{ "type": "base", "value": "white" }'
                        background='{ "type": "base", "value": "red" }'
                        containerStyles={css`margin: 16px;`}
                        caption='Обсудить проект бани'
                        __fieldsValue__={props.__fieldsValue__} />
                    <SocialNetworks paddingBottom='m' />
                    <Rekvizity href='/rekvizity'>Реквизиты компании</Rekvizity>
                </Info>
            </Container>
        </ContainerComponent>
    );
}

export default memo(Contacts);
