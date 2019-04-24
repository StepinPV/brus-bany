import React, { PureComponent, Fragment } from 'react';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../components/Breadcrumbs';

const tiles = [{
    key: '/admin/layouts',
    type: 'link',
    title: 'Планировки',
    link: '/admin/layouts'
}];

const breadcrumbsItems = [{
    title: 'Главная'
}];

class Admin extends PureComponent {
  render() {
    return (
      <Fragment>
        <Header />
        <Breadcrumbs items={breadcrumbsItems}/>
        <Tiles items={tiles} />
      </Fragment>
    );
  }
}

export default Admin;
