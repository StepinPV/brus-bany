import React, { memo } from 'react';
import PropTypes from 'prop-types';
import FormComponent from '@constructor-components/components/Form';
import Caption from '@constructor-components/components/Caption';
import Text from '@constructor-components/components/Text';
import Modal from '../../components/Modal';
import styles from './Form.module.css';
import {css} from "@emotion/react";

const Form = ({ onClose, source, title, buttonColor, buttonBackground }) => (
    <Modal onOverlayClick={onClose}>
        <div className={styles.container}>
            <Caption align='center' containerStyles={css`margin-bottom: 8px;`}>{title || 'Обратный звонок'}</Caption>
            <Text align='center' containerStyles={css`margin-bottom: 16px;`}>Перезвоним в самое ближайшее время</Text>
            <FormComponent source={source} onSuccess={onClose} buttonColor={buttonColor} buttonBackground={buttonBackground} />
        </div>
    </Modal>
);

Form.propTypes = {
    onClose: PropTypes.func,
    source: PropTypes.string,
    title: PropTypes.string
};

export default memo(Form);
