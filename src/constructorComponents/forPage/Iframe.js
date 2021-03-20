import React, { memo } from 'react';
import PropTypes from "prop-types";
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { applyFields } from '../helpers';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding-left: 16px;
    padding-right: 16px;
    ${props => css`
        height: ${props.styles.height ? (props.styles.height + 'px') : ''};
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width].v : ''};
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
    `}
`;

const IframeElement = styled.iframe`
    width: 100%;
    height: 100%;
`;

function Iframe(props) {
    return (
        <Container
            {...(props.id ? { id: props.id } : {})}
            styles={{
                height: props.height,
                width: props.width,
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop
            }}>
            <IframeElement
                title={applyFields(props.__fieldsValue__, props.title)}
                src={applyFields(props.__fieldsValue__, props.link)}
                frameBorder='0'
                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
            />
        </Container>
    );
}

Iframe.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string,
    height: PropTypes.number,
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    width: PropTypes.oneOf(['s', 'm', 'l']),
    id: PropTypes.string
};

Iframe.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm',
    width: 'm'
};

export default memo(Iframe);
