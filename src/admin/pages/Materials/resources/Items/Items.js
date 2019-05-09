import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../components/Input';
import styles from './Items.module.css';

class Items extends PureComponent {
    static defaultProps = {
        materials: PropTypes.array,
        createMaterial: PropTypes.func,
        updateMaterial: PropTypes.func,
        deleteMaterial: PropTypes.func,

    };

    state = {
        editingItem: null
    };

    render() {
        const { editingItem } = this.state;
        const { materials } = this.props;

        return (
            <Fragment>
                <div className={styles.items}>
                    {materials ? materials.map(({ _id, name, dimension, price }) => (
                        <Fragment key={_id}>
                            <div
                                className={styles.item}
                                onClick={() => { this.editItem(_id) }}>
                                <div className={styles.title}>{name}</div>
                                <div className={styles.price}>{price}</div>
                                <div className={styles.dimension}>{dimension}</div>
                            </div>
                            {editingItem && editingItem._id === _id ? this.renderEditBlock() : null}
                        </Fragment>
                    )) : null}
                    {editingItem ? (
                        !editingItem._id ? this.renderEditBlock() : null
                    ) : (
                        <div className={styles.button} onClick={this.createItem}>Создать наименование</div>
                    )}
                </div>
            </Fragment>
        );
    }

    renderEditBlock = () => {
        const { editingItem } = this.state;

        return (
            <Fragment>
                <div className={styles['editing-block']}>
                    <select
                        value={editingItem.dimension}
                        onChange={this.handleItemDimensionChange}>
                        {!editingItem.dimension ? <option>Не выбрано</option> : null}
                        <option value="Штука">Штука</option>
                        <option value="Килограмм">Килограмм</option>
                    </select>
                    <div className={styles.input}>
                        <Input
                            value={editingItem.name}
                            title='Наименование'
                            type='string'
                            required
                            onChange={this.handleItemNameChange}
                        />
                    </div>
                    <div className={styles.input}>
                        <Input
                            value={editingItem.price}
                            title='Цена'
                            type='float number'
                            required
                            onChange={this.handleItemPriceChange}
                        />
                    </div>
                </div>
                <div className={styles.button} onClick={this.handleItemSave}>{editingItem._id ? 'Редактировать' : 'Создать'}</div>
                {editingItem._id ? (
                    <div className={styles.button} onClick={this.handleItemDelete}>Удалить</div>
                ) : null}
            </Fragment>
        );
    };

    handleItemDimensionChange = (e) => {
        const { editingItem } = this.state;

        this.setState({
            editingItem: {
                ...editingItem,
                dimension: e.target.value
            }
        })
    };

    handleItemNameChange = (value) => {
        const { editingItem } = this.state;

        this.setState({
            editingItem: {
                ...editingItem,
                name: value
            }
        });
    };

    handleItemPriceChange = (value) => {
        const { editingItem } = this.state;

        this.setState({
            editingItem: {
                ...editingItem,
                price: value
            }
        });
    };

    handleItemSave = () => {
        const { editingItem } = this.state;
        const { createMaterial, updateMaterial } = this.props;

        if (editingItem.name && editingItem.price && editingItem.dimension) {
            if (editingItem._id) {
                updateMaterial(editingItem);
            } else {
                createMaterial(editingItem);
            }

            this.setState({ editingItem: null });
        }
    };

    handleItemDelete = () => {
        const { editingItem } = this.state;
        const { deleteMaterial } = this.props;
        deleteMaterial(editingItem);
    };

    editItem = (_id) => {
        const { editingItem } = this.state;
        const { materials } = this.props;

        if (editingItem && editingItem._id === _id) {
            this.setState({ editingItem: null });
            return;
        }

        const item = materials.find(item => item._id === _id);

        this.setState({ editingItem: item });
    };

    createItem = () => {
        this.setState({ editingItem: {} });
    };
}

export default Items;
