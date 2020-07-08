import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import withComponentMetas from '../withComponentMetas';
import styles from './ComponentEditor.module.css';

class ComponentEditor extends PureComponent {
    static propTypes = {
        componentId: PropTypes.string,
        componentProps: PropTypes.object,
        onChangeProps: PropTypes.func,
        modifyProps: PropTypes.func,
        onlyEditableOptions: PropTypes.bool,

        // withComponentMeta
        componentMetas: PropTypes.object
    };

    static defaultProps = {
        componentProps: {}
    };

    render = () => {
        const { componentId, componentMetas, componentProps, onChangeProps, modifyProps, onlyEditableOptions } = this.props;

        if (!componentMetas[componentId]) {
            return null;
        }

        let props = componentMetas[componentId].props;

        if (onlyEditableOptions) {
            props = componentProps['__editable-options__'] && Object.keys(componentProps['__editable-options__']).length ?
                props.filter(prop => Boolean(componentProps['__editable-options__'][prop['_id']])) : [];
        }

        return (
            <div className={styles.form}>
                <Form
                    format={modifyProps ? modifyProps(props) : props}
                    value={componentProps}
                    onChange={(newProps, newErrors, newImages) => {
                        let prepareProps = {};

                        if (onlyEditableOptions) {
                            Object.keys(componentProps['__editable-options__']).forEach(key => {
                                prepareProps[key] = newProps[key];
                            });
                        } else {
                            prepareProps = newProps;
                        }

                        onChangeProps(prepareProps, newErrors, newImages);
                    }}
                    errors={{}}
                    images={this.props['__images__'] || {}} />
            </div>
        );
    };
}

export default withComponentMetas(ComponentEditor);
