import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './SocialNetwork.module.css';

const links = {
    vk: {
        link: 'https://vk.com/brusbany',
        label: 'Группа VK'
    },
    fb: {
        link: 'https://www.facebook.com/brusbany',
        label: 'Группа Facebook'
    },
    ok: {
        link: 'https://ok.ru/group/54273947861165',
        label: 'Группа в OK'
    },
    youtube: {
        link: 'https://www.youtube.com/channel/UCCYbDVOPWfPm9gJgLdJ5OaQ',
        label: 'Канал на Youtube'
    },
    inst: {
        link: 'https://www.instagram.com/brus_bany',
        label: 'Аккаунт в Instagram'
    }
};

function SocialNetwork(props) {
    return (
        <a
            href={links[props.type].link}
            title={links[props.type].label}
            target='_blank'
            rel="noopener noreferrer">
            <i className={cx(props.className, styles.icon, styles[props.type])} />
        </a>
    );
}

SocialNetwork.propTypes = {
    type: PropTypes.oneOf(['vk', 'fb', 'inst', 'ok', 'youtube'])
};

export default memo(SocialNetwork);
