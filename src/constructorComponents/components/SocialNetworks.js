import React, { memo } from 'react';
import styled from '@emotion/styled'
import { css } from '@emotion/react';

import vk from '../images/vk.svg';
import fb from '../images/fb.svg';
import inst from '../images/inst.svg';
import ok from '../images/ok.svg';
import youtube from '../images/youtube.svg';

const links = {
    vk: {
        label: 'Группа VK',
        source: vk
    },
    fb: {
        label: 'Группа Facebook',
        source: fb
    },
    ok: {
        label: 'Группа в OK',
        source: ok
    },
    youtube: {
        label: 'Канал на Youtube',
        source: youtube
    },
    inst: {
        label: 'Аккаунт в Instagram',
        source: inst
    }
};

const Container = styled.div`
    display: flex;
    
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
        margin: ${props.styles.withoutMargins ? '' : '0 16px'};
        ${props.containerStyles || ''}
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

function Icon({ type, link }) {
    return (
        <a
            href={link}
            title={links[type].label}
            target='_blank'
            rel="noopener noreferrer">
            <I style={{ backgroundImage: `url('${links[type].source}')`}} />
        </a>
    );
}

function SocialNetworks(props) {
    return props.items ? (
        <Container
            styles={{
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop,
                withoutMargins: props.withoutMargins
            }}>
            {props.items.vk ? <Icon type='vk' link={props.items.vk} /> : null}
            {props.items.fb ? <Icon type='fb' link={props.items.fb} /> : null}
            {props.items.ok ? <Icon type='ok' link={props.items.ok} /> : null}
            {props.items.inst ? <Icon type='inst' link={props.items.inst} /> : null}
            {props.items.youtube ? <Icon type='youtube' link={props.items.youtube} /> : null}
        </Container>
    ) : null;
}

export default memo(SocialNetworks);
