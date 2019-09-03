import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Notification from '../../plugins/Notifications/Notification';
import NotificationsProvider from '../../plugins/Notifications/Provider';
import NotificationsContext from '../../plugins/Notifications/Context';
import ModulesLoaderProvider from '../../plugins/ModulesLoader/Provider';
import FormProvider from '../../client/plugins/Form/Provider';
import FormContext from '../../client/plugins/Form/Context';
import Form from '../../client/plugins/Form/Form';
import ScrollToTop from '../ScrollToTop';
import styles from './App.module.css';

// TODO
// 1. Сделать 404
// 2. SSR
// 3. Удаление редусеров
// 4. Loader общий

class App extends Component {
    static propTypes = {
        routes: PropTypes.array
    };

    render() {
        const { routes } = this.props;

        return (
            <ModulesLoaderProvider routes={routes}>
                <NotificationsProvider>
                    <FormProvider>
                        <ScrollToTop>
                            <Fragment>
                                <Switch>
                                    {routes.map(route =>
                                        <Route
                                            key={route.id}
                                            path={route.path}
                                            exact={route.exact}
                                            component={route.component}/>)
                                    }
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
                                <FormContext>
                                    {({ visible, hideForm, source, title, data }) => {
                                        return visible ? <Form onClose={hideForm} source={source} title={title} data={data} /> : null
                                    }}
                                </FormContext>
                            </Fragment>
                        </ScrollToTop>
                    </FormProvider>
                </NotificationsProvider>
            </ModulesLoaderProvider>
        );
    }
}

export default App;
