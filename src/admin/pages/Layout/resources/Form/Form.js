import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../components/Input';
import ObjectEditor from '../../../../components/ObjectEditor';
import styles from './Form.module.css';

const Form = ({ items }) => {
    return (
        <div className={styles.container}>
            <Input title='ergwerger' type='string' />
            <ObjectEditor title='Object' />
        </div>
    );
};

Form.propTypes = {
    items: PropTypes.array
};

export default memo(Form);
