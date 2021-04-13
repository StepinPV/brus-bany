import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import FormProvider from '@plugins/Form/Provider';
import FormContext from '@plugins/Form/Context';
import Form from '@plugins/Form/Form';
import NotFound from '../NotFound';
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
