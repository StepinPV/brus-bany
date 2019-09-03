import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../../components/Input';
import Select from '../../../../../components/Select';
import styles from './Items.module.css';

class Items extends PureComponent {
    static propTypes = {
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
            <>
                <div className={styles.items}>
                    {materials ? materials.map(({ _id, name, dimension, price }) => (
                        <Fragment key={_id}>
                            <div
                                className={styles.item}
                                onClick={() => { this.editItem(_id) }}>
                                <div className={styles.title}>{name}</div>
                                <div className={styles.price}>{`${price} руб`}</div>
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
            </>
        );
    }

    renderEditBlock = () => {
        const { editingItem } = this.state;

        return (
            <>
                <div className={styles['editing-block']}>
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
                        <Select
                            title='Размерность'
                            items={[{ name: 'ед' }, { name: 'кг' }]}
                            displayProperty='name'
                            keyProperty='name'
                            selectedKey={editingItem.dimension}
                            onChange={this.handleItemDimensionChange}
                            required />
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
            </>
        );
    };

    handleItemDimensionChange = (value) => {
        const { editingItem } = this.state;

        this.setState({
            editingItem: {
                ...editingItem,
                dimension: value
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

        this.setState({ editingItem: null });
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
