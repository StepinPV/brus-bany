import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../index';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import logo from '../images/logo.svg';

const HeaderElement = styled.header`
    width: 100%;
    position: relative;
`;

const FixedHeader = styled.header`
    height: 80px;
`;

const Container = styled.div`
    height: 80px;
    background: #91001d;
    transition: background-color 300ms ease-in-out;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    @media (max-width: 600px) {
        padding: 0 24px;
    }
    ${props => css`
        ${props.styles.opacity || props.styles.fixed ? `
            z-index: 2;
            left: 0;
            right: 0;
            top: 0;
        ` : null}
        
        ${props.styles.opacity && !props.styles.fixed ? `
            background: rgba(145, 0, 29, 0);
            position: absolute;
        ` : null}
        
        ${props.styles.fixed ? `
            position: fixed;
        ` : null}
    `}
`;

const LogoWrapper = styled.a`
    max-width: 40%;
    margin: 0 16px;
`;

const Logo = styled.i`
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    width: 200px;
    height: 50px;
    max-width: 100%;
    object-fit: contain;
    @media (max-width: 600px) {
        width: 160px;
        height: 40px;
    }
`;

const Items = styled.nav`
    display: flex;
    @media (max-width: 1024px) {
        display: none;
    }
`;

const Item = styled.a`
    font-weight: bold;
    color: #fff;
    font-size: 16px;
    margin: 0 15px;
    text-decoration: none;
    &:hover {
        color: #ffe100;
    }
`;

const Info = styled.div`
    display: flex;
    align-items: center;
`;

const PhoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: right;
    margin-right: 16px;
    flex-shrink: 0;
    @media (max-width: 1024px) {
        display: none;
    }
`;

const Phone = styled.a`
    font-size: 20px;
    color: #fff;
    text-decoration: none;
    display: block;
`;

const Email = styled.a`
    font-size: 14px;
    color: #fff;
    text-decoration: none;
    display: block;
`;

function Header(props) {
    const { opacity, items, phone, email, button, fixed, hasLinkToMain } = props;

    const logoWrapperProps = hasLinkToMain ? {
        href: '/',
        title: 'Перейти на главную'
    } : {
        as: 'div'
    }

    return (
        <HeaderElement>
            { fixed ? (
                <FixedHeader />
            ) : null}
            <Container styles={{ opacity, fixed }}>
                <LogoWrapper {...logoWrapperProps}>
                    <Logo style={{ backgroundImage: `url('${logo}')` }} />
                </LogoWrapper>
                <Items>
                    {items.map(item => (
                        <Item key={item.caption} href={item.link}>{item.caption}</Item>
                    ))}
                </Items>
                <Info>
                    <PhoneContainer>
                        <Phone
                            href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                            dangerouslySetInnerHTML={{ __html: phone.replace(/(\d)(\d\d\d)(\d\d\d)(\d\d)(\d\d)/, '$1&nbsp;($2)&nbsp;$3-$4-$5') }} />
                        <Email href={`mailto:${email}`}>{email}</Email>
                    </PhoneContainer>
                    {button ? (
                        <Button
                            color='{ "type": "base", "value": "black" }'
                            background='{ "type": "base", "value": "yellow" }'
                            caption={button.caption}
                            size='s'
                            href={button.link}
                            paddingBottom='none'
                            paddingTop='none' />
                    ) : null}
                </Info>
            </Container>
        </HeaderElement>
    );
}

Header.propTypes = {
    items: PropTypes.array,
    phone: PropTypes.string,
    email: PropTypes.string,
    button: PropTypes.object,
    opacity: PropTypes.bool,
    hasLinkToMain: PropTypes.bool
};

Header.defaultProps = {
    items: [],
    phone: '',
    email: '',
    button: null,
    opacity: false,
    fixed: false,
    hasLinkToMain: false
};

export default memo(Header);
