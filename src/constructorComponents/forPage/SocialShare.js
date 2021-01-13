import React, { memo } from 'react';
import styled from '@emotion/styled';

const Share = styled.form`
    text-align: center;
    margin-bottom: 64px;
`;

function SocialShare() {
    return (
        <Share
            className='ya-share2'
            data-services='vkontakte,facebook,odnoklassniki' />
    );
}

export default memo(SocialShare);
