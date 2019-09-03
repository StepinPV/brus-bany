import React, {memo} from 'react';
import Banner from '../../../../components/Banner';
import withForm from '../../../../plugins/Form/withForm';
import styles from './Top.module.css';

function Top(props) {
    const showForm = () => props.showForm({ source: 'О компании' });

    return (
        <Banner
            caption='О компании'
            description={(
                <>
                    Мы строим мобильные бани, бани из бруса, каркасные бани, бани из бревна, <br/> а так же любые ваши идеи реализуем по индивидуальному проекту
                </>
            )}
            buttonCaption='Узнать больше'
            buttonClick={showForm}
            bannerClassName={styles.banner} />
    )
}

export default memo(withForm(Top));

