import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import CheckBox from '../../../components/CheckBox';
import ArrayEditor from '../ArrayEditor';
import AssociativeArrayEditor from '../AssociativeArrayEditor';
import OneOf from '../OneOf';
import ImageUploader from '../ImageUploader';
import Select from '../../../components/Select';
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

const renderItems = ({ value, onChange, format, errors }) => {
    return format.map(item => {
        const handleChange = (val) => {
            onChange({
                ...value,
                [item['_id']]: val
            })
        };

        switch (item.type) {
            case 'string':
            case 'float number':
            case 'integer number':
                return (
                    <div className={styles.item} key={item['_id']}>
                        <Input
                            value={value[item['_id']]}
                            title={item.title}
                            type={item.type}
                            required={item.required}
                            min={item.min}
                            description={item.description}
                            onChange={handleChange}
                            error={errors[item['_id']]}
                        />
                    </div>
                );
            case 'object':
                return <ObjectEditor
                    key={item['_id']}
                    value={value[item['_id']]}
                    title={item.title}
                    format={item.format}
                    onChange={handleChange}
                    errors={errors[item['_id']]}
                />;
            case 'oneOf':
                return <OneOf
                    key={item['_id']}
                    value={value[item['_id']]}
                    title={item.title}
                    variants={item.variants}
                    onChange={handleChange}
                    errors={errors[item['_id']]}
                />;
            case 'array':
                return <ArrayEditor
                    key={item['_id']}
                    value={value[item['_id']]}
                    title={item.title}
                    itemTitleField={item.itemTitleField}
                    format={item.format}
                    expand={item.expand}
                    onChange={handleChange}
                    errors={errors[item['_id']]}
                />;
            case 'associative array':
                return <AssociativeArrayEditor
                    key={item['_id']}
                    value={value[item['_id']]}
                    title={item.title}
                    titleFieldId={item.titleFieldId}
                    format={item.format}
                    onChange={handleChange}
                    errors={errors[item['_id']]}
                />;
            case 'text':
                return (
                    <div className={styles.item} key={item['_id']}>
                        <TextArea
                            value={value[item['_id']]}
                            title={item.title}
                            required={item.required}
                            description={item.description}
                            onChange={handleChange}
                            error={errors[item['_id']]}
                        />
                    </div>
                );
            case 'image':
                return (
                    <div className={styles.item} key={item['_id']}>
                        <ImageUploader
                            key={item['_id']}
                            image={value[item['_id']]}
                            title={item.title}
                            description={item.description}
                            props={item.props}
                            required={item.required}
                            onChange={handleChange}
                            error={errors[item['_id']]}
                        />
                    </div>
                );
            case 'select':
                return (
                    <div className={styles.item} key={item['_id']}>
                        <Select
                            title={item.title}
                            items={item.items}
                            displayProperty='title'
                            keyProperty='id'
                            selectedKey={value[item['_id']]}
                            onChange={handleChange}
                            required={item.required}
                            error={errors[item['_id']]} />
                    </div>
                );
            case 'boolean':
                return (
                    <div className={styles.item} key={item['_id']}>
                        <CheckBox
                            checked={value[item['_id']]}
                            title={item.title}
                            onChange={handleChange}
                        />
                    </div>

                );
            default: break;
        }

        return null;
    });
};

const ObjectEditor = ({ title, value, onChange, format, errors, onUp, onBottom, expand }) => {
    const [visible, setVisible] = useState(Boolean(expand));

    return (
        <div className={styles.container}>
            {renderHeader({ title, value, onChange, visible, setVisible, onUp, onBottom })}
            {typeof errors === 'string' ? <div className={styles.error}>{errors}</div> : null}
            {value && visible ? (
                <div className={styles.items}>
                    { renderItems({ value, onChange, format, errors: typeof errors === 'object' && errors !== null ? errors : {} }) }
                </div>
            ) : null}
        </div>
    )
};

ObjectEditor.propTypes = {
    title: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    format: PropTypes.array,
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onUp: PropTypes.func,
    onBottom: PropTypes.func,
    expand: PropTypes.bool
};

export default memo(ObjectEditor);
