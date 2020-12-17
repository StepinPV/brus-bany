import React, { memo } from 'react';
import PropTypes from "prop-types";
import { Caption, Text, Form } from '../index';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { getColor } from '../helpers';

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    max-width: 1168px;
    margin: 0 auto;
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop] : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom] : ''};
    `}
    @media (max-width: 640px) {
        flex-direction: column;
        margin: 16px 16px 0;
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
        background: ${getColor(props, 'background')};
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
        <Container
            styles={{
                paddingTop: props.paddingTop,
                paddingBottom: props.paddingBottom
            }}
            id='requestForm'>
            <FirstColumn>
                <Image
                    src={props.__images__[props.image]}
                    alt='Фотография бани'
                    loading='lazy' />
            </FirstColumn>
            <SecondColumn styles={{ background: props.background }}>
                <Caption paddingBottom='s' paddingTop='s'>Закажите обратный звонок!</Caption>
                <Text size='l' paddingTop='s'>Перезвоним вам в кратчайшие сроки, расскажем о домах и банях все и поможем с выбором</Text>
                <Form />
            </SecondColumn>
        </Container>
    );
}

FormBlock.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    image: PropTypes.string
};

FormBlock.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm'
};

export default memo(FormBlock);
