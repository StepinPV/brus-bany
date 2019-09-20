import React, {memo} from 'react';
import DataSection from '../../../../components/DataSection';
import img1 from './resources/1.png';
import img2 from './resources/2.png';
import img3 from './resources/3.png';
import styles from './Video.module.css';

const items = [{
    video: 'https://www.youtube.com/embed/8blYMbqYBUg',
    image: img1,
    alt: 'фото каркасной бани 5х9,5'
}, {
    video: 'https://www.youtube.com/embed/6FSPQ53Q8MY',
    image: img2,
    alt: 'фото бани со вторым светом'
}, {
    video: 'https://www.youtube.com/embed/rMRw80AMzjU',
    image: img3,
    alt: 'фото мобильной бани 6х2,3'
}];

function Video() {
    return (
        <DataSection bgStyle='white' caption='Видео отзывы' captionTag='h2'>
            {items.map(({ video, image, alt }) => {
                return (
                    <div className={styles['items-line']}>
                        <iframe className={styles.item} height="315" src={video} frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen />
                        <img src={image} className={styles.item} alt={alt} loading='lazy' />
                    </div>
                );
            })}
        </DataSection>
    )
}

export default memo(Video);
