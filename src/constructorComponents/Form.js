import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Input } from './index';
import styled from '@emotion/styled';

const Container = styled.form`
    padding: 16px;
`;

const Disclaimer = styled.form`
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
    const { buttonCaption, source, data } = props;

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

            {source ? (
                <input type="hidden" name='source' value={source} />
            ) : null}

            {data ? (
                <input type="hidden" name='data' value={JSON.stringify(data)} />
            ) : null}

            <Button
                type='button'
                caption={buttonCaption}
                color='{ "type": "base", "value": "white" }'
                background='{ "type": "base", "value": "red" }'
                fullWidth/>
            <Disclaimer>Нажимая на кнопку, вы даете согласие на обработку своих персональных данных. <a href='/politika-konfidencialnosti' target='_blank'>Политика конфиденциальности.</a></Disclaimer>
        </Container>
    );
}

Form.propTypes = {
    source: PropTypes.string,
    data: PropTypes.array,
    onSuccess: PropTypes.func,
    buttonCaption: PropTypes.string
};

Form.defaultProps = {
    buttonCaption: 'Перезвоните мне'
};

export default withRouter(memo(Form));