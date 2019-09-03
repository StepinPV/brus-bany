import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import cx from 'classnames';

let modalRoot = null;
const MIN_Z_INDEX = 6000;

if (!process.env.ssr) {
    modalRoot = document.getElementById('modal');
}

/**
 * Хак, чтобы при скролле модального окна не скролился body
 * @param {boolean} fixed
 */
function fixedBody(fixed) {
    document.body.style.overflow = fixed ? 'hidden' : 'auto';
    document.body.style.top = fixed ? 'auto' : '';
    document.body.style.bottom = fixed ? 'auto' : '';
    document.body.style.left = fixed ? 'auto' : '';
    document.body.style.right = fixed ? 'auto' : '';
    document.body.style.width = fixed ? '100%' : '';
}

class Modal extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        onOverlayClick: PropTypes.func
    };

    static windowCount = 0;

    constructor(props) {
        super(props);

        if (!process.env.ssr) {
            if (modalRoot) {
                this.el = document.createElement('div');
                this.el.className = cx(styles.modal, styles.overlay);
            }

            Modal.windowCount++;
        }
    }

    componentDidMount() {
        if (modalRoot) {
            modalRoot.appendChild(this.el);
            this.el.style.zIndex = String(MIN_Z_INDEX + Modal.windowCount + 1);
            this.el.addEventListener('click', this.handleClickElement);
        }

        if (Modal.windowCount) {
            fixedBody(true);
        }
    }

    componentWillUnmount() {
        if (modalRoot) {
            this.el.removeEventListener('click', this.handleClickElement);
            modalRoot.removeChild(this.el);
        }

        Modal.windowCount--;
        if (Modal.windowCount === 0) {
            fixedBody(false);
        }
    }

    render() {
        if (process.env.ssr || !modalRoot) {
            return null;
        }

        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }

    handleClickElement = (e) => {
        const { onOverlayClick } = this.props;

        if (e.target === this.el) {
            if (onOverlayClick) {
                onOverlayClick();
            }
        }
    }
}

export default Modal;

