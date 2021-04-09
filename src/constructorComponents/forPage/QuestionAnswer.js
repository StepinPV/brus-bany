import React, { memo } from 'react';
import PropTypes from "prop-types";
import Caption from '../components/Caption';
import Text from '../components/Text';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ContainerComponent from './Container';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;

    ${props => css`
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width].v : ''};
    `}
`;

const Group = styled.div`
    &:not(:last-child) {
        margin-bottom: 32px;
    }
`;

const GroupName = styled.div`
    font-size: 20px;
    color: #adadad;
    margin-bottom: 8px;
`;

const Item = styled.div`
    padding: 16px;
    background: #efefef;
    margin-bottom: 2px;
`;

function QuestionAnswer(props) {
    return (
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container styles={{ width: props.width }}>
                {props.items.map(({ name, items }) => {
                    return (
                        <Group key={name}>
                            <GroupName>{name}</GroupName>
                            {(items || []).map(({ question, answer }) => {
                                return (
                                    <Item key={question}>
                                        <Caption
                                            containerStyles={css`margin-top: 16px;margin-bottom: 16px;`}
                                            size='s'
                                            align='left'
                                            __fieldsValue__={props.__fieldsValue__}>
                                            {question}
                                        </Caption>
                                        <Text align='left' __fieldsValue__={props.__fieldsValue__}>{answer}</Text>
                                    </Item>
                                );
                            })}
                        </Group>
                    )
                })}
            </Container>
        </ContainerComponent>
    );
}

QuestionAnswer.propTypes = {
    width: PropTypes.oneOf(['s', 'm', 'l']),
    items: PropTypes.array
};

QuestionAnswer.defaultProps = {
    items: [],
    width: 'm'
};

export default memo(QuestionAnswer);
