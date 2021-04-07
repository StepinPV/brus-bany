import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Text } from '../index';

import call from '../images/call.svg';
import calc from '../images/calc.svg';
import dogovor from '../images/dogovor.svg';
import arrow from '../images/arrow.svg';

const Container = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
    `}
    
    @media (min-width: 641px) {
        margin: 32px auto 64px;
    }
    
    @media (max-width: 640px) {
        margin: 32px auto 64px;
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
    margin-bottom: 16px;
`;

const ArrowIcon = styled.i`
    background-image: url('${arrow}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 60px;
    height: 30px;
    flex-shrink: 0;
    
    @media (max-width: 640px) {
        transform: rotate(90deg);
    }
`;

const items = [{
    icon: call,
    text: 'Позвоните нам<br><a href="tel:88002010729" style="color:#91001d;text-decoration:none;font-weight:bold">8&nbsp;(800)&nbsp;201-07-29</a><br>или <a href="#requestForm" style="color:#013885;font-weight:bold;cursor:pointer">оставьте заявку</a>'
}, {
    icon: calc,
    text: 'Подберем оптимальный вариант бани, рассчитаем стоимость и пришлем подробную смету'
}, {
    icon: dogovor,
    text: '<a href="/documents/dogovor.docx" download="" style="color:#013885;text-decoration:none;font-weight:bold;cursor:pointer">Заключим договор</a>, приступим к строительству бани или привезем уже готовую'
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
                            <Text
                                paddingTop='none'
                                paddingBottom='none'
                                align='center'
                            >{item.text}
                            </Text>
                        </Item>
                        {index !== items.length - 1 ? (
                            <ArrowIcon />
                        ) : null}
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
