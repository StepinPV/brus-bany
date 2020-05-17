import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../components/Button';
import styles from './FloatPanels.module.css';
import cx from 'classnames';

class FloatPanels extends PureComponent {
    static propTypes = {
        children: PropTypes.element,
        panels: PropTypes.object,
        openedPanelId: PropTypes.string,
        onChangeOpenedPanel: PropTypes.func
    };

    render() {
        const { children, panels, openedPanelId } = this.props;

        return (
            <div className={cx(styles.container, {[styles['float-mode']]: Boolean(openedPanelId)})}>
                {Object.keys(panels).map(key => this.renderPanel(key, panels[key]))}
                <div className={styles.content}>
                    <div className={styles.overlay} onClick={this.closePanel} />
                    {children}
                </div>
            </div>
        );
    }

    renderPanel = (key, panel) => {
        const { openedPanelId, onChangeOpenedPanel } = this.props;

        return (
            <div
                key={key}
                style={{
                    ...panel.containerStyle,
                    ...(openedPanelId === key ? { left: '0' } : {})
                }}
                className={styles.panel}>
                {panel.button ? (
                    <div
                        style={panel.button.style}
                        className={styles['panel-button']}
                        onClick={() => { onChangeOpenedPanel(key) }}>{panel.button.caption}</div>
                ) : null}
                <div className={styles['panel-caption']}>{panel.caption}</div>
                <div className={styles['panel-content']}>
                    {panel.content()}
                </div>
                <Button
                    caption='Закрыть'
                    type='yellow'
                    onClick={this.closePanel}
                    className={styles['panel-close']}
                />
            </div>
        )
    };

    closePanel = () => {
        const { onChangeOpenedPanel } = this.props;
        onChangeOpenedPanel(null);
    };
}

export default FloatPanels;
