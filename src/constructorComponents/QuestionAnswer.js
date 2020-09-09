import React, { memo } from 'react';
import PropTypes from "prop-types";
import { Caption, Text } from './index';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;

    padding-left: 0;
    padding-right: 0;
    ${props => css`
        max-width: ${props.styles.width ? { s: '728px', m: '1200px', l: '100%' }[props.styles.width] : ''};
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingTop] : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingBottom] : ''};
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
        <Container
            {...(props.id ? { id: props.id } : {})}
            styles={{
                width: props.width,
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop
            }}>
            {props.items.map(({ name, items }) => {
                return (
                    <Group key={name}>
                        <GroupName>{name}</GroupName>
                        {(items || []).map(({ question, answer }) => {
                            return (
                                <Item key={question}>
                                    <Caption paddingTop='none' paddingBottom='s' size='s' align='left'>{question}</Caption>
                                    <Text paddingBottom='none' paddingTop='none' align='left' isHTML>{answer}</Text>
                                </Item>
                            );
                        })}
                    </Group>
                )
            })}
        </Container>
    );
}

QuestionAnswer.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    width: PropTypes.oneOf(['s', 'm', 'l']),
    items: PropTypes.array,
    id: PropTypes.string
};

QuestionAnswer.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm',
    items: [],
    width: 'm'
};

export default memo(QuestionAnswer);
