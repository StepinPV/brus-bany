import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { resetData, init, getReports } from './actions';
import Select from '../../../components/Select';
import styles from './Photos.module.css';
import PhotoCard from "../../../components/PhotoCard";
import AddCard from "../../../components/AddCard";
import CardList from "../../../components/CardList/CardList";

const breadcrumbsItems = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Фотоотчеты'
}];

class Photos extends PureComponent {
    static propTypes = {
        categories: PropTypes.array,
        reports: PropTypes.array,
        actions: PropTypes.object
    };

    state = {};

    componentDidMount() {
        const { actions } = this.props;
        actions.init();
    }

    componentDidUpdate(prevProps, prevState) {
        const { categoryId } = this.state;
        const { actions } = this.props;

        if (categoryId && categoryId !== prevState.categoryId) {
            actions.getReports(categoryId);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { categories, reports } = this.props;
        const { categoryId } = this.state;

        return (
            <>
                <Header/>
                <Breadcrumbs items={breadcrumbsItems}/>

                {categories ? (
                    <div className={styles.select}>
                        <Select
                            title='Выберите категорию'
                            items={categories}
                            keyProperty='_id'
                            displayProperty='name'
                            selectedKey={categoryId}
                            onChange={this.handleCategoryChange}
                        />
                    </div>
                ) : null}

                {reports ? this.renderPhotos() : null}

            </>
        );
    }

    renderPhotos = () => {
        const { reports } = this.props;
        const { categoryId } = this.state;

        const items = reports.map(photo => ({
            id: photo._id,
            element: (
                <PhotoCard
                    photo={photo}
                    category={photo.projectId.categoryId}
                    layout={photo.projectId.layoutId}
                    link={`/admin/photos/${categoryId}/${photo['_id']}`}
                />
            )
        }));

        items.unshift({
            id: 'add',
            element: (
                <AddCard
                    link={`/admin/photos/${categoryId}/add`}
                />
            )
        });

        return <CardList items={items} />;
    };

    handleCategoryChange = (categoryId) => {
        this.setState({ categoryId });
    }
}

/**
 * mapDispatchToProps
 * @param {*} dispatch
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            resetData,
            init,
            getReports
        }, dispatch),
        dispatch
    };
}

/**
 * mapStateToProps
 * @param {*} state
 * @returns {Object}
 */
function mapStateToProps(state) {
    const {categories, reports} = state['admin-photos'];

    return {categories, reports};
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
