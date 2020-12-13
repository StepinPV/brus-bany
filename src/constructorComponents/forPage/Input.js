import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
    position: relative;
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingTop] : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingBottom] : ''};
    `}
`;

const InputElement = styled.input`
    font-size: 16px;
    padding: 10px 0;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    background: inherit;
    &:focus {
        outline: none;
    }
`;

const getTypeAttrs = (type) => {
    switch (type) {
        case 'float number': return { type: 'number', step: 'any' };
        case 'integer number': return { type: 'number', step: 1 };
        default: return { type: 'text' };
    }
};

class Input extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        type: PropTypes.string,
        min: PropTypes.number,
        name: PropTypes.string
    };

    render() {
        const { title, value, type, name, paddingBottom, paddingTop } = this.props;

        return (
            <Container
                styles={{
                    paddingBottom,
                    paddingTop
                }}>
                <InputElement
                    placeholder={title}
                    id={name}
                    name={name}
                    type="text"
                    required
                    value={value}
                    onChange={this.handleChange}
                    {...getTypeAttrs(type)} />
            </Container>
        )
    }

    handleChange = (e) => {
        const { onChange, type } = this.props;

        if (onChange) {
            switch (type) {
                case 'float number': onChange(parseFloat(e.target.value)); break;
                case 'integer number': onChange(parseInt(e.target.value)); break;
                default: onChange(e.target.value); break;
            }
        }
    }
}

export default Input;
