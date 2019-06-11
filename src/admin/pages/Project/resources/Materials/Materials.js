import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../../components/Input';
import Select from '../../../../../components/Select';
import withNotification from '../../../../../plugins/Notifications/withNotification';
import styles from './Materials.module.css';

class Materials extends PureComponent {
    static propTypes = {
        materials: PropTypes.array,
        data: PropTypes.object,
        onChange: PropTypes.func,
        showNotification: PropTypes.func

    };

    state = {
        editingItem: null
    };

    render() {
        const { editingItem } = this.state;
        const { materials, data } = this.props;

        return (
            <Fragment>
                <div className={styles.caption}>Стройматериалы</div>
                <div className={styles.items}>
                    {data ? Object.keys(data).map(id => {
                        const material = materials.find(material => material._id === id);

                        return (
                            <Fragment key={id}>
                                <div
                                    className={styles.item}
                                    onClick={() => { this.editItem(id) }}>
                                    <div className={styles.title}>{material.name}</div>
                                    <div className={styles.count}>{`${data[id]} (${material.dimension})`}</div>
                                    <div className={styles.price}>{`${data[id] * material.price} руб`}</div>
                                </div>
                                {editingItem && editingItem.id === id ? this.renderEditBlock() : null}
                            </Fragment>
                        );
                    }) : null}
                    {editingItem ? (
                        !editingItem.id ? this.renderEditBlock() : null
                    ) : (
                        <div className={styles.button} onClick={this.createItem}>Добавить стройматериал</div>
                    )}
                </div>
            </Fragment>
        );
    }

    renderEditBlock = () => {
        const { materials } = this.props;
        const { editingItem } = this.state;

        return (
            <Fragment>
                <div className={styles['editing-block']}>
                    <Select
                        title='Материал'
                        items={materials}
                        displayProperty='name'
                        keyProperty='_id'
                        selectedKey={editingItem.newId || editingItem.id}
                        onChange={this.handleItemMaterialChange}
                        required />
                    <div className={styles.input}>
                        <Input
                            value={editingItem.count}
                            title='Количество'
                            type='integer number'
                            required
                            onChange={this.handleItemCountChange}
                        />
                    </div>
                </div>
                <div className={styles.button} onClick={this.handleItemSave}>{editingItem.id ? 'Редактировать' : 'Добавить'}</div>
                {editingItem._id ? (
                    <div className={styles.button} onClick={this.handleItemDelete}>Удалить</div>
                ) : null}
            </Fragment>
        );
    };

    handleItemMaterialChange = (newId) => {
        const { data, showNotification } = this.props;
        const { editingItem } = this.state;

        if (data[newId]) {
            showNotification({ message: 'Материал уже используется', status: 'error' });
            return;
        }

        this.setState({ editingItem: { ...editingItem, newId } });
    };

    handleItemCountChange = (value) => {
        const { editingItem } = this.state;

        this.setState({
            editingItem: {
                ...editingItem,
                count: value
            }
        });
    };

    handleItemSave = () => {
        const { editingItem } = this.state;
        const { onChange, data } = this.props;

        const newData = { ...data };

        if ((editingItem.id || editingItem.newId) && editingItem.count && parseFloat(editingItem.count) > 0) {
            if (editingItem.id) {
                if (editingItem.newId) {
                    delete newData.id;
                    newData[editingItem.newId] = editingItem.count;
                } else {
                    newData[editingItem.id] = editingItem.count;
                }
            } else {
                newData[editingItem.newId] = editingItem.count;
            }

            onChange(newData);
            this.setState({ editingItem: null });
        }
    };

    handleItemDelete = () => {
        const { editingItem } = this.state;
        const { onChange, data } = this.props;

        const newData = { ...data };
        delete newData[editingItem.id];

        onChange(newData);
        this.setState({ editingItem: null });
    };

    editItem = (id) => {
        const { editingItem } = this.state;
        const { data } = this.props;

        if (editingItem && editingItem.id === id) {
            this.setState({ editingItem: null });
            return;
        }

        this.setState({
            editingItem: {
                id,
                count: data[id]
            }
        });
    };

    createItem = () => {
        this.setState({ editingItem: {} });
    };
}

export default withNotification(Materials);
