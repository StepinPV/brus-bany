import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import FormProvider from '@plugins/Form/Provider';
import FormContext from '@plugins/Form/Context';
import Form from '@plugins/Form/Form';
// По итогу это должно быть не здесь
import { ThemeProvider } from '@emotion/react';

class App extends Component {
    static propTypes = {
        routes: PropTypes.array,
        preparedComponents: PropTypes.object,
        page: PropTypes.object,
        customComponents: PropTypes.array,
        pageTemplates: PropTypes.array,
        pages: PropTypes.array,
        pageFolders: PropTypes.array,
        theme: PropTypes.object,
        whatsAppWidget: PropTypes.object
    };

    render() {
        const { routes, theme } = this.props;

        return (
            <FormProvider>
                <ThemeProvider theme={theme}>
                    <Switch>
                        {routes.map(route => this.renderRoute(route))}
                    </Switch>
                    <FormContext.Consumer>
                        {({ visible, hideForm, source, title, data }) => {
                            return visible ? <Form onClose={hideForm} source={source} title={title} data={data} /> : null
                        }}
                    </FormContext.Consumer>
                </ThemeProvider>
            </FormProvider>
        );
    }

    renderRoute = (route) => {
        const { preparedComponents, page, customComponents, pageTemplates, pages, pageFolders, whatsAppWidget } = this.props;
        const Component = preparedComponents ? preparedComponents[route.id] : route.component;

        const renderProps = {};

        if (route.id === 'page-generator') {
            if (page) {
                renderProps.render = (props) => (
                    <Component
                        {...props}
                        page={page}
                        templates={pageTemplates}
                        pages={pages}
                        pageFolders={pageFolders}
                        whatsAppWidget={whatsAppWidget}
                        customComponents={customComponents} />
                )
            } else {
                renderProps.render = () => <h1 style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>404</h1>;
            }
        } else {
            renderProps.render = (props) => (
                <Component {...props} />
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

export default App;
