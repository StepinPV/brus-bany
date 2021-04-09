import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ButtonComponent from '../components/Button';
import ContainerComponent from './Container';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    margin: 0 auto;
    
    ${props => css`
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width].v : ''};
        justify-content: ${{ left: 'flex-start', center: 'center', right: 'flex-end' }[props.styles.align]};
    `}
`;

function button(props) {
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
                    width: props.containerWidth,
                    align: props.align
                }}>
                <ButtonComponent
                    download={props.download}
                    href={props.href}
                    targetBlank={props.targetBlank}
                    noOpener={props.noOpener}
                    caption={props.caption}
                    as={props.type}
                    size={props.size}
                    background={props.background}
                    color={props.color}
                    fullWidth={props.fullWidth}
                    __fieldsValue__={props.__fieldsValue__}
                />
            </Container>
        </ContainerComponent>
    );
}

button.propTypes = {
    size: PropTypes.oneOf(['s', 'm']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    containerWidth: PropTypes.oneOf(['s', 'm', 'l']),
    fullWidth: PropTypes.bool,
    download: PropTypes.bool,
    noOpener: PropTypes.bool,
    targetBlank: PropTypes.bool,
    caption: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.oneOf(['a', 'button']).isRequired
};

button.defaultProps = {
    size: 'm',
    align: 'center',
    containerWidth: 'm',
    fullWidth: false,
    download: false,
    targetBlank: false,
    noOpener: false,
    type: 'a'
};

export default memo(button);
