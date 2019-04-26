import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Notification from '../../plugins/Notifications/Notification';
import NotificationsProvider from '../../plugins/Notifications/Provider';
import NotificationsContext from '../../plugins/Notifications/Context';
import styles from './App.module.css';

// 1. Сделать 404
// 2. SSR
// 3. Удаление редусеров
// 4. Loader общий
// 5. Удаление планировок

class App extends Component {
    static propTypes = {
        routes: PropTypes.array
    };

    render() {
        const { routes } = this.props;

        return (
            <NotificationsProvider>
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
                </Fragment>
            </NotificationsProvider>
        );
    }
}

export default App;
