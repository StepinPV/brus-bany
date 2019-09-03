import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../components/Logo';
import Link from '../../../components/Link';
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
            <div className={cx(styles.header, {[styles['header-fixed']]: fixedHeader })}>
                <div className={cx(styles.container, {[styles['container-opacity']]: opacityMode}) }>
                    <Link to='/'>
                        <Logo className={styles.logo}/>
                    </Link>
                    <div className={styles.items}>
                        <Link to='/bani/mobilnie' className={styles.item}>Мобильные бани</Link>
                        <Link to='/bani/iz-brusa' className={styles.item}>Бани из бруса</Link>
                        <Link to='/bani/karkasnie' className={styles.item}>Каркасные бани</Link>
                        <Link to='/bani/individualniy-proekt' className={styles.item}>Индивидуальный проект</Link>
                    </div>
                    <div className={styles.info}>
                        <div className={styles['phone-container']}>
                            <a href="tel:88002010729" className={styles.phone}>8 (800) 201-07-29</a>
                            <a href="mailto:mailto:info@brus-bany.ru" className={styles.email}>info@brus-bany.ru</a>
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
                        <div className={styles.items2}>
                            <Link to='/bani/mobilnie' className={styles.item2}>Мобильные бани</Link>
                            <Link to='/bani/iz-brusa' className={styles.item2}>Бани из бруса</Link>
                            <Link to='/bani/karkasnie' className={styles.item2}>Каркасные бани</Link>
                            <Link to='/bani/individualniy-proekt' className={styles.item2}>Индивидуальный проект</Link>
                        </div>
                        <a href="tel:88002010729" className={styles.phone}>8 (800) 201-07-29</a>
                        <a href="mailto:mailto:info@brus-bany.ru" className={styles.email}>info@brus-bany.ru</a>
                    </div>
                ) : null}
            </div>
        );
    }

    handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        this.setState({
            opacityMode: scrollTop < OPACITY_MODE_SCROLL_POSITION
        });
    };
}

export default withForm(Header);
