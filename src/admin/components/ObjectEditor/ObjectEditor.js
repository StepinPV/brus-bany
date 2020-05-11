import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import styles from './ObjectEditor.module.css';
import cx from 'classnames';

const renderHeader = ({ title, value, onChange, visible, setVisible, onBottom, onUp }) => {
    return (
        <div className={styles.header}>
            <span className={cx(styles.title, !value ? styles['disabled-title'] : null)} onClick={() => { setVisible(value && !visible) }}>{value ? (visible ? '▼ ' : '▶ ') : null}{title}</span>
            <span className={value ? styles.removeButton : styles.addButton} onClick={() => {
                if (value) {
                    if (!confirm('Вы точно хотите удалить элемент?')) {
                        return;
                    }
                }

                onChange(value ? null : {});
                setVisible(!value);
            }}>{value ? 'Удалить' : 'Создать'}</span>
            {onUp ? <span onClick={onUp} className={styles['move-button']}>▲</span> : null }
            {onBottom ? <span onClick={onBottom} className={styles['move-button']}>▼</span> : null }
        </div>
    );
};

const ObjectEditor = ({ title, value, onChange, format, error, onUp, onBottom, expand, images }) => {
    const [visible, setVisible] = useState(Boolean(expand));

    return (
        <div className={styles.container}>
            {renderHeader({ title, value, onChange, visible, setVisible, onUp, onBottom })}
            {typeof error === 'string' ? <div className={styles.error}>{error}</div> : null}
            {value && visible ? (
                <div className={styles.items}>
                    <Form
                        format={format}
                        value={value}
                        errors={typeof error === 'object' && error !== null ? error : {}}
                        onChange={(id, val, images) => onChange(val, images)}
                        images={images}
                    />
                </div>
            ) : null}
        </div>
    )
};

ObjectEditor.propTypes = {
    title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.object,
    onChange: PropTypes.func,
    format: PropTypes.array,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onUp: PropTypes.func,
    onBottom: PropTypes.func,
    expand: PropTypes.bool,
    images: PropTypes.string
};

export default memo(ObjectEditor);
