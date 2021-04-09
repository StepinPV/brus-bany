import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withComponentMetas from '../withComponentMetas';
import styles from './ComponentSelect.module.css';

class ComponentSelect extends PureComponent {
    static propTypes = {
        componentMetas: PropTypes.object,
        onSelect: PropTypes.func,
        additions: PropTypes.array,
        type: PropTypes.string
    };

    render = () => {
        const { componentMetas, onSelect, additions, type } = this.props;

        let savedComponent = localStorage.getItem('PAGE_EDITOR_COMPONENT_BUFFER');
        if (savedComponent) {
            savedComponent = JSON.parse(savedComponent);
        }

        return (
            <>
                {savedComponent ? (
                    <div
                        key='BUFFER'
                        className={styles['component-select-item']}
                        onClick={() => { onSelect(savedComponent.componentId, savedComponent.props) }}>
                        Вставить из буфера
                    </div>
                ) : null}
                {Object.keys(componentMetas[type]).map(key => {
                    const meta = componentMetas[type][key];
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
