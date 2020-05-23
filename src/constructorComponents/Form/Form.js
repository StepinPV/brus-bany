import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from '../index';
import Input from '../../components/Input';
import styles from './Form.module.css';

function Form(props) {
    const { buttonCaption, source, data } = props;

    return (
        <form className={styles.container} action='/api/requests' method='post'>
            <Input
                title='Ваше имя'
                name='name'
                required
                className={styles.input} />

            <Input
                title='Ваш номер телефона'
                name='phone'
                type='tel'
                required
                className={styles.input} />

            {source ? (
                <input type="hidden" name='source' value={source} />
            ) : null}

            {data ? (
                <input type="hidden" name='data' value={JSON.stringify(data)} />
            ) : null}

            <Button type='button' caption={buttonCaption} fullWidth />
            <div className={styles.disclaimer}>Нажимая на кнопку, вы даете согласие на обработку своих персональных данных. <a href='/politika-konfidencialnosti' target='_blank'>Политика конфиденциальности.</a></div>
        </form>
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
