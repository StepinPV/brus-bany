import React, { PureComponent } from 'react';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';

const tiles = [{
    key: '/admin/layouts',
    type: 'link',
    title: 'Планировки',
    link: '/admin/layouts'
}, {
    key: '/admin/categories',
    type: 'link',
    title: 'Категории',
    link: '/admin/categories'
}, {
    key: '/admin/projects',
    type: 'link',
    title: 'Проекты',
    link: '/admin/projects'
}, {
    key: '/admin/articles',
    type: 'link',
    title: 'Статьи',
    link: '/admin/articles'
}, {
    key: '/admin/photos',
    type: 'link',
    title: 'Фотоотчеты',
    link: '/admin/photos'
}, {
    key: '/admin/pages',
    type: 'link',
    title: 'Страницы',
    link: '/admin/pages'
}];

class Admin extends PureComponent {
    render() {
        return (
          <>
            <Header />
            <Tiles items={tiles} />
          </>
        );
    }
}

export default Admin;
