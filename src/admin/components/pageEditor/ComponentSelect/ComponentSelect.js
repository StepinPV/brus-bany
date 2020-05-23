import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withComponentMetas from '../withComponentMetas';
import styles from './ComponentSelect.module.css';

class ComponentSelect extends PureComponent {
    static propTypes = {
        componentMetas: PropTypes.object,
        onSelect: PropTypes.func
    };

    render = () => {
        const { componentMetas, onSelect } = this.props;

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
            </>
        );
    };
}

export default withComponentMetas(ComponentSelect);
