import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './SocialNetwork.module.css';

const links = {
    vk: 'https://vk.com/brusbany',
    fb: 'https://www.facebook.com/brusbany',
    ok: 'https://ok.ru/group/54273947861165',
    youtube: 'https://www.youtube.com/channel/UCCYbDVOPWfPm9gJgLdJ5OaQ',
    inst: 'https://www.instagram.com/brus_bany'
};

function SocialNetwork(props) {

}

SocialNetwork.propTypes = {
    type: PropTypes.oneOf(['vk', 'fb', 'inst', 'ok', 'youtube'])
};

export default memo((props) => (
    <a href={props.link || links[props.type]} target='_blank' rel="noopener noreferrer">
        <i className={cx(props.className, styles.icon, styles[props.type])} />
    </a>
));
