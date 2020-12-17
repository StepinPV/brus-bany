import React, { memo } from 'react';
import styled from '@emotion/styled'
import { css } from '@emotion/core';

import vk from './resources/vk.svg';
import fb from './resources/fb.svg';
import inst from './resources/inst.svg';
import ok from './resources/ok.svg';
import youtube from './resources/youtube.svg';

const links = {
    vk: {
        link: 'https://vk.com/brusbany',
        label: 'Группа VK',
        source: vk
    },
    fb: {
        link: 'https://www.facebook.com/brusbany',
        label: 'Группа Facebook',
        source: fb
    },
    ok: {
        link: 'https://ok.ru/group/54273947861165',
        label: 'Группа в OK',
        source: ok
    },
    youtube: {
        link: 'https://www.youtube.com/channel/UCCYbDVOPWfPm9gJgLdJ5OaQ',
        label: 'Канал на Youtube',
        source: youtube
    },
    inst: {
        link: 'https://www.instagram.com/brus_bany',
        label: 'Аккаунт в Instagram',
        source: inst
    }
};

const Container = styled.div`
    display: flex;
    
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop] : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom] : ''};
        margin: ${props.styles.withoutMargins ? '' : '0 16px'};
    `}
`;

const I = styled.i`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 25px;
    height: 25px;
    display: block;
    margin-right: 8px;
`;

function Icon({ type }) {
    return (
        <a
            href={links[type].link}
            title={links[type].label}
            target='_blank'
            rel="noopener noreferrer">
            <I style={{ backgroundImage: `url('${links[type].source}')`}} />
        </a>
    );
}

function SocialNetworks(props) {
    return (
        <Container
            styles={{
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop,
                withoutMargins: props.withoutMargins
            }}>
            <Icon type='vk' />
            <Icon type='fb' />
            <Icon type='ok' />
            <Icon type='inst' />
            <Icon type='youtube' />
        </Container>
    );
}

export default memo(SocialNetworks);
