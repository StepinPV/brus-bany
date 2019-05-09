import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../components/Input';
import layoutFormat from '../../../../formats/layout';
import cx from 'classnames';
import styles from './Additions.module.css';

const getRandomId = () => Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

class Additions extends PureComponent {
    static defaultProps = {
        data: PropTypes.array,
        onChange: PropTypes.func
    };

    state = {
        editingGroup: null,
        editingAddition: null,
        selectedLayoutVariable: null
    };

    componentDidMount() {

    }

    render() {
        const {editingGroup, editingAddition} = this.state;
        const { data } = this.props;

        return (
            <Fragment>
                <div className={styles.caption}>Дополнения</div>
                <div className={styles.items}>
                    {data.map(({id, name, value}) => (
                        <Fragment key={id}>
                            <div className={cx(styles.header, styles.item, styles.title)} onClick={() => { this.editGroup(id) }}>
                                {name}
                            </div>
                            {editingGroup && editingGroup.id === id ? this.renderGroupEditBlock() : null}
                            {value && value.map(({name, type, id: additionId}) => (
                                <Fragment key={name}>
                                    <div
                                        className={cx(styles['sub-item'], styles.item)}
                                        onClick={() => { this.editAddition(id, additionId) }}>
                                        <div className={styles.type}>{type}</div>
                                        <div className={styles.title}>{name}</div>
                                    </div>
                                    {editingAddition && editingAddition.groupId === id && editingAddition.addition.id === additionId ? this.renderAdditionEditBlock() : null}
                                </Fragment>
                            ))}
                            {editingAddition ? (
                                editingAddition.groupId === id && !editingAddition.addition.id ? this.renderAdditionEditBlock() : null
                            ) : (
                                !editingGroup ? (
                                    <div className={styles.button} onClick={() => {
                                        this.startAddition(id)
                                    }}>Создать дополнение</div>
                                ) : null
                            )}
                        </Fragment>
                    ))}
                    {editingGroup ? (
                        !editingGroup.id ? this.renderGroupEditBlock() : null
                    ) : (
                        !editingAddition ? (
                            <div className={styles.button} onClick={this.startGroup}>Создать группу</div>
                        ) : null
                    )}
                </div>
            </Fragment>
        );
    }

    renderAdditionEditBlock = () => {
        const { editingAddition } = this.state;

        return (
            <Fragment>
                <div className={styles['editing-block']}>
                    <select
                        value={editingAddition.addition.type}
                        onChange={this.handleAdditionTypeChange}>
                        <option value="boolean">Boolean</option>
                        <option value="count">Count</option>
                    </select>
                    <div className={styles.input}>
                        <Input
                            value={editingAddition.addition.name}
                            title='Наименование'
                            type='string'
                            required
                            onChange={this.handleAdditionNameChange}
                        />
                    </div>
                    <div className={styles.input}>
                        <Input
                            value={editingAddition.addition.price}
                            title='Формула цены'
                            type='string'
                            required
                            onChange={this.handleAdditionPriceChange}
                        />
                    </div>
                    {this.renderLayoutVariables()}
                </div>
                <div className={styles.button} onClick={this.handleAdditionSave}>{`${editingAddition.addition.id ? 'Редактировать' : 'Создать'} дополнение`}</div>
                {editingAddition.addition.id ? (
                    <div className={styles.button} onClick={this.handleAdditionDelete}>{`Удалить дополнение`}</div>
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
                    <select value={id} onChange={(e) => {handleChange(e.target.value)}} className={styles['variables-select']}>
                        {!id ? <option key={null} value={null}>Не выбрано</option> : null}
                        {items.map(item => <option key={item._id} value={item._id}>{item.title}</option>)}
                    </select>
                    {selectedItem && selectedItem.type !== 'array' && selectedItem.type !== 'object' ? ` = {${beforeValue}${value}}` : null}
                </div>

                {selectedItem && selectedItem.format ? this.renderSubVariables(selectedItem.format, childrenId, handleChildrenId, `${beforeValue}${value}`) : null}
            </Fragment>
        )
    };

    renderGroupEditBlock = () => {
        const { editingGroup } = this.state;

        return (
            <Fragment>
                <div className={styles['editing-block']}>
                    <div className={styles.input}>
                        <Input
                            value={editingGroup.name}
                            title='Имя группы'
                            type='string'
                            required
                            onChange={this.handleGroupNameChange}
                        />
                    </div>
                </div>
                <div className={styles.button}
                     onClick={this.handleSaveGroup}>{`${editingGroup.id ? 'Редактировать' : 'Создать'} группу`}</div>
                {editingGroup.id ? (
                    <div className={styles.button} onClick={this.handleDeleteGroup}>{`Удалить группу`}</div>
                ) : null}
            </Fragment>
        );
    };

    handleGroupNameChange = (value) => {
        const {editingGroup} = this.state;

        this.setState({
            editingGroup: {
                ...editingGroup,
                name: value
            }
        });
    };

    handleSaveGroup = () => {
        const {editingGroup} = this.state;
        const { data, onChange } = this.props;
        const newData = [...data];

        if (!editingGroup.name) {
            return;
        }

        if (editingGroup.id) {
            const index = data.findIndex(item => item.id === editingGroup.id);
            newData.splice(index, 1, {...data[index], name: editingGroup.name});
        } else {
            newData.push({name: editingGroup.name, id: getRandomId()});
        }

        this.setState({ editingGroup: null });
        onChange(newData);
    };

    handleDeleteGroup = () => {
        const {editingGroup} = this.state;
        const { data, onChange } = this.props;
        const newData = [...data];

        const index = data.findIndex(item => item.id === editingGroup.id);
        newData.splice(index, 1);

        this.setState({editingGroup: null});
        onChange(newData);
    };

    handleAdditionTypeChange = (e) => {
        const {editingAddition} = this.state;

        this.setState({
            editingAddition: {
                ...editingAddition,
                addition: {
                    ...editingAddition.addition,
                    type: e.target.value
                }
            }
        })
    };

    handleAdditionNameChange = (value) => {
        const {editingAddition} = this.state;

        this.setState({
            editingAddition: {
                ...editingAddition,
                addition: {
                    ...editingAddition.addition,
                    name: value
                }
            }
        });
    };

    handleAdditionPriceChange = (value) => {
        const {editingAddition} = this.state;

        this.setState({
            editingAddition: {
                ...editingAddition,
                addition: {
                    ...editingAddition.addition,
                    price: value
                }
            }
        });
    };

    handleAdditionSave = () => {
        const {editingAddition} = this.state;
        const { data, onChange } = this.props;

        const newData = [...data];

        if (!editingAddition.addition.name) {
            return;
        }

        const index = data.findIndex(item => item.id === editingAddition.groupId);
        const newValue = [...(data[index].value || [])];

        if (editingAddition.addition.id) {
            const additionIndex = data[index].value.findIndex(addition => addition.id === editingAddition.addition.id);
            newValue.splice(additionIndex, 1, {
                ...newValue[additionIndex],
                name: editingAddition.addition.name,
                price: editingAddition.addition.price,
                type: editingAddition.addition.type
            });
        } else {
            newValue.push({
                ...editingAddition.addition,
                id: getRandomId()
            });
        }

        newData.splice(index, 1, {...data[index], value: newValue});

        this.setState({ editingAddition: null });
        onChange(newData);
    };

    handleAdditionDelete = () => {
        const { editingAddition } = this.state;
        const { data } = this.props;

        const newData = [...data];

        const index = data.findIndex(item => item.id === editingAddition.groupId);
        const additionIndex = data[index].value.findIndex(addition => addition.id === editingAddition.addition.id);
        const newValue = [...data[index].value];
        newValue.splice(additionIndex, 1);
        newData.splice(index, 1, {...data[index], value: newValue});

        this.setState({data: newData, editingAddition: null});
    };

    editGroup = (id) => {
        const {editingGroup} = this.state;
        const { data } = this.props;

        if (editingGroup && editingGroup.id === id) {
            this.setState({editingGroup: null, editingAddition: null});
            return;
        }

        const group = data.find(item => item.id === id);

        this.setState({editingGroup: group, editingAddition: null});
    };

    editAddition = (groupId, id) => {
        const {editingAddition} = this.state;
        const { data } = this.props;

        if (editingAddition && editingAddition.groupId === groupId && editingAddition.addition.id === id) {
            this.setState({editingGroup: null, editingAddition: null});
            return;
        }

        const group = data.find(item => item.id === groupId);
        const addition = group.value.find(item => item.id === id);

        this.setState({
            editingAddition: {
                groupId: groupId,
                addition
            },
            editingGroup: null
        });
    };

    startAddition = (groupId) => {
        this.setState({
            editingAddition: {
                groupId: groupId,
                addition: {
                    type: 'boolean'
                }
            },
            editingGroup: null
        });
    };

    startGroup = () => {
        this.setState({ editingGroup: {}, editingAddition: null });
    };
}

export default Additions;
