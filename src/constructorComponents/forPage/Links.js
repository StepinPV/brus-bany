import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { applyFields } from '../helpers';
import ContainerComponent from './Container';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    ${props => css`
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width].v : ''};
    `}
`;

const Group = styled.div`
    margin: 0 32px 8px 0;
`;

const Name = styled.div`
    font-size: 14px;
`;

const Items = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Item = css`
    padding: 8px;
    margin: 4px 8px 4px 0;
    border-radius: 4px;
`;

const LinkItem = styled.a`
    ${Item}
    color: #000;
    background: #98c4e8;
    cursor: pointer;
`;

const FakeItem = styled.div`
    ${Item}
    color: #fff;
    background: #003159;
`;

function Links(props) {
    const location = useLocation();

    return (
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container styles={{ width: props.width }}>
                {
                    props.items.map(({ title, items }) => items && items.length ? (
                        <Group key={title}>
                            {title ? <Name>{applyFields(props.__fieldsValue__, title)}:</Name> : null}
                            <Items>
                                {
                                    items.map(({ title, link }) => {
                                        if (link === location.pathname) {
                                            return <FakeItem>{applyFields(props.__fieldsValue__, title)}</FakeItem>
                                        }

                                        return <LinkItem key={link} href={link}>{applyFields(props.__fieldsValue__, title)}</LinkItem>;
                                    })
                                }
                            </Items>
                        </Group>
                    ) : null)
                }
            </Container>
        </ContainerComponent>
    );
}

Links.propTypes = {
    items: PropTypes.array,
    width: PropTypes.oneOf(['s', 'm', 'l'])
};

Links.defaultProps = {
    width: 'm'
};

export default memo(Links);
