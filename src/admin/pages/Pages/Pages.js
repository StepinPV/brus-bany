import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Tiles from '../../components/Tiles';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { Link } from '../../../components/Button';
import styles from './Pages.module.css';
import { resetData, init } from './actions';

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Страницы'
}];

const loadingTile = {
    type: 'loading',
    key: 'loading'
};

class Pages extends PureComponent {
    static propTypes = {
        pages: PropTypes.array,
        isPagesFetch: PropTypes.bool,
        actions: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let newState = {};

        if (!prevState.tiles && nextProps.pages) {
            const tiles = nextProps.pages.map(item => {
                return {
                    key: item['_id'],
                    type: 'link',
                    title: item['name'] || item['url'],
                    link: `/admin/pages/page-${item['_id']}`
                }
            });

            newState = {
                ...newState,
                tiles
            }
        }

        if (!prevState.breadcrumbs && nextProps.folders) {
            const { match } = nextProps;
            let folderId = match.params.folderId;

            if (folderId) {
                let folders = [];

                do {
                    const f = nextProps.folders.find(folder => folder['_id'] === folderId);
                    folders.push(f)
                    folderId = f.folder;
                } while(folderId);

                const breadcrumbs = [breadcrumbsItems[0], {
                    title: breadcrumbsItems[1].title,
                    link: `${breadcrumbsItems[0].link}/pages`
                }];

                folders.reverse().forEach((f, index) => {
                    breadcrumbs.push({
                        title: f['name'],
                        link: index !== folders.length - 1 ? `${breadcrumbsItems[0].link}/pages/${f['_id']}` : null
                    })
                });

                newState = {
                   ...newState,
                    breadcrumbs
                }

            } else {
                newState = {
                    ...newState,
                    breadcrumbs: breadcrumbsItems
                }
            }

            if (!prevState.newFolderData && nextProps.folders) {
                const { match } = nextProps;
                let folderId = match.params.folderId;

                const folder = nextProps.folders.find(folder => folder['_id'] === folderId);

                if (folder) {
                    newState = {
                        ...newState,
                        newFolderData: folder
                    }
                }
            }
        }

        return newState;
    }

    state = {
        tiles: null,
        defaultTiles: [loadingTile],
        currentFolder: null,
        breadcrumbs: null,
        newFolderData: null
    };

    componentDidMount() {
        const { match, actions } = this.props;
        const { folderId } = match.params;

        actions.init(folderId);
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { tiles, defaultTiles, breadcrumbs } = this.state;
        const { match } = this.props;

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
        const { folders, match } = this.props;
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
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            resetData,
            init
        }, dispatch),
        dispatch
    };
}

function mapStateToProps(state) {
    const {
        pages, isPagesFetch, isPagesError,
        folders, isFoldersFetch, isFoldersError
    } = state['admin-pages'];

    return {
        pages, isPagesFetch, isPagesError,
        folders, isFoldersFetch, isFoldersError
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
