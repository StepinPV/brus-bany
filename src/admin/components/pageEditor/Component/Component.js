import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import * as components from '@constructor-components';
import withComponentMetas from '../withComponentMetas';
import withCustomComponents from '../withCustomComponents';
import styles from './Component.module.css';

class Component extends PureComponent {
    static propTypes = {
        componentId: PropTypes.string,

        componentProps: PropTypes.object,
        onChangeProps: PropTypes.func,

        editorMode: PropTypes.bool,
        toggleEditorMode: PropTypes.func,

        operations: PropTypes.object,

        // withCustomComponents
        customComponents: PropTypes.array,
        loadCustomComponents: PropTypes.func,

        // withComponentMeta
        componentMetas: PropTypes.object
    };

    componentDidMount() {
        const { customComponents, loadCustomComponents } = this.props;

        if (!customComponents) {
            loadCustomComponents();
        }
    }

    render = () => {
        const { toggleEditorMode, operations, componentId, componentProps } = this.props;

        return (
            <Fragment>
                <div className={styles.component}>
                    <div className={styles.overlay} onClick={toggleEditorMode}>
                        {this.renderOperations()}
                    </div>
                    {this.renderComponent(componentId, componentProps, this.props['__images__'])}
                    { operations['addComponent'] ? <div className={styles.add} onClick={operations['addComponent']}>+</div> : null }
                </div>
                {this.renderEditorForm()}
            </Fragment>
        );
    };

    renderEditorForm = () => {
        const { componentId, editorMode, componentMetas, componentProps, onChangeProps } = this.props;

        return editorMode && componentMetas[componentId] ? (
            <div className={styles.form}>
                <Form
                    format={componentMetas[componentId].props}
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
                    <div key={o.id} className={styles.operation} onClick={(e) => {
                        e.stopPropagation();
                        operations[o.id]();
                    }}>{o.caption}</div>
                ) : null)}
            </div>
        )
    }

    renderComponent = (componentId, props, __images__) => {
        const { customComponents } = this.props;

        if (components[componentId]) {
            const Component = components[componentId];

            return <Component {...props} __images__={__images__ || {}} />;
        }

        if (customComponents) {
            const customComponent = customComponents.find(c => c['_id'] === componentId);

            if (customComponent && customComponent.config && customComponent.config.components) {
                return customComponent.config.components.map(component => this.renderComponent(component.componentId, component.props, customComponent.config['__images__']));
            }
        }

        return null;
    };
}

export default withComponentMetas(withCustomComponents(Component));
