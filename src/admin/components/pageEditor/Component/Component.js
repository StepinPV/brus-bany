import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import withComponentConstructor from '../../hocs/withComponentConstructor';
import withComponentMeta from '../../hocs/withComponentMeta';
import styles from './Component.module.css';

class Component extends PureComponent {
    static propTypes = {
        componentId: PropTypes.string,

        componentProps: PropTypes.object,
        onChangeProps: PropTypes.func,

        editorMode: PropTypes.bool,
        toggleEditorMode: PropTypes.func,

        operations: PropTypes.object,

        // withComponentConstructor
        componentConstructor: PropTypes.object,
        loadComponentConstructor: PropTypes.func,

        // withComponentMeta
        componentMeta: PropTypes.object,
        loadComponentMeta: PropTypes.func
    };

    componentDidMount() {
        const { instance, loadComponentConstructor } = this.props;

        if (!instance) {
            loadComponentConstructor();
        }
    }

    componentDidUpdate() {
        const { editorMode, componentMeta, loadComponentMeta } = this.props;

        if (editorMode && !componentMeta) {
            loadComponentMeta();
        }
    }

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
        const { editorMode, componentMeta, componentProps, onChangeProps } = this.props;

        return editorMode && componentMeta ? (
            <div className={styles.form}>
                <Form
                    format={componentMeta.props}
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

    renderComponent = () => {
        const { componentConstructor, componentProps } = this.props;
        const Component = componentConstructor;

        return Component ? <Component {...componentProps} __images__={this.props['__images__'] || {}} /> : null;
    };
}

export default withComponentMeta(withComponentConstructor(Component));
