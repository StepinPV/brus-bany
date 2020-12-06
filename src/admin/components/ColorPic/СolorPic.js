import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import styles from './ColorPic.module.css';

export default class ColorPic extends PureComponent {
    static propTypes = {
        expanded: PropTypes.bool,
        onExpandEvent: PropTypes.func,
        onChange: PropTypes.func,
        currentState: PropTypes.object,
    };

    static getDerivedStateFromProps(nextProps, oldState) {
        if (!oldState.color) {
            return {
                color: nextProps.currentState ? nextProps.currentState.color : null
            }
        }

        return null;
    }

    state = {
        color: null
    }

    stopPropagation = (event) => {
        event.stopPropagation();
    };

    onChange = (color) => {
        this.setState({ color: color.hex });
    }

    onChangeComplete = (color) => {
        const { onChange } = this.props;
        onChange('color', color.hex);
    }

    renderModal = () => {
        const { color } = this.state;
        return (
            <div className={styles.picker} onClick={this.stopPropagation}>
                <SketchPicker color={color} onChange={this.onChange} onChangeComplete={this.onChangeComplete} />
            </div>
        );
    };

    render() {
        const { expanded, onExpandEvent, currentState: { color } } = this.props;

        return (
            <div
                aria-haspopup='true'
                aria-expanded={expanded}
                aria-label='rdw-color-picker'>
                <div
                    className={styles.select}
                    style={{ background: `${color}`}}
                    onClick={onExpandEvent}
                />
                {expanded ? this.renderModal() : undefined}
            </div>
        );
    }
}
