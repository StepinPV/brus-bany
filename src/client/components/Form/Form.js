import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from '../Button';
import Input from '../../../components/Input';
import styles from './Form.module.css';

function Form(props) {
    const { buttonCaption, history, source, data } = props;

    return (
        <>
            {history.location.search && history.location.search.includes('requestStatus=success') ? (
                <div className={styles['success-block']}>Заявка успешно отправлена</div>
            ) : null}
            <form action='/api/requests' method='post' target='/' onSubmit="alert(123); ym(49126414,'reachGoal','order'); return true;">
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

                <Button caption={buttonCaption} className={styles.button} />
                <div className={styles.disclaimer}>Нажимая на кнопку, вы даете согласие на обработку своих персональных данных. <a href='/politika-konfidencialnosti' target='_blank'>Политика конфиденциальности.</a></div>
            </form>
        </>
    );
}

Form.propTypes = {
    source: PropTypes.string,
    data: PropTypes.array,
    onSuccess: PropTypes.func,
    buttonCaption: PropTypes.string,
    history: PropTypes.object
};

Form.defaultProps = {
    buttonCaption: 'Перезвоните мне'
};

export default withRouter(memo(Form));
