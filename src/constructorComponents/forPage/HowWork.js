import React, { memo } from 'react';
import styled from '@emotion/styled';
import Text from '../components/Text';
import ContainerComponent from './Container';
import { applyFields } from "@constructor-components/helpers";

import arrow from '../images/arrow.svg';
import { css } from "@emotion/react";
import Caption from "@constructor-components/components/Caption";

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
                {props.items ? props.items.map((item, index) => {
                    return (
                        <>
                            <Item>
                                {item.icon ? <Icon style={{ backgroundImage: `url('${applyFields(props.__fieldsValue__, props.__images__[item.icon])}')` }} /> : null}
                                {item.caption ? (
                                    <Caption
                                        containerStyles={css`padding-top: 16px;`}
                                        align='center'
                                        size='s'
                                        children={item.caption}
                                        __fieldsValue__={props.__fieldsValue__} />
                                ) : null}
                                {item.text ? (
                                    <Text
                                        containerStyles={css`padding-top: 16px;`}
                                        align='center'
                                        children={item.text}
                                        __fieldsValue__={props.__fieldsValue__} />
                                ) : null}
                            </Item>
                            {props.hasArrows && props.items && index !== props.items.length - 1 ? (
                                <ArrowIcon />
                            ) : null}
                        </>
                    );
                }) : null}
            </Container>
        </ContainerComponent>
    );
}

export default memo(HowWork);
