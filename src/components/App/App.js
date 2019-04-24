import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
    static propTypes = {
        routes: PropTypes.array
    };

    render() {
        const { routes } = this.props;

        return (
            <Switch>
                {routes.map(route =>
                    <Route
                        key={route.id}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}/>)
                }
            </Switch>
        );
    }
}

export default App;
