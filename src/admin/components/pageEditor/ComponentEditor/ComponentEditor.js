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

        // withComponentMeta
        componentMetas: PropTypes.object
    };

    render = () => {
        const { componentId, componentMetas, componentProps, onChangeProps } = this.props;

        return (
            <div className={styles.form}>
                <Form
                    format={componentMetas[componentId].props}
                    value={componentProps}
                    onChange={onChangeProps}
                    errors={{}}
                    images={this.props['__images__'] || {}} />
            </div>
        );
    };
}

export default withComponentMetas(ComponentEditor);
