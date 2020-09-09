import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;

    padding: 16px;
    
    ${props => css`
        max-width: ${props.styles.width ? { s: '728px', m: '1200px', l: '100%' }[props.styles.width] : ''};
    `}
`;

const DesktopElement = css`
    @media (max-width: 640px) {
        display: none;
    }
`;

const MobileElement = css`
    @media (min-width: 641px) {
        display: none;
    }
`;

const Item = styled.span`
    ${props => css`
        ${props.mobileElement ? MobileElement : ''}
        ${props.desktopElement ? DesktopElement : ''}
    `}
    color: #707070;
`;

const Arrow = styled.span`
    ${props => css`
        ${props.mobileElement ? MobileElement : ''}
        ${props.desktopElement ? DesktopElement : ''}
    `}
    color: #707070;
    
    @media (min-width: 641px) {
        margin: 0 8px;
    }
    
    @media (max-width: 640px) {
        margin-right: 8px;
    }
`;

const LinkItem = styled.a`
    color: #91001c;
    text-decoration: none;
    ${props => css`
        ${props.mobileElement ? MobileElement : ''}
        ${props.desktopElement ? DesktopElement : ''}
    `}
`;

const Breadcrumbs = (props) => {
    return (
        <Container styles={{ width: props.width }} itemScope itemType="http://schema.org/BreadcrumbList">
            {props.items.map(({ title, link }, index) => {
                const mobileItem = index === props.items.length - 2;

                return (
                    <Fragment key={title}>
                        { index !== 0 ? <Arrow desktopElement>/</Arrow> : null }
                        { link && index !== props.items.length - 1 ? (
                            <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <LinkItem href={link} desktopElement={!mobileItem} itemProp="item">
                                {mobileItem ? <Arrow mobileElement>←</Arrow> : null}
                                <span itemProp="name">{title}</span>
                            </LinkItem>
                            <meta itemProp="position" content={index + 1} />
                        </span>
                        ) : <Item desktopElement>{title}</Item> }
                    </Fragment>
                );
            })}
        </Container>
    )
};

Breadcrumbs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.required,
            link: PropTypes.string
        })
    ),
    width: PropTypes.oneOf(['s', 'm', 'l']),
};

Breadcrumbs.defaultProps = {
    width: 'm'
};

export default memo(Breadcrumbs);
