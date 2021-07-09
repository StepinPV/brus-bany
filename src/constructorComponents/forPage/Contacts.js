import React, { memo, useEffect, useState } from 'react';
import Button from '../components/Button';
import SocialNetworks from '../components/SocialNetworks';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ContainerComponent from './Container';
import { applyFields } from "@constructor-components/helpers";

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
                    {renderMap && props.map ? (
                        <iframe title={props.map} src={props.link} width="100%" height="100%" frameBorder="0" />
                    ) : null }
                </Map>
                <Info>
                    {props.info ? <div dangerouslySetInnerHTML={{ __html: applyFields(props.__fieldsValue__, props.info) }} /> : null}
                    {props.button ? (
                        <Button
                            color={props.button.color}
                            background={props.button.background}
                            caption={props.button.caption}
                            containerStyles={css`margin: 16px;`}
                            href={props.button.link}
                            __fieldsValue__={props.__fieldsValue__} />
                    ) : null}
                    <SocialNetworks items={props.socialNetworks} paddingBottom='m' />
                </Info>
            </Container>
        </ContainerComponent>
    );
}

export default memo(Contacts);
