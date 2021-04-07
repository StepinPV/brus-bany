import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Text, Caption } from '../index';

import caska from '../images/caska.svg';
import galka from '../images/galka.svg';
import money from '../images/money.svg';

const Container = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    justify-content: center;
    align-items: stretch;
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
    `}
    
    @media (max-width: 640px) {
        flex-direction: column;
    }
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    margin: 16px;
    width: 300px;
    max-width: 100%;
    padding: 16px;
    box-sizing: border-box;
`;

const Icon = styled.i`
    background-repeat: no-repeat;
    background-position: center;
    width: 100px;
    height: 100px;
`;

const items = [{
    icon: money,
    caption: 'Работаем без предоплаты',
    text: 'Оплата производится после успешной сдачи объекта. Более подробная информация в <a href="/usloviya-oplaty" style="color:#013885;font-weight:bold;text-decoration:none">условиях оплаты</a>'
}, {
    icon: caska,
    caption: 'Построили более 350 объектов',
    text: 'Накопили достаточно опыта, чтобы построить объект любой сложности, <a href="/photos" style="color:#013885;font-weight:bold;text-decoration:none">убедитесь сами</a>'
}, {
    icon: galka,
    caption: 'Гарантия<br/>качества',
    text: 'Строим строго по <a href="/gosty-i-snipy" style="color:#013885;font-weight:bold;text-decoration:none">ГОСТу</a>. По договору обслуживаем постройку в течение 2-х лет'
}];

function FormBlock(props) {
    return (
        <Container
            styles={{
                paddingTop: props.paddingTop,
                paddingBottom: props.paddingBottom
            }}>
            {items.map((item, index) => {
                return (
                    <>
                        <Item>
                            <Icon style={{ backgroundImage: `url('${item.icon}')` }} />
                            <Caption
                                paddingTop='s'
                                paddingBottom='s'
                                size='s'
                                align='center'>
                                {item.caption}
                            </Caption>
                            <Text
                                paddingTop='none'
                                paddingBottom='none'
                                size='m'
                                align='center'>
                                {item.text}
                            </Text>
                        </Item>
                    </>
                );
            })}
        </Container>
    );
}

FormBlock.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l'])
};

FormBlock.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm'
};

export default memo(FormBlock);
