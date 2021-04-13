import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Caption from '@components/Caption';
import Text from '@components/Text';
import renderDate from '@utils/RenderDate';
import styles from './Article.module.css';

class Article extends PureComponent {
    static propTypes = {
        article: PropTypes.object,
        captionTag: PropTypes.string,
        date: PropTypes.object
    };

    render() {
        const { article, captionTag, date } = this.props;

        return (
            <div className={styles.content}>
                {article.name ? <Caption size='m' align='center' className={styles['header-caption']} tag={captionTag} isHTML>{article.name}</Caption> : null}
                {article.description ? this.renderText(article.description) : null}
                {article.firstImage ? this.renderImage({
                    image: article.firstImage,
                    alt: article.firstImageAlt,
                    description: article.firstImageDescription
                }) : null}
                {article.content ? article.content.map((item, i) => <Fragment key={i}>{this.renderBlock(item)}</Fragment>) : null}
                {date ? <div className={styles.date}>
                    Дата публикации:
                    <time className='date' dateTime={date.toISOString()}>
                        {` ${renderDate(date)}`}
                    </time>
                </div> : null}
            </div>
        );
    }

    renderBlock = (block) => {
        const { captionTag } = this.props;
        const { caption, content } = block;

        return (
            <div className={styles.block}>
                {caption ? <Caption size='s' className={styles.caption} tag={captionTag === 'h1' ? 'h2' : 'h3'} isHTML>{caption}</Caption> : null}
                {content ? content.map((data, i) => <Fragment key={i}>{this.renderItem(data.item)}</Fragment>) : null}
            </div>
        )
    };

    renderItem = (item) => {
        const { typeId, value } = item || {};

        switch (typeId) {
            case 'text': return this.renderText(value);
            case 'image': return this.renderImage(value);
            case 'marker-list': return this.renderMarkerList(value);
            case 'numeric-list': return this.renderNumericList(value);
            default: return null;
        }
    };

    renderText = (text) => {
        return text ? <Text className={styles.text} size='l' isHTML>{text}</Text> : null
    };

    renderImage = (value) => {
        const { image, alt, description } = value || {};

        return image ? (
            <div className={styles['image-block']} itemScope itemType="http://schema.org/ImageObject">
                <img className={styles.image} src={image} alt={alt} loading='lazy' itemProp="contentUrl" />
                {description ? <div className={styles['image-description']}>{description}</div> : null}
            </div>
        ) : null
    };

    renderMarkerList = (values) => {
        return (
            <ul className={styles.ul}>
                {values.map(value => (
                    <li className={styles.li}>
                        {value.caption ? <Text size='m' className={styles['list-caption']} isHTML>{value.caption}</Text> : null}
                        {value.text ? <Text size='l' isHTML className={value.image ? styles['list-text'] : null}>{value.text}</Text> : null}
                        {value.image ? this.renderImage({
                            image: value.image,
                            alt: value.imageAlt,
                            description: value.imageDescription
                        }) : null}
                    </li>
                ))}
            </ul>
        )
    };

    renderNumericList = (values) => {
        return (
            <ol className={styles.ul}>
                {values.map(value => (
                    <li className={styles.li}>
                        {value.caption ? <Text size='m' className={styles['list-caption']} isHTML>{value.caption}</Text> : null}
                        {value.text ? <Text size='l' isHTML className={value.image ? styles['list-text'] : null}>{value.text}</Text> : null}
                        {value.image ? this.renderImage({
                            image: value.image,
                            alt: value.imageAlt,
                            description: value.imageDescription
                        }) : null}
                    </li>
                ))}
            </ol>
        )
    };
}

export default Article;
