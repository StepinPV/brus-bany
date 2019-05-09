import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withModulesLoader from '../../plugins/ModulesLoader/withModulesLoader';

class Link extends PureComponent {
    static propTypes = {
        to: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node,
        loadModule: PropTypes.func,
        history: PropTypes.object
    };

    componentDidMount() {
        const { loadModule, to, history } = this.props;

        this.handleClick = (e) => {
            e.preventDefault();

            loadModule(to, () => {
                history.push(to);
            });
        };

        this.ref.current.addEventListener('click', this.handleClick, true);
    }


    componentWillUnmount() {
        this.ref.current.removeEventListener('click', this.handleClick, true);
    }

    render() {
        const { to, className, children } = this.props;

        return <a ref={this.ref} href={to} className={className}>{children}</a>;
    }

    ref = React.createRef();
}

export default withRouter(withModulesLoader(Link));
