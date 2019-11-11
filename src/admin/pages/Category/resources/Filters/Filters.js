import React, {PureComponent} from 'react';
import Select from '../../../../../components/Select';
import layoutFormat from '../../../../formats/layout';
import styles from './Filters.module.css';

class Filters extends PureComponent {
    state = {
        selectedLayoutVariableId: null
    };

    render = () => {
        const { selectedLayoutVariableId } = this.state;

        const handleChange = id => {
            this.setState({
                selectedLayoutVariableId: id
            });
        };

        return (
            <>
                <div className={styles['variables-caption']}>Переменные для формулы: </div>
                {this.renderSubVariables(layoutFormat, selectedLayoutVariableId, handleChange, '')}
            </>
        );
    };

    renderSubVariables = (items, fullId, handleChange, beforeValue) => {
        let id, childrenId;

        if (fullId) {
            const separatorIndex = fullId.indexOf('.');
            id = separatorIndex !== -1 ? fullId.substr(0, separatorIndex) : fullId;
            childrenId = separatorIndex !== -1 ? fullId.substr(separatorIndex + 1, fullId.length) : null;
        }

        const selectedItem = items.find(item => id === item._id);

        const handleChildrenId = (newChildrenId) => {
            handleChange(`${id}.${newChildrenId}`);
        };

        const getValue = item => {
            switch (item.type) {
                case 'array': return `${item._id}[индекс].`;
                case 'object': return `${item._id}.`;
                default: return `${item._id}`;
            }
        };

        const value = selectedItem ? getValue(selectedItem) : null;

        return (
            <>
                <div className={styles.variables}>
                    <div className={styles['variables-select']}>
                        <Select
                            title='Тип'
                            items={items}
                            displayProperty='title'
                            keyProperty='_id'
                            selectedKey={id}
                            onChange={value => {handleChange(value)}}
                            required />
                    </div>
                    {selectedItem ? ` = params.${beforeValue}${value}` : null}
                </div>

                {selectedItem && selectedItem.format ? this.renderSubVariables(selectedItem.format, childrenId, handleChildrenId, `${beforeValue}${value}`) : null}
            </>
        )
    };
}

export default Filters;
