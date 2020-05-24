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

class App extends Component {
    static propTypes = {
        routes: PropTypes.array,
        preparedComponents: PropTypes.object,
        page: PropTypes.object,
        customComponents: PropTypes.array,
        pageTemplates: PropTypes.array,
        location: PropTypes.object
    };

    render() {
        const { routes } = this.props;

        return (
            <NotificationsProvider>
                <FormProvider>
                    <>
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
                    </>
                </FormProvider>
            </NotificationsProvider>
        );
    }

    renderRoute = (route) => {
        const { preparedComponents, page, location, customComponents, pageTemplates } = this.props;
        const Component = preparedComponents ? preparedComponents[route.id] : route.component;

        const renderProps = {};

        if (route.id === 'page-generator') {
            if (page && page.url === location.pathname) {
                renderProps.render = (props) => (
                    <Component
                        {...props}
                        page={page}
                        pageTemplates={pageTemplates}
                        customComponents={customComponents} />
                )
            } else {
                renderProps.component = NotFound;
            }
        } else {
            renderProps.component = Component;
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
