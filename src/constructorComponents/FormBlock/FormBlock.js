import React, { memo } from 'react';
import PropTypes from "prop-types";
import Caption from '../Caption';
import Text from '../Text';
import Form from '../Form';
import styles from './FormBlock.module.css';
import img from './resources/img.jpg';
import cx from 'classnames';

function FormBlock(props) {
    const { source, data, background } = props;

    return (
        <div className={styles.content} id='requestForm'>
            <div className={styles['first-column']}>
                <img src={img} alt="Фотография бани" className={styles.image} loading='lazy' />
            </div>
            <div className={cx(styles['second-column'], styles[`second-column-background-${background}`])}>
                <Caption paddingBottom='s' paddingTop='s'>Закажите обратный звонок!</Caption>
                <Text size='l' paddingTop='s'>Перезвоним вам в кратчайшие сроки, расскажем о банях все и поможем с выбором</Text>
                <Form source={source} data={data} />
            </div>
        </div>
    );
}

FormBlock.propTypes = {
    background: PropTypes.oneOf(['white', 'grey'])
};

FormBlock.defaultProps = {
    background: 'grey'
};

export default memo(FormBlock);
