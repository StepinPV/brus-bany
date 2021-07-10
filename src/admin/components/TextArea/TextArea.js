import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './TextArea.module.css';

class TextArea extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        required: PropTypes.bool,
        error: PropTypes.string,
        inputClassName: PropTypes.string
    };

    componentDidMount() {
        this.updateContainerHeight();
    }

    render() {
        const { title, value, required, error, inputClassName } = this.props;

        return (
            <div className={cx(styles.container, {[styles.required]: required})}>
                <textarea
                    required
                    ref={ref => this.textarea = ref}
                    className={cx(styles.input, inputClassName)}
                    value={value || ''}
                    onChange={this.handleChange} />
                <span className={styles.bar} />
                <label className={styles.label}>{title}</label>
                {error ? <div className={styles.error}>{error}</div> : null}
            </div>
        )
    }

    handleChange = (e) => {
        const { onChange } = this.props;
        this.updateContainerHeight();

        onChange(e.target.value);
    };

    updateContainerHeight = () => {
        const textarea = this.textarea;
        const offset = textarea.offsetHeight - textarea.clientHeight;

        // Необходимо для возврата в исходное состояние, при удалении дополнительной строки
        textarea.style.height = '';
        textarea.style.height = textarea.scrollHeight + offset + 'px';
    };
}

export default TextArea;
