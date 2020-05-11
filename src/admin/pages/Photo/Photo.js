import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Select from '../../../components/Select';
import {
    getReport,
    setReport,
    createReport,
    updateReport,
    getProjects,
    deleteReport,
    resetData,
} from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import Form from '../../components/Form';
import format from '../../formats/photo';
import styles from './Photo.module.css';
import {Button} from "../../../components/Button";

const breadcrumbs = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Фотоотчеты',
    link: '/admin/photos'
}];

const getAddModeBreadcrumbs = () => [...breadcrumbs, { title: 'Создание фотоотчета' }];
const getEditModeBreadcrumbs = () => [...breadcrumbs, { title: 'Редактирование фотоотчета' }];

class Photo extends PureComponent {
    static propTypes = {
        projects: PropTypes.array,

        report: PropTypes.object,
        isReportError: PropTypes.string,
        isReportFetch: PropTypes.bool,

        actions: PropTypes.object,
        match: PropTypes.object,
        showNotification: PropTypes.func,
        history: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { match } = nextProps;
        const addMode = match.params.id === 'add';

        if (prevState.addMode !== addMode) {
            return {
                addMode,
                breadcrumbs: addMode ? getAddModeBreadcrumbs() : getEditModeBreadcrumbs()
            }
        }

        return null;
    }

    state = {
        errors: {},
        breadcrumbs: getEditModeBreadcrumbs(),
        addMode: false
    };

    componentDidMount() {
        const { addMode } = this.state;
        const { match, actions } = this.props;
        const { categoryId, id } = match.params;

        if (addMode) {
            actions.setReport({ categoryId });
        } else {
            actions.getReport(id);
        }

        actions.getProjects(categoryId);
    }

    componentDidUpdate(prevProps, prevState) {
        const { addMode } = this.state;
        const { match, actions } = this.props;

        if (prevProps.match !== match && !addMode) {
            const { id } = match.params;
            actions.getReport(id);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isReportError } = this.props;
        const { breadcrumbs } = this.state;

        return (
            <>
                <Header />
                <Breadcrumbs items={breadcrumbs} />
                { isReportError ? <div className={styles.error}>{isReportError}</div> : this.renderContent() }
            </>
        );
    }

    renderContent = () => {
        const { addMode, errors } = this.state;
        const { report } = this.props;

        return report ? (
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    {this.renderProject()}
                    <Form format={format} value={report} onChange={this.handleChange} errors={errors} />

                    <Button
                        caption={addMode ? 'Создать' : 'Сохранить'}
                        type='yellow'
                        onClick={this.handleSave}
                        className={styles.button}
                    />
                    {!addMode ? (
                        <Button
                            caption='Удалить'
                            type='red'
                            onClick={this.handleDelete}
                            className={styles.button}
                        />
                    ) : null}
                </div>
            </div>
        ) : null;
    };

    renderProject = () => {
        const { report: { projectId }, projects } = this.props;
        const { errors } = this.state;

        if (!projects) {
            return null;
        }

        const items = projects.map(project => ({
            _id: project._id,
            title: project.layoutId.name
        }));

        return (
            <div className={styles.name}>
                <Select
                    title='Выберите проект'
                    items={items}
                    displayProperty='title'
                    keyProperty='_id'
                    selectedKey={projectId}
                    onChange={this.handleProject}
                    error={errors['projectId']} />
            </div>
        );
    };

    handleProject = (projectId) => {
        const { report, actions } = this.props;

        this.handleChange('projectId', { ...report, projectId });
        actions.setReport({ ...report, projectId });
        this.setState({
            errors: {
                ...this.state.errors,
                'projectId': null
            }
        });
    };

    handleChange = (report, newErrors ) => {
        const { actions } = this.props;

        this.setState({ errors: newErrors });
        actions.setReport(report);
    };

    handleSave = async () => {
        const { addMode } = this.state;
        const { showNotification, actions, history } = this.props;
        const errors = this.getErrors();

        if (errors) {
            showNotification({ message: 'Исправьте ошибки!', status: 'error' });
            this.setState({ errors });
            return;
        }

        const { message, status, data } = addMode ? await actions.createReport() : await actions.updateReport();

        showNotification({ message, status });

        switch(status){
            case 'success':
                if (addMode) {
                    history.push(`/admin/photos`);
                }
                break;
            case 'error':
                if (data && data.errors) {
                    this.setState({ errors: data.errors });
                }
                break;
            default:
                break;
        }
    };

    handleDelete = async () => {
        const { showNotification, actions, history } = this.props;

        if (window.confirm('Вы действительно хотите удалить фотоотчет?')) {
            const { message, status } = await actions.deleteReport();

            showNotification({ message, status });

            if (status === 'success') {
                history.push(`/admin/photos`);
            }
        }
    };

    getErrors = () => {
        const { report } = this.props;
        const errors = {};
        let hasErrors = false;

        if (!report.projectId) {
            errors['projectId'] = 'Выберите планировку!';
            hasErrors = true;
        }


        return hasErrors ? errors : null;
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
            getReport,
            setReport,
            createReport,
            updateReport,
            resetData,
            getProjects,
            deleteReport
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
    const { report, isReportFetch, isReportError, projects } = state['admin-photo'];

    return { report, isReportFetch, isReportError, projects };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Photo));
