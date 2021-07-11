import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Caption from '../components/Caption';
import Text from '../components/Text';
import ContainerComponent from './Container';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Container = styled.div`
    display: flex;
    margin: 0 auto;
    
    ${props => css`
        max-width: ${props.theme['max-width']['m'].v};
    `}
    
    @media (max-width: 640px) {
        flex-direction: column;
    }
`;

const FirstColumn = styled.div`
    min-width: 200px;
    max-width: 600px;
`;

const SecondColumn = styled.div`
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
    flex-grow: 1;
    ${props => css`
        background: ${props.styles.background ? props.theme.colors[props.styles.background[0] !== '{' ? props.styles.background : JSON.parse(props.styles.background).value].v : ''};
    `}
    @media (max-width: 640px) {
        padding: 16px;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

function FormBlock(props) {
    return (
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container>
                <FirstColumn>
                    <Image
                        src={props.__images__[props.image]}
                        alt={props.imageAlt}
                        loading='lazy' />
                </FirstColumn>
                <SecondColumn styles={{ background: props.background }}>
                    {props.title ? <Caption color={props.titleColor} containerStyles={css`margin-top: 16px;margin-bottom: 16px;`}>{props.title}</Caption> : null}
                    {props.description ? (
                        <Text
                            size='l'
                            color={props.descriptionColor}
                            containerStyles={css`padding-top: 16px;`}
                            children={props.description}
                            __fieldsValue__={props.__fieldsValue__} />
                    ) : null}
                    <Form
                        buttonCaption={props.buttonCaption}
                        buttonBackground={props.buttonBackground}
                        buttonColor={props.buttonColor}
                        disclaimer={props.disclaimer}
                        __fieldsValue__={props.__fieldsValue__} />
                </SecondColumn>
            </Container>
        </ContainerComponent>
    );
}

FormBlock.propTypes = {
    image: PropTypes.number
};

export default memo(FormBlock);
