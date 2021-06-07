import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../../components/Breadcrumbs';
import axios from 'axios';

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Компоненты'
}];

const loadingTile = {
    type: 'loading',
    key: 'loading'
};

const addTile = {
    type: 'add',
    link: '/admin/components/add',
    key: '/admin/components/add'
};

class Components extends PureComponent {
    state = {
        tiles: null,
        defaultTiles: [loadingTile]
    };

    componentDidMount() {
        this.update();
    }

    render() {
        const { tiles, defaultTiles } = this.state;

        return (
            <>
                <Header/>
                <Breadcrumbs items={breadcrumbsItems}/>
                <Tiles items={tiles || defaultTiles} />
            </>
        );
    }

    update = async () => {
        const res = await axios.get('/api/components');
        this.setState({ data: res.data.data });

        const tiles = res.data.data.map(item => {
            return {
                key: item['_id'],
                type: 'link',
                title: item.name,
                link: `/admin/components/${item['_id']}`
            }
        });

        this.setState({ tiles: [addTile, ...tiles] });
    };
}

export default Components;
