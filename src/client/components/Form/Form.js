import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Input from '../../../components/Input';
import Api from './api';
import withNotification from '../../../plugins/Notifications/withNotification';
import styles from './Form.module.css';

class Form extends PureComponent {
    static propTypes = {
        source: PropTypes.string,
        data: PropTypes.array,
        showNotification: PropTypes.func,
        onSuccess: PropTypes.func
    };

    state = {
        name: '',
        phone: '',
        errors: {}
    };

    render() {
        const { name, phone, errors } = this.state;

        return (
            <Fragment>
                <Input
                    title='Ваше имя'
                    required
                    className={styles.input}
                    value={name}
                    onChange={this.handleNameChange}
                    error={errors.name} />

                <Input
                    title='Ваш номер телефона'
                    required
                    className={styles.input}
                    value={phone}
                    onChange={this.handlePhoneChange}
                    error={errors.phone} />

                <Button caption='Перезвоните мне' className={styles.button} onClick={this.handleSubmit} />
                <div className={styles.disclaimer}>Нажимая на кнопку, вы даете согласие на обработку своих персональных данных. <a href='/politika_konfidencialnosty' target='_blank'>Политика конфиденциальности.</a></div>
            </Fragment>
        );
    }

    handleSubmit = async () => {
        const { name, phone } = this.state;
        const { source, data, showNotification, onSuccess } = this.props;

        if (!name || !phone) {
            this.setState({
                errors: {
                    name: name ? null : 'Поле обязательно для заполнения',
                    phone: phone ? null : 'Поле обязательно для заполнения'
                }
            });
            return;
        }

        try {
            await Api.send({ name, phone, source, data });

            showNotification({
                message: 'Заявка успешно отправлена',
                status: 'success'
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch(err) {
            showNotification({ message: 'Ошибка отправки заявки. Повторите попытку', status: 'error' });
        }
    };

    handleNameChange = (name) => {
        this.setState({ name, errors: { ...this.state.errors, name: null } });
    };

    handlePhoneChange = (phone) => {
        this.setState({ phone, errors: { ...this.state.errors, phone: null } });
    };
}

export default withNotification(Form);
