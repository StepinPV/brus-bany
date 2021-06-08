import React, { memo } from 'react';
import { useRouteMatch } from 'react-router';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import styled from '@emotion/styled';
import {css} from "@emotion/react";

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

function Form(props) {
    const { buttonCaption } = props;
    const match = useRouteMatch();

    return (
        <Container action='/api/requests' method='post'>
            <Input
                title='Ваше имя'
                name='name'
                required
                paddingBottom='s' />

            <Input
                title='Ваш номер телефона'
                name='phone'
                type='tel'
                required
                paddingBottom='s' />

            <input type='hidden' name='source' value={match.url} />

            <Button
                type='button'
                caption={buttonCaption}
                color='{ "type": "base", "value": "white" }'
                background='{ "type": "base", "value": "red" }'
                containerStyles={css`margin-top: 32px;margin-bottom: 32px;`}
                fullWidth />
            <Disclaimer>Нажимая на кнопку, вы даете согласие на обработку своих персональных данных. <a href='/politika-konfidencialnosti' target='_blank'>Политика конфиденциальности.</a></Disclaimer>
        </Container>
    );
}

Form.propTypes = {
    onSuccess: PropTypes.func,
    buttonCaption: PropTypes.string
};

Form.defaultProps = {
    buttonCaption: 'Перезвоните мне'
};

export default withRouter(memo(Form));
