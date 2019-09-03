import React, {memo} from 'react';
import Caption from '../Caption';
import Text from '../Text';
import Button from '../Button';
import styles from './Banner.module.css';
import cx from 'classnames';

function Banner(props) {
    const { bannerClassName, caption, description, buttonCaption, buttonHref, buttonClick } = props;

    return (
        <>
            <div className={cx(bannerClassName, styles.banner)} />
            <div className={styles.layout} />
            <div className={styles['content-container']}>
                <div className={styles.content}>
                    <Caption className={styles.header} color='white' size='l' align='center'>{caption}</Caption>
                    <Text className={styles.description} size='l' align='center'>{description}</Text>
                    {buttonCaption && (buttonHref ? (
                            <a href={buttonHref}>
                                <Button type='red' caption={buttonCaption} className={styles.button} />
                            </a>
                        ) : <Button type='red' caption={buttonCaption} className={styles.button} onClick={buttonClick}/>
                    )}
                </div>
            </div>
        </>
    )
}

export default memo(Banner);

