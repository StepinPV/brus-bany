import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SocialNetworks from '../components/SocialNetworks';
import styled from '@emotion/styled';
import { applyFields } from "@constructor-components/helpers";

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
    background-size: contain;
    display: block;
    width: 160px;
    height: 40px;
`;

function Footer(props) {
    const {
        columns,
        hasLinkToMain,
        __fieldsValue__,
        __images__,
        logo,
        socialNetworks,
        additional
    } = props;

    const logoWrapperProps = hasLinkToMain ? {
        href: '/',
        title: 'Перейти на главную'
    } : {
        as: 'div'
    }

    return (
        <Container>
            <Wrapper>
                <Column>
                    <LogoWrapper {...logoWrapperProps}>
                        <Logo style={{ backgroundImage: `url('${applyFields(__fieldsValue__, __images__[logo])}')` }} />
                    </LogoWrapper>
                    <SocialNetworks items={socialNetworks} paddingBottom='m' withoutMargins />
                    {additional ? <div dangerouslySetInnerHTML={{ __html: applyFields(__fieldsValue__, additional) }} /> : null}
                </Column>
                {columns.map(({ caption, items }) => {
                    return (
                        <Column as='nav' key={caption}>
                            <ItemsHeader>{caption.toUpperCase()}</ItemsHeader>
                            {items ? items.map(({ link, caption }) => {
                                const options = {
                                    key: caption,
                                    href: link
                                };

                                if (/^http/.test(link)) {
                                    options.target = '_blank';
                                    options.rel = 'noopener noreferrer';
                                }

                                return <ItemsItem {...options}>{caption}</ItemsItem>;
                            }) : null}
                        </Column>
                    );
                })}
            </Wrapper>
        </Container>
    );
}

Footer.propTypes = {
    columns: PropTypes.array,
    hasLinkToMain: PropTypes.bool
};

Footer.defaultProps = {
    columns: [],
    hasLinkToMain: true
};

export default memo(Footer);
