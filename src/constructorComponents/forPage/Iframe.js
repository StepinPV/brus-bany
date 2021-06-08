import React, { memo } from 'react';
import PropTypes from "prop-types";
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { applyFields } from '../helpers';
import ContainerComponent from './Container';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    ${props => css`
        height: ${props.styles.height ? (props.styles.height + 'px') : ''};
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width].v : ''};
    `}
`;

const IframeElement = styled.iframe`
    width: 100%;
    height: 100%;
`;

function Iframe(props) {
    return (
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container
                styles={{
                    height: props.height,
                    width: props.width
                }}>
                <IframeElement
                    title={applyFields(props.__fieldsValue__, props.title)}
                    src={applyFields(props.__fieldsValue__, props.link)}
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                />
            </Container>
        </ContainerComponent>
    );
}

Iframe.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.oneOf(['s', 'm', 'l'])
};

Iframe.defaultProps = {
    width: 'm'
};

export default memo(Iframe);
