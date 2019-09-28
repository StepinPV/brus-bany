import React, { PureComponent } from 'react';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../components/Breadcrumbs';

const tiles = [{
    key: '/admin/layouts',
    type: 'link',
    title: 'Планировки',
    link: '/admin/layouts'
}, {
    key: '/admin/materials',
    type: 'link',
    title: 'Стройматериалы',
    link: '/admin/materials'
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
}];

const breadcrumbsItems = [{
    title: 'Главная'
}];

class Admin extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <Breadcrumbs items={breadcrumbsItems} />
        <Tiles items={tiles} />
      </>
    );
  }
}

export default Admin;
