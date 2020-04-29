import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomProjectCard.module.css';
import Card from '../Card';
import img from './img.jpg';

function CustomProjectCard({ link }) {
    return (
        <a href={link} className={styles.wrapper}>
            <Card
                firstImage={img}
                imageAlt='Индивидуальный проект бани'
                firstButton='Рассчитать'
                firstButtonColor='yellow'
                secondButton='Бесплатно'
                bgStyle='grey'
                content={(
                    <div className={styles['info']}>
                        <div className={styles['info-title']}>
                            Не нашли подходящий проект?
                        </div>
                        <div className={styles.text}>
                            Построим баню любой сложности отталкиваясь от ваших предпочтений и пожеланий
                        </div>
                    </div>
                )}
            />
        </a>
    );
}

CustomProjectCard.propTypes = {
    link: PropTypes.string
};

export default memo(CustomProjectCard);
