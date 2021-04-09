import React, { memo } from 'react';
import TextComponent from '../components/Text';
import ContainerComponent from './Container';

function Text(props) {
    return (
        <ContainerComponent
            stretched={props.stretched}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <TextComponent
                children={props.children}
                align={props.align}
                size={props.size}
                color={props.color}
                __fieldsValue__={props.__fieldsValue__} />
        </ContainerComponent>
    );
}

export default memo(Text);
