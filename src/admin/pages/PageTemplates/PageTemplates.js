import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../../components/Breadcrumbs';
import axios from "axios";

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Шаблоны страниц'
}];

const addTile = {
    type: 'add',
    link: '/admin/page-templates/add',
    key: '/admin/page-templates/add'
};

class PageTemplates extends PureComponent {
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
        const res = await axios.get('/api/page-templates');
        const templates = res.data.data;

        const tiles = templates.map(item => {
            return {
                key: item['_id'],
                type: 'link',
                title: item.name,
                link: `/admin/page-templates/${item['_id']}`
            }
        });

        this.setState({ data: templates, tiles: [addTile, ...tiles] });
    }
}

export default PageTemplates;
