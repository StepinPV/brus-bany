import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Notification from '../../plugins/Notifications/Notification';
import NotificationsProvider from '../../plugins/Notifications/Provider';
import NotificationsContext from '../../plugins/Notifications/Context';
import FormProvider from '../../client/plugins/Form/Provider';
import FormContext from '../../client/plugins/Form/Context';
import Form from '../../client/plugins/Form/Form';
import styles from './App.module.css';

const META = {
    title: 'Брус бани — строительство бань под ключ | купить недорого | проекты и цены | собственное производство',
    description: 'Срок строительства от 7 дней, работаем круглый год по всей России, гарантия 3 года. Привезем уже готовую или построим с нуля. Более 150 проектов бань. Возможна перепланировка, изменение комплектации. Скидки и акции.',
    keywords: 'Купить баню из бруса под ключ, Бани из бруса под ключ, мобильные бани, каркасные бани, бани из бруса, индивидуальный проект, купить баню'
};

class App extends Component {
    static propTypes = {
        routes: PropTypes.array,
        preparedComponents: PropTypes.object,
        simplePage: PropTypes.bool
    };

    render() {
        const { routes, simplePage } = this.props;

        return simplePage ? this.renderRoute(routes[0]) : (
            <NotificationsProvider>
                <FormProvider>
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
                </FormProvider>
            </NotificationsProvider>
        );
    }

    renderRoute = (route) => {
        const { preparedComponents } = this.props;

        return (
            <>
                <Helmet>
                    <title>{META.title}</title>
                    <meta name='description' content={META.description} />
                    <meta name='keywords' content={META.keywords} />
                    <meta property='og:title' content={META.title} />
                    <meta property='og:description' content={META.description} />
                    <meta property='og:image' content='https://brus-bany.ru/favicon-192x192.png' />
                    <meta property='og:image:width' content='192' />
                    <meta property='og:image:height' content='192' />
                    <meta property='og:type' content='website' />
                </Helmet>
                <Route
                    key={route.id}
                    path={route.path}
                    exact={route.exact}
                    component={preparedComponents ? preparedComponents[route.id] : route.component} />
            </>
        );
    }
}

export default App;
