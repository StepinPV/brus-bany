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

const addTile = {
    type: 'add',
    link: '/admin/components/add',
    key: '/admin/components/add'
};

class Components extends PureComponent {
    state = {
        tiles: null
    };

    componentDidMount() {
        this.update();
    }

    render() {
        const { tiles } = this.state;

        return (
            <>
                <Header/>
                <Breadcrumbs items={breadcrumbsItems}/>
                <Tiles items={tiles || []} />
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
