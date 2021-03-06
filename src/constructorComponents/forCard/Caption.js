import React, { memo } from 'react';
import ContainerComponent from './Container';
import CaptionComponent from '../components/Caption';

function Caption(props) {
    return (
        <ContainerComponent
            stretched={props.stretched}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <CaptionComponent
                children={props.children}
                size={props.size}
                color={props.color}
                align={props.align}
                tag='div'
                __fieldsValue__={props.__fieldsValue__} />
        </ContainerComponent>
    );
}

export default memo(Caption);
