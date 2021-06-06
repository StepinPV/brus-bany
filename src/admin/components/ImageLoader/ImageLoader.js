import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import showNotification from '@utils/showNotification';
import Input from '../../../components/Input';

import cx from 'classnames';
import styles from './ImageLoader.module.css';

class ImageLoader extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        onChangeURL: PropTypes.func,
        image: PropTypes.string,
        title: PropTypes.string,
        allowedTypes: PropTypes.array
    };

    static defaultProps = {
        allowedTypes: ['image/jpeg', 'image/jpg', 'image/png']
    };

    render() {
        const { image, title, onChangeURL } = this.props;

        return (
            <div>
                <div className={styles.label}>{title}</div>
                <div className={styles.label2}>Введите URL или выберете вручную</div>
                <Input value={image || ''} title='URL' className={styles.input} onChange={onChangeURL} />
                {
                    image ? (
                        <div className={cx(styles.item, styles.imageWrapper)}>
                            <div
                                className={styles.deleteButton}
                                onClick={() => {
                                    this.handleDelete();
                                }} />
                            <img alt="" src={image} className={styles.image} />
                        </div>
                    ) : (
                        <div className={cx(styles.appendButton, styles.item)}>
                            <input type='file' className={styles.appendButtonInput} onChange={this.handleChangeInput} />
                        </div>
                    )
                }
            </div>
        );
    }

    handleChangeInput = (event) => {
        const { allowedTypes } = this.props;

        if (!FileReader) {
            return;
        }

        Array.from(event.target.files).forEach(file => {
            if (!allowedTypes.includes(file.type)) {
                showNotification({ status: 'error', message: 'Недопустимый формат файла!' })
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                this.handleAppend(file);
            };

            reader.onerror = () => {
                alert('Ошибка загрузки файла! Повторите попытку.');
            };

            reader.readAsDataURL(file);
        });

        // Очищаем input
        event.target.value = '';
    };

    handleAppend = (file) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(file);
        }
    };

    handleDelete = () => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(null);
        }
    };
}

export default ImageLoader;
