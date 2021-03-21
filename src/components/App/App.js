import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import Notification from '../../plugins/Notifications/Notification';
import NotificationsProvider from '../../plugins/Notifications/Provider';
import NotificationsContext from '../../plugins/Notifications/Context';
import FormProvider from '../../client/plugins/Form/Provider';
import FormContext from '../../client/plugins/Form/Context';
import Form from '../../client/plugins/Form/Form';
import NotFound from '../NotFound';
import styles from './App.module.css';
// По итогу это должно быть не здесь
import { ThemeProvider } from 'emotion-theming';
import theme from '../../constructorComponents/theme';

class App extends Component {
    static propTypes = {
        routes: PropTypes.array,
        preparedComponents: PropTypes.object,
        page: PropTypes.object,
        customComponents: PropTypes.array,
        pageTemplates: PropTypes.array,
        pages: PropTypes.array,
        pageFolders: PropTypes.array,
        location: PropTypes.object
    };

    render() {
        const { routes } = this.props;

        return (
            <NotificationsProvider>
                <FormProvider>
                    <ThemeProvider theme={theme}>
                        <Switch>
                            {routes.map(route => this.renderRoute(route))}
                        </Switch>
                        <NotificationsContext.Consumer>
                            {({notification}) => {
                                return notification ? (
                                    <div className={styles.notification}>
                                        <Notification notification={notification} />
                                    </div>
                                ) : null;
                            }}
                        </NotificationsContext.Consumer>
                        <FormContext.Consumer>
                            {({ visible, hideForm, source, title, data }) => {
                                return visible ? <Form onClose={hideForm} source={source} title={title} data={data} /> : null
                            }}
                        </FormContext.Consumer>
                    </ThemeProvider>
                </FormProvider>
            </NotificationsProvider>
        );
    }

    renderRoute = (route) => {
        const { preparedComponents, page, location, customComponents, pageTemplates, pages, pageFolders } = this.props;
        const Component = preparedComponents ? preparedComponents[route.id] : route.component;

        const renderProps = {};

        if (route.id === 'page-generator') {
            if (page && page.url === location.pathname) {
                renderProps.render = (props) => (
                    <Component
                        {...props}
                        page={page}
                        templates={pageTemplates}
                        pages={pages}
                        pageFolders={pageFolders}
                        customComponents={customComponents} />
                )
            } else {
                renderProps.render = (props) => <NotFound {...props} customComponents={customComponents} />;
            }
        } else {
            renderProps.render = (props) => (
                <Component
                    {...props}
                    pages={pages}
                    customComponents={customComponents}
                    pageFolders={pageFolders} />
            );
        }

        return (
            <Route
                key={route.id}
                path={route.path}
                exact={route.exact}
                {...renderProps} />
        );
    }
}

export default withRouter(App);
