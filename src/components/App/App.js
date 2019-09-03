import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Notification from '../../plugins/Notifications/Notification';
import NotificationsProvider from '../../plugins/Notifications/Provider';
import NotificationsContext from '../../plugins/Notifications/Context';
import FormProvider from '../../client/plugins/Form/Provider';
import FormContext from '../../client/plugins/Form/Context';
import Form from '../../client/plugins/Form/Form';
import styles from './App.module.css';

// TODO
// 1. Сделать 404
// 2. SSR

class App extends Component {
    static propTypes = {
        routes: PropTypes.array
    };

    render() {
        const { routes } = this.props;

        return (
            <NotificationsProvider>
                <FormProvider>
                    <>
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
}

export default App;
