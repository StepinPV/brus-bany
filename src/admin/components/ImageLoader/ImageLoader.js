import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './ImageLoader.module.css';

class ImageLoader extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        image: PropTypes.string,
        title: PropTypes.string
    };

    render() {
        const { image, title } = this.props;

        return (
            <div>
                <div className={styles.label}>{title}</div>
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
        if (!FileReader) {
            return;
        }

        Array.from(event.target.files).forEach(file => {
            if (!file.type.match('image.*')) {
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
