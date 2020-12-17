import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, Caption, SocialNetworks } from '../index';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    max-width: 1168px;
    margin: 0 auto;
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
    `}
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
        <Container
            itemScope
            itemType='http://schema.org/HomeAndConstructionBusiness'
            styles={{
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop
            }}>
            <Map>
                {renderMap ? (
                    <iframe title="Адресс офиса" src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=111422907145" width="100%" height="100%" frameBorder="0" />
                ) : null }
            </Map>
            <Info>
                <meta itemProp="name" content="Брус бани" />
                <Caption size='s' align='left' paddingTop='none' paddingBottom='s'>Брус бани</Caption>
                <Address itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                    <span itemProp="postalCode">174510</span>, <span itemProp="addressRegion">Новгородская область</span>,
                    <br/>
                    <span itemProp="addressLocality">Пестово</span>, <span itemProp="streetAddress">Курганная, 12</span>
                </Address>
                <PhoneEmailContainer>
                    <PhoneTitle>Звонок по России бесплатный</PhoneTitle>
                    <Phone href="tel:88002010729" itemProp="telephone">8 (800) 201-07-29</Phone>
                    <Email href="mailto:info@brus-bany.ru" itemProp="email">info@brus-bany.ru</Email>
                </PhoneEmailContainer>
                <Text align='left'>
                    Построим баню или дом любой сложности с нуля или привезем готовый объект!
                    Если вы не нашли на сайте проект интересующей вас бани, напишите или позвоните нам, мы с удовольствием вам поможем
                </Text>
                <Time>
                    <span style={{ fontWeight: 'bold' }}>Время работы: </span>
                    <time itemProp="openingHours" dateTime="Mo-Su 8:00−22:00">c 8:00 до 22:00 без выходных</time>
                </Time>
                <Button
                    align='left'
                    href='#requestForm'
                    color='{ "type": "base", "value": "white" }'
                    background='{ "type": "base", "value": "red" }'
                    caption='Обсудить проект бани' />
                <SocialNetworks paddingBottom='m' />
                <Rekvizity href='/rekvizity'>Реквизиты компании</Rekvizity>
            </Info>
        </Container>
    );
}

Contacts.propTypes = {
    background: PropTypes.oneOf(['white', 'grey']),
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l'])
};

Contacts.defaultProps = {
    background: 'grey',
    paddingTop: 'm',
    paddingBottom: 'm'
};

export default memo(Contacts);
