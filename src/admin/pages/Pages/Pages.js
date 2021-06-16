import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { Link } from '../../../components/Button';
import renderDate from '@utils/RenderDate';
import styles from './Pages.module.css';
import axios from "axios";

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}];

class Pages extends PureComponent {
    state = {
        tiles: null,
        breadcrumbs: null
    };

    componentDidMount() {
        this.update();
    }

    render() {
        const { breadcrumbs, folderId } = this.state;

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
                    {folderId ? (
                        <Link
                            href={`/admin/pages/folder-${folderId}`}
                            className={styles['control-panel-button']}
                            onClick={() => {}}
                            size='s'
                            caption='Настроить папку'
                            type='yellow' />
                    ) : null}
                </div>
                {this.renderFolders()}
                {this.renderPages()}
            </>
        );
    }

    renderPages = () => {
        const { pages } = this.state;

        return pages ? (
            <div className={styles.pages}>
                {pages.map(page => (
                    <a
                        key={page['_id']}
                        href={`/admin/pages/page-${page['_id']}`}
                        className={styles.page}>
                        <div className={styles['page-name']}>{page['name'] || page['url']}</div>
                        <div className={styles['page-updated']}>Обновлена: {renderDate(new Date(page['updated']))}</div>
                    </a>
                ))}
            </div>
        ) : null;
    }

    renderFolders = () => {
        const { match } = this.props;
        const { folders } = this.state;
        const { folderId } = match.params;

        return folders ? (
            <div className={styles['container']}>
                {folders.filter(f => !f.folder && !folderId || f.folder === folderId).map(folder => (
                    <a className={styles.folder} href={`/admin/pages/${folder['_id']}`}>
                        📂&#8194;{folder.name}
                    </a>
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

        const newState = { folders };

        newState.pages = pages.sort((page1, page2) => {
            if (page1.title > page2.title) return 1;
            if (page1.title === page2.title) return 0;
            return -1;
        });

        if (folderId) {
            newState.folderId = folderId;
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
