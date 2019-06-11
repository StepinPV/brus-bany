import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../../components/Input';
import Select from '../../../../../components/Select';
import layoutFormat from '../../../../formats/layout';
import withNotification from '../../../../../plugins/Notifications/withNotification';
import styles from './Filters.module.css';

class Filters extends PureComponent {
    static propTypes = {
        data: PropTypes.array,
        onChange: PropTypes.func,
        showNotification: PropTypes.func

    };

    state = {
        editingItem: null,
        editingIndex: null
    };

    render() {
        const { editingItem, editingIndex } = this.state;
        const { data } = this.props;

        return (
            <Fragment>
                <div className={styles.caption}>Фильтры</div>
                <div className={styles.items}>
                    {data ? data.map(({ id, name }, index) => {
                        return (
                            <Fragment key={id}>
                                <div
                                    className={styles.item}
                                    onClick={() => { this.editItem(index) }}>
                                    <div className={styles.title}>{id}</div>
                                    <div className={styles.title}>{name}</div>
                                </div>
                                {editingIndex !== null && editingIndex === index ? this.renderEditBlock() : null}
                            </Fragment>
                        );
                    }) : null}
                    {editingItem ? (
                        editingIndex === null ? this.renderEditBlock() : null
                    ) : (
                        <div className={styles.button} onClick={this.createItem}>Добавить фильтр</div>
                    )}
                </div>
            </Fragment>
        );
    }

    renderEditBlock = () => {
        const { editingItem, editingIndex } = this.state;

        return (
            <Fragment>
                <div className={styles['editing-block']}>
                    <div className={styles.input}>
                        <Input
                            value={editingItem.id}
                            title='ID'
                            type='string'
                            required
                            onChange={this.handleItemIdChange}
                        />
                    </div>
                    <div className={styles.input}>
                        <Input
                            value={editingItem.name}
                            title='Имя'
                            type='string'
                            required
                            onChange={this.handleItemNameChange}
                        />
                    </div>
                    <div className={styles.input}>
                        <Input
                            value={editingItem.condition}
                            title='Условие'
                            type='string'
                            required
                            onChange={this.handleItemConditionChange}
                        />
                    </div>
                    {this.renderLayoutVariables()}
                </div>
                <div className={styles.button} onClick={this.handleItemSave}>Сохранить</div>
                {editingIndex !== null ? (
                    <div className={styles.button} onClick={this.handleItemDelete}>Удалить</div>
                ) : null}
            </Fragment>
        );
    };

    renderLayoutVariables = () => {
        const { selectedLayoutVariableId } = this.state;

        const handleChange = id => {
            this.setState({
                selectedLayoutVariableId: id
            });
        };

        return (
            <Fragment>
                <div className={styles['variables-caption']}>Переменные для формулы: </div>
                {this.renderSubVariables(layoutFormat, selectedLayoutVariableId, handleChange, '')}
            </Fragment>
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
            <Fragment>
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
            </Fragment>
        )
    };

    handleItemIdChange = (newId) => {
        const { editingItem } = this.state;
        this.setState({ editingItem: { ...editingItem, id: newId } });
    };

    handleItemNameChange = (newName) => {
        const { editingItem } = this.state;
        this.setState({ editingItem: { ...editingItem, name: newName } });
    };

    handleItemConditionChange = (newCondition) => {
        const { editingItem } = this.state;
        this.setState({ editingItem: { ...editingItem, condition: newCondition } });
    };

    handleItemSave = () => {
        const {editingItem, editingIndex} = this.state;
        const {onChange, data, showNotification} = this.props;

        if (!editingItem.id) {
            showNotification({message: 'ID обязательно', status: 'error'});
            return;
        }

        if (!editingItem.name) {
            showNotification({message: 'Имя обязательно', status: 'error'});
            return;
        }

        if (!editingItem.condition) {
            showNotification({message: 'Условие обязательно', status: 'error'});
            return;
        }

        const match = data.find((filter, index) => filter.id === editingItem.id && (editingIndex !== index || editingIndex == null));

        if (match) {
            showNotification({message: 'Фильтр уже используется', status: 'error'});
            return;
        }

        const newData = [...data];

        if (editingIndex !== null) {
            const filter = data.find((filter, index) => editingIndex === index);

            filter.id = editingItem.id;
            filter.name = editingItem.name;
            filter.condition = editingItem.condition;
        } else {
            newData.push(editingItem);
        }

        onChange(newData);
        this.setState({editingItem: null, editingIndex: null});
    };

    handleItemDelete = () => {
        const { editingItem } = this.state;
        const { onChange, data } = this.props;

        const newData = data.filter(filter => filter.id !== editingItem.id);

        onChange(newData);
        this.setState({ editingItem: null, editingIndex: null });
    };

    editItem = (index) => {
        const { editingIndex } = this.state;
        const { data } = this.props;

        if (editingIndex !== null && editingIndex === index) {
            this.setState({ editingIndex: null, editingItem: null });
            return;
        }

        this.setState({
            editingIndex: index,
            editingItem: data[index]
        });
    };

    createItem = () => {
        this.setState({ editingIndex: null, editingItem: {} });
    };
}

export default withNotification(Filters);
