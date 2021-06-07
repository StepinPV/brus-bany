import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { Link } from '../../../components/Button';
import styles from './Pages.module.css';
import axios from "axios";

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}];

const loadingTile = {
    type: 'loading',
    key: 'loading'
};

class Pages extends PureComponent {
    state = {
        tiles: null,
        defaultTiles: [loadingTile],
        breadcrumbs: null
    };

    componentDidMount() {
        this.update();
    }

    render() {
        const { tiles, defaultTiles, breadcrumbs } = this.state;

        return (
            <>
                <Header/>
                <Breadcrumbs items={breadcrumbs || breadcrumbsItems} />
                <div className={styles['container']}>
                    <Link
                        href='/admin/pages/folder-add'
                        className={styles['control-panel-button']}
                        onClick={() => {}}
                        size='s'
                        caption='Создать папку'
                        type='yellow' />
                    <Link
                        href='/admin/pages/page-add'
                        className={styles['control-panel-button']}
                        onClick={() => {}}
                        size='s'
                        caption='Создать страницу'
                        type='yellow' />
                </div>
                {this.renderFolders()}
                <Tiles items={tiles || defaultTiles} />
            </>
        );
    }

    renderFolders = () => {
        const { match } = this.props;
        const { folders } = this.state;
        const { folderId } = match.params;

        return folders ? (
            <div className={styles['container']}>
                {folders.filter(f => !f.folder && !folderId || f.folder === folderId).map(folder => (
                    <div className={styles.folder}>
                        <a className={styles['folder-content']} href={`/admin/pages/${folder['_id']}`}>
                            {folder.name}
                        </a>
                        <Link
                            className={styles['folder-button']}
                            href={`/admin/pages/folder-${folder['_id']}`}
                            size='s'
                            caption='Настройки'
                            type='yellow' />
                    </div>
                ))}
            </div>
        ) : null;
    };

    update = async () => {
        const { match } = this.props;
        const { folderId } = match.params;

        const [resPages, resFolders] = await Promise.all([axios.get('/api/pages'), axios.get('/api/page-folders')]);

        const pages = resPages.data.data.filter(page => !page.config.folder && !folderId || page.config.folder === folderId);
        const folders = resFolders.data.data;

        const newState = { pages, folders };

        newState.tiles = pages.map(item => {
            return {
                key: item['_id'],
                type: 'link',
                title: item['name'] || item['url'],
                link: `/admin/pages/page-${item['_id']}`
            }
        }).sort((item1, item2) => {
            if (item1.title > item2.title) return 1;
            if (item1.title === item2.title) return 0;
            return -1;
        });

        if (folderId) {
            let _folders = [];

            let _folderId = folderId;
            do {
                const f = folders.find(folder => folder['_id'] === _folderId);
                _folders.push(f)
                _folderId = f.folder;
            } while(_folderId);

            const breadcrumbs = [...breadcrumbsItems];

            _folders.reverse().forEach((f, index) => {
                breadcrumbs.push({
                    title: f['name'],
                    link: index !== folders.length - 1 ? `${breadcrumbsItems[0].link}/pages/${f['_id']}` : null
                })
            });

            newState.breadcrumbs = breadcrumbs;
        } else {
            newState.breadcrumbs = breadcrumbsItems;
        }

        this.setState(newState);
    }
}

export default Pages;
