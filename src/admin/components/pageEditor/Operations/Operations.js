import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Operations.module.css';
import cx from 'classnames';

class Operations extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        operations: PropTypes.object,
        className: PropTypes.string
    };

    static defaultProps = {
        operations: {}
    };

    render = () => {
        const { onClick, operations, children, className } = this.props;

        return (
            <div className={cx(styles.component, className)}>
                <div className={styles.overlay} onClick={onClick}>
                    {this.renderOperations()}
                </div>
                {children}
                { operations['addComponentBottom'] ? <div className={cx(styles.add, styles['add-bottom'])} onClick={operations['addComponentBottom']}>+</div> : null }
                { operations['addComponentTop'] ? <div className={cx(styles.add, styles['add-top'])} onClick={operations['addComponentTop']}>+</div> : null }
            </div>
        );
    };

    renderOperations = () => {
        const { operations } = this.props;

        const meta = [{
            id: 'moveBottom',
            title: 'Переместить вниз',
            caption: '▼'
        }, {
            id: 'moveUp',
            title: 'Переместить вверх',
            caption: '▲'
        }, {
            id: 'clone',
            title: 'Дублировать',
            caption: '❐'
        }, {
            id: 'options',
            title: 'Редактировать',
            caption: '✐'
        }, {
            id: 'copy',
            title: 'Копировать',
            caption: 'коп.'
        }, {
            id: 'delete',
            title: 'Удалить',
            caption: '✗'
        }];

        return (
            <div className={styles.operations}>
                {meta.map(o => operations[o.id] ? (
                    <div key={o.id} title={o.title} className={styles.operation} onClick={(e) => {
                        e.stopPropagation();
                        operations[o.id]();
                    }}>{o.caption}</div>
                ) : null)}
            </div>
        )
    }
}

export default Operations;
