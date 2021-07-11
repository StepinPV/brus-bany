import React, { memo } from 'react';
import { useRouteMatch } from 'react-router';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import styled from '@emotion/styled';
import {css} from "@emotion/react";
import {applyFields} from "@constructor-components/helpers";

const Container = styled.form`
    padding: 16px;
`;

const Disclaimer = styled.div`
    font-size: 16px;
    padding: 10px 0;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    background: inherit;
`;

const items = [{
    title: 'Ваше имя',
    name: 'name',
    required: true,
    type: 'text'
}, {
    title: 'Ваш номер телефона',
    name: 'phone',
    required: true,
    type: 'tel'
}];

function Form(props) {
    const { buttonCaption, buttonColor, buttonBackground, disclaimer } = props;
    const match = useRouteMatch();

    return (
        <Container action='/api/requests' method='post'>
            {items.map(({ title, name, required, type }) => (
                <Input
                    title={title}
                    name={name}
                    required={required}
                    type={type === 'text' ? null : type}
                    paddingBottom='s' />
            ))}

            <input type='hidden' name='source' value={match.url} />

            <Button
                type='button'
                caption={buttonCaption}
                color={buttonColor}
                background={buttonBackground}
                containerStyles={css`margin-top: 32px;margin-bottom: 32px;`}
                fullWidth />

            {disclaimer ? <Disclaimer dangerouslySetInnerHTML={{ __html: applyFields(props.__fieldsValue__, disclaimer) }} /> : null}
        </Container>
    );
}

Form.propTypes = {
    onSuccess: PropTypes.func,
    buttonCaption: PropTypes.string
};

Form.defaultProps = {
    buttonCaption: 'Перезвоните мне',
    buttonColor: '{ "type": "base", "value": "white" }',
    buttonBackground: '{ "type": "base", "value": "black" }',
    disclaimer: 'Нажимая на кнопку, вы даете согласие на обработку своих персональных данных.',
    __fieldsValue__: {}
};

export default withRouter(memo(Form));
