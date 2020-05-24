import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withComponentMetas from '../withComponentMetas';
import styles from './ComponentSelect.module.css';

class ComponentSelect extends PureComponent {
    static propTypes = {
        componentMetas: PropTypes.object,
        onSelect: PropTypes.func,
        additions: PropTypes.array
    };

    render = () => {
        const { componentMetas, onSelect, additions } = this.props;

        return (
            <>
                {Object.keys(componentMetas).map(key => {
                    const meta = componentMetas[key];
                    return meta.disabled ? null : (
                        <div
                            key={meta.key}
                            className={styles['component-select-item']}
                            onClick={() => { onSelect(meta.key, meta.defaultProps) }}>
                            {meta.name || meta.key}
                        </div>
                    );
                })}
                {additions ? additions.map(addition => {
                    return (
                        <div
                            key={addition.key}
                            className={styles['component-select-item']}
                            onClick={() => { onSelect(addition.key) }}>
                            {addition.name}
                        </div>
                    );
                }) : null}
            </>
        );
    };
}

export default withComponentMetas(ComponentSelect);
