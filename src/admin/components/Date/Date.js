import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Date.module.css';

class _Date extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        required: PropTypes.bool,
        min: PropTypes.number,
        error: PropTypes.string,
        inputClassName: PropTypes.string
    };

    render() {
        const { title, required, min, error, inputClassName } = this.props;
        let { value } = this.props;

        // TODO
        value = new Date(value).toLocaleDateString().replace(/(\d*).(\d*).(\d*)/, '$3-$2-$1');

        return (
            <div className={cx(styles.container, {[styles.required]: required})}>
                <label className={styles.label}>{title}</label>
                <input type='date' value={value} min={min} required className={cx(styles.input, inputClassName)} onChange={this.handleChange} />
                {error ? <div className={styles.error}>{error}</div> : null}
            </div>
        );
    }

    handleChange = (e) => {
        const { onChange } = this.props;

        onChange(e.target.value);
    }
}

export default _Date;
