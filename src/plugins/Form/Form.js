import React, { memo } from 'react';
import PropTypes from 'prop-types';
import FormComponent from '../../components/Form';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import Modal from '../../components/Modal';
import styles from './Form.module.css';

const Form = ({ onClose, source, title, data }) => (
    <Modal onOverlayClick={onClose}>
        <div className={styles.container}>
            <Caption align='center' className={styles.caption}>{title || 'Обратный звонок'}</Caption>
            <Text align='center' className={styles.description}>Перезвоним в самое ближайшее время</Text>
            <FormComponent source={source} data={data} onSuccess={onClose} />
        </div>
    </Modal>
);

Form.propTypes = {
    onClose: PropTypes.func,
    source: PropTypes.string,
    title: PropTypes.string
};

export default memo(Form);
