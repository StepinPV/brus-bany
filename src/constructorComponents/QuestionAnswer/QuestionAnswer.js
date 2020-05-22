import React, { memo } from 'react';
import PropTypes from "prop-types";
import { Caption, Text } from '../meta';
import cx from 'classnames';
import styles from './QuestionAnswer.module.css';

function QuestionAnswer(props) {
    const className = cx(
        styles.container,
        styles[`width-${props.width}`],
        props.paddingTop !== 'none' ? styles[`padding-top-${props.paddingTop}`] : null,
        props.paddingBottom !== 'none' ? styles[`padding-bottom-${props.paddingBottom}`] : null);

    return (
        <div {...(props.id ? { id: props.id } : {})} className={className}>
            {props.items.map(({ name, items }) => {
                return (
                    <div key={name} className={styles.group}>
                        <div className={styles['group-name']}>{name}</div>
                        {(items || []).map(({ question, answer }) => {
                            return (
                                <div key={question} className={styles.item}>
                                    <Caption paddingTop='none' paddingBottom='s' size='s' align='left'>{question}</Caption>
                                    <Text paddingBottom='none' paddingTop='none' align='left' isHTML>{answer}</Text>
                                </div>
                            );
                        })}
                    </div>
                )
            })}
        </div>
    );
}

QuestionAnswer.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    width: PropTypes.oneOf(['s', 'm', 'l']),
    items: PropTypes.array,
    id: PropTypes.string
};

QuestionAnswer.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm',
    items: [],
    width: 'm'
};

export default memo(QuestionAnswer);
