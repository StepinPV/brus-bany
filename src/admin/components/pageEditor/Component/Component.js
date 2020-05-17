import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import styles from './Component.module.css';

class Component extends PureComponent {
    static propTypes = {
        componentId: PropTypes.string,

        propsFormat: PropTypes.array,
        componentProps: PropTypes.object,
        onChangeProps: PropTypes.func,

        editorMode: PropTypes.bool,
        toggleEditorMode: PropTypes.func,

        operations: PropTypes.object,

        customComponents: PropTypes.array,
        instances: PropTypes.object
    };

    render = () => {
        const { toggleEditorMode, operations } = this.props;

        return (
            <Fragment>
                <div className={styles.component}>
                    <div className={styles.overlay} onClick={toggleEditorMode}>
                        {this.renderOperations()}
                    </div>
                    {this.renderComponent()}
                    { operations['addComponent'] ? <div className={styles.add} onClick={operations['addComponent']}>+</div> : null }
                </div>
                {this.renderEditorForm()}
            </Fragment>
        );
    };

    renderEditorForm = () => {
        const { editorMode, propsFormat, componentProps, onChangeProps } = this.props;

        return editorMode ? (
            <div className={styles.form}>
                <Form
                    format={propsFormat}
                    value={componentProps}
                    onChange={onChangeProps}
                    errors={{}}
                    images={this.props['__images__'] || {}} />
            </div>
        ) : null;
    }

    renderOperations = () => {
        const { operations } = this.props;

        const meta = [{
            id: 'moveBottom',
            caption: '▼'
        }, {
            id: 'moveUp',
            caption: '▲'
        }, {
            id: 'clone',
            caption: 'Дублировать'
        }, {
            id: 'delete',
            caption: '✗'
        }];

        return (
            <div className={styles.operations}>
                {meta.map(o => operations[o.id] ? (
                    <div key={o.id} className={styles.operation} onClick={operations[o.id]}>{o.caption}</div>
                ) : null)}
            </div>
        )
    }

    renderComponent = () => {
        const { customComponents, instances, componentId, componentProps } = this.props;

        const Component = instances[componentId];

        if (Component) {
            return <Component {...componentProps} __images__={this.props['__images__'] || {}} />;
        }

        const customComponent = customComponents.find(c => c['_id'] === componentId);

        return customComponent ? (
            <>
                {customComponent.config.components.map(c => {
                    const Component = instances[c.componentId];
                    return Component ? <Component {...c.props} __images__={customComponent.config['__images__'] || {}} /> : null;
                })}
            </>
        ) : null;
    };
}

export default Component;
