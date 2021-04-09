import React, { memo } from 'react';
import styled from '@emotion/styled';
import ContainerComponent from './Container';

const Share = styled.form`
    text-align: center;
    margin-bottom: 64px;
`;

function SocialShare(props) {
    return (
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Share
                className='ya-share2'
                data-services='vkontakte,facebook,odnoklassniki' />
        </ContainerComponent>
    );
}

export default memo(SocialShare);
