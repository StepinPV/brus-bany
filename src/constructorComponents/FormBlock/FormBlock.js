import React, { memo } from 'react';
import PropTypes from "prop-types";
import Caption from '../Caption';
import Text from '../Text';
import Form from '../Form';
import styles from './FormBlock.module.css';
import img from './resources/img.jpg';
import cx from 'classnames';

function FormBlock(props) {
    const { background } = props;

    const className = cx(
        styles.content,
        props.paddingTop !== 'none' ? styles[`padding-top-${props.paddingTop}`] : null,
        props.paddingBottom !== 'none' ? styles[`padding-bottom-${props.paddingBottom}`] : null);

    return (
        <div className={className} id='requestForm'>
            <div className={styles['first-column']}>
                <img src={img} alt="Фотография бани" className={styles.image} loading='lazy' />
            </div>
            <div className={cx(styles['second-column'], styles[`second-column-background-${background}`])}>
                <Caption paddingBottom='s' paddingTop='s'>Закажите обратный звонок!</Caption>
                <Text size='l' paddingTop='s'>Перезвоним вам в кратчайшие сроки, расскажем о банях все и поможем с выбором</Text>
                <Form />
            </div>
        </div>
    );
}

FormBlock.propTypes = {
    background: PropTypes.oneOf(['white', 'grey']),
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l'])
};

FormBlock.defaultProps = {
    background: 'grey',
    paddingTop: 'm',
    paddingBottom: 'm'
};

export default memo(FormBlock);
