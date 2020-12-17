import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.ol`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;

    padding-left: 0;
    padding-right: 0;
    
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop] : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom] : ''};
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width] : ''};
        font-size: ${{ s: '15px', m: '19px', l: '24px' }[props.styles.size]};
        line-height: ${{ s: '20px', m: '24px', l: '30px' }[props.styles.size]};
        @media (max-width: 400px) {
            font-size: ${{ s: '12px', m: '14px', l: '16px' }[props.styles.size]};
            line-height: ${{ s: '16px', m: '18px', l: '20px' }[props.styles.size]};
        }
        @media (max-width: 640px) {
            font-size: ${{ s: '13px', m: '16px', l: '20px' }[props.styles.size]};
            line-height: ${{ s: '16px', m: '18px', l: '20px' }[props.styles.size]};
        }
    `}
`;

const Item = styled.li`
    margin-left: 38px;
    margin-right: 16px;
`;

function List(props) {
    return (
        <Container
            as={props.type === 'marker' ? 'ul' : 'ol'}
            {...(props.id ? { id: props.id } : {})}
            styles={{
                width: props.width,
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop,
                size: props.size
            }}>
            {props.items.map(({ text }) => {
                return <Item key={text} dangerouslySetInnerHTML={{ __html: text }} />
            })}
        </Container>
    )
}

List.propTypes = {
    size: PropTypes.oneOf(['s', 'm', 'l']),
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    type: PropTypes.oneOf(['numeric', 'marker']),
    width: PropTypes.oneOf(['s', 'm', 'l']),
    items: PropTypes.array,
    id: PropTypes.string
};

List.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm',
    type: 'marker',
    items: [],
    size: 'm',
    width: 'm'
};

export default memo(List);
