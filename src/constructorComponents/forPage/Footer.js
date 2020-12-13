import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { SocialNetworks } from '../index';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import logo from '../logo.svg';

const Container = styled.footer`
    background-color: #111111;
    padding-top: 45px;
    width: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 1200px;
    margin: 0 auto;
`;

const Column = styled.div`
    margin: 0 16px 32px;
    flex-basis: 200px;
    flex-shrink: 0;
    @media (max-width: 768px) and (min-width: 340px) {
        flex-basis: 128px;
    }
`;

const LogoWrapper = styled.a`
    margin-bottom: 24px;
    display: block;
`;

const InfoBlock = styled.div`
    margin-bottom: 16px;
`;

const Phone = styled.a`
    font-size: 16px;
    line-height: 24px;
    text-decoration: none;
    color: #fff;
`;

const DefaultSize = css`
    font-size: 12px;
    line-height: 16px;
`;

const Email = styled.a`
    color: #e08a72;
    text-decoration: none;
    ${DefaultSize}
`;

const Time = styled.time`
    ${DefaultSize}
    color: #fff;
`;

const DefaultSizeWhite = styled.div`
    ${DefaultSize}
    color: #fff;
`;

const DefaultSizeGrey = styled.div`
    ${DefaultSize}
    color: #7d7c7c;
`;

const ItemsHeader = styled.div`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
`;

const ItemsItem = styled.a`
    color: #fff;
    font-size: 14px;
    margin-bottom: 16px;
    display: block;
    text-decoration: none;
`;

const Logo = styled.i`
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    width: 160px;
    height: 40px;
`;

function Footer(props) {
    const { columns } = props;

    return (
        <Container>
            <Wrapper>
                <Column itemScope itemType='http://schema.org/HomeAndConstructionBusiness'>
                    <meta itemProp="name" content="Брус бани" />
                    <LogoWrapper href='/' title='Перейти на главную'>
                        <Logo style={{ backgroundImage: `url('${logo}')` }} />
                    </LogoWrapper>
                    <SocialNetworks paddingBottom='m' withoutMargins />
                    <InfoBlock>
                        <Phone href="tel:88002010729" itemProp="telephone">8 (800) 201-07-29</Phone>
                        <DefaultSizeWhite>Звонок по России бесплатный</DefaultSizeWhite>
                        <Email href="mailto:info@brus-bany.ru" itemProp="email">info@brus-bany.ru</Email>
                    </InfoBlock>
                    <InfoBlock>
                        <Time
                            itemProp="openingHours"
                            dateTime="Mo-Su 8:00−22:00">Время работы:<br />c 8:00 до 22:00 без выходных
                        </Time>
                    </InfoBlock>
                    <InfoBlock>
                        <DefaultSizeGrey>© «Брус бани» 2010-2020</DefaultSizeGrey>
                        <DefaultSizeGrey>Строительство бань под ключ</DefaultSizeGrey>
                    </InfoBlock>
                    <InfoBlock>
                        <DefaultSizeGrey>ОГРН 1185321002910</DefaultSizeGrey>
                        <DefaultSizeGrey>ИНН 5313015082</DefaultSizeGrey>
                    </InfoBlock>
                    <InfoBlock>
                        <DefaultSizeGrey itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                            <span itemProp="postalCode">174510</span>, <span itemProp="addressRegion">Новгородская область</span>,
                            <br />
                            <span itemProp="addressLocality">Пестово</span>, <span itemProp="streetAddress">Курганная, 12</span>
                        </DefaultSizeGrey>
                    </InfoBlock>
                </Column>
                {columns.map(({ caption, items }) => {
                    return (
                        <Column as='nav' key={caption}>
                            <ItemsHeader>{caption.toUpperCase()}</ItemsHeader>
                            {items ? items.map(({ link, caption }) => (
                                <ItemsItem key={caption} href={link}>{caption}</ItemsItem>
                            )) : null}
                        </Column>
                    );
                })}
            </Wrapper>
        </Container>
    );
}

Footer.propTypes = {
    columns: PropTypes.array
};

Footer.defaultProps = {
    columns: []
};

export default memo(Footer);
