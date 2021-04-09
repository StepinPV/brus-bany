import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Caption from '../components/Caption';
import Text from '../components/Text';
import ContainerComponent from './Container';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Container = styled.div`
    display: flex;
    justify-content: space-around;
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
            id='requestForm'
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container>
                <FirstColumn>
                    <Image
                        src={props.__images__[props.image]}
                        alt='Фотография бани'
                        loading='lazy' />
                </FirstColumn>
                <SecondColumn styles={{ background: props.background }}>
                    <Caption containerStyles={css`margin-top: 16px;margin-bottom: 16px;`}>Закажите обратный звонок!</Caption>
                    <Text
                        size='l'
                        containerStyles={css`padding-top: 16px;`}
                        __fieldsValue__={props.__fieldsValue__}>
                        Перезвоним вам в кратчайшие сроки, расскажем о домах и банях все и поможем с выбором
                    </Text>
                    <Form />
                </SecondColumn>
            </Container>
        </ContainerComponent>
    );
}

FormBlock.propTypes = {
    image: PropTypes.number
};

export default memo(FormBlock);
