import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.css';

class Select extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array,
        displayProperty: PropTypes.string,
        keyProperty: PropTypes.string,
        selectedKey: PropTypes.string,
        onChange: PropTypes.func,
        error: PropTypes.string
    };

    render() {
        const { selectedKey, items, displayProperty, keyProperty, title, error } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.label}>{title}</div>
                <select value={selectedKey} onChange={this.handleChange} className={styles.select}>
                     {!selectedKey ? <option key={null} value={null}>Не выбрано</option> : null}
                    {items.map(item => <option key={item[keyProperty]} value={item[keyProperty]}>{item[displayProperty]}</option>)}
                </select>
                {error ? <div className={styles.error}>{error}</div> : null}
            </div>
        )
    }

    handleChange = (e) => {
        const { onChange } = this.props;

        onChange(e.target.value);
    }
}

export default Select;
