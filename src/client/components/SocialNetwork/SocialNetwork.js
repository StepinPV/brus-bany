import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './SocialNetwork.module.css';

const links = {
    vk: {
        link: 'https://vk.com/brusbany',
        label: 'Группа в VK'
    },
    fb: {
        link: 'https://www.facebook.com/brusbany',
        label: 'Группа в Facebook'
    },
    ok: {
        link: 'https://ok.ru/group/54273947861165',
        label: 'Группа в OK'
    },
    youtube: {
        link: 'https://www.youtube.com/channel/UCCYbDVOPWfPm9gJgLdJ5OaQ',
        label: 'Канал на youtube'
    },
    inst: {
        link: 'https://www.instagram.com/brus_bany',
        label: 'Аккаунт в instagram'
    }
};

function SocialNetwork(props) {
    return (
        <a
            href={links[props.type].link}
            area-label={links[props.type].label}
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
