import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../components/Logo';
import Button from '../Button';
import withForm from '../../plugins/Form/withForm';
import styles from './Header.module.css';
import cx from "classnames";

const OPACITY_MODE_SCROLL_POSITION = 50;

class Header extends PureComponent {
    static propTypes = {
        fixedHeader: PropTypes.bool
    };

    state = {
        expanded: false
    };

    constructor(props) {
        super(props);

        this.state = {
            opacityMode: props.fixedHeader
        };
    }

    componentDidMount() {
        const { fixedHeader } = this.props;

        if (fixedHeader) {
            document.addEventListener('scroll', this.handleScroll);
        }
    }

    componentWillUnmount() {
        const { fixedHeader } = this.props;

        if (fixedHeader) {
            document.removeEventListener('scroll', this.handleScroll);
        }
    }

    render() {
        const { showForm, fixedHeader } = this.props;
        const { expanded, opacityMode } = this.state;

        return (
            <header className={cx(styles.header, {[styles['header-fixed']]: fixedHeader })}>
                <div className={cx(styles.container, {[styles['container-opacity']]: opacityMode}) }>
                    <a href='/'>
                        <Logo className={styles.logo}/>
                    </a>
                    {this.renderLinks(styles.items, styles.item)}
                    <div className={styles.info}>
                        <div className={styles['phone-container']}>
                            {this.renderContacts()}
                        </div>
                        <Button type='yellow' caption='Обратный звонок' size='s' onClick={() => { showForm({ source: 'Шапка сайта' }) }}/>
                        <div className={styles.burger} onClick={() => {this.setState({ expanded: !expanded })}}>
                            <div className={cx(styles['burger-line'], {[styles['burger-line-expanded-opacity']]: expanded})} />
                            <div className={styles['burger-line-centered']}>
                                <div className={cx(styles['burger-line'], {[styles['burger-line-expanded-first']]: expanded})} />
                                <div className={cx(styles['burger-line'], {[styles['burger-line-expanded-second']]: expanded})} />
                            </div>
                            <div className={cx(styles['burger-line'], {[styles['burger-line-expanded-opacity']]: expanded})} />
                        </div>
                    </div>
                </div>
                {expanded ? (
                    <div className={styles['expanded-menu']}>
                        {this.renderLinks(styles.items2, styles.item2)}
                        {this.renderContacts()}
                    </div>
                ) : null}
            </header>
        );
    }

    renderLinks = (containerClass, itemClass) => {
        return (
            <nav className={containerClass}>
                <a href='/bani/mobilnie' className={itemClass}>Мобильные бани</a>
                <a href='/bani/iz-brusa' className={itemClass}>Бани из бруса</a>
                <a href='/bani/karkasnie' className={itemClass}>Каркасные бани</a>
                <a href='/bani/individualniy-proekt' className={itemClass}>Индивидуальный проект</a>
            </nav>
        );
    };

    renderContacts = () => {
        return (
            <>
                <a href="tel:88002010729" className={styles.phone}>8 (800) 201-07-29</a>
                <a href="mailto:mailto:info@brus-bany.ru" className={styles.email}>info@brus-bany.ru</a>
            </>
        )
    };

    handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        this.setState({
            opacityMode: scrollTop < OPACITY_MODE_SCROLL_POSITION
        });
    };
}

export default withForm(Header);
