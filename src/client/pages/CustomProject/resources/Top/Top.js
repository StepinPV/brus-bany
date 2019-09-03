import React, {memo} from 'react';
import Banner from '../../../../components/Banner';
import withForm from '../../../../plugins/Form/withForm';
import styles from './Top.module.css';

function Top(props) {
    const linkStyles = {
        color: '#ffbb00',
        textDecoration: 'none',
        cursor: 'pointer'
    };

    const showForm = () => props.showForm({ source: 'Индивидуальный проект' });

    return (
        <Banner
            caption='Индивидуальный проект'
            description={(
                <>
                    Построим баню любой сложности отталкиваясь от ваших предпочтений и пожеланий.
                    Отправьте информацию о проекте на почту <a href="mailto:mailto:info@brus-bany.ru" style={linkStyles}>info@brus-bany.ru</a> или <span onClick={showForm} style={linkStyles}>оставьте заявку</span>.
                    Мы изучим ваш проект, дадим свои рекомендации и рассчитаем стоимость
                </>
            )}
            buttonCaption='Обсудить проект'
            buttonClick={showForm}
            bannerClassName={styles.banner} />
    )
}

export default memo(withForm(Top));

