import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import styles from './Article.module.css';

class Article extends PureComponent {
    static propTypes = {
        article: PropTypes.object,
        captionTag: PropTypes.string
    };

    render() {
        const { article, captionTag } = this.props;

        return (
            <div className={styles.content}>
                {article.name ? <Caption size='m' align='center' className={styles['header-caption']} tag={captionTag} isHTML>{article.name}</Caption> : null}
                {article.description ? this.renderText(article.description) : null}
                {article.image ? this.renderImage({
                    image: article.image,
                    alt: article.imageAlt
                }) : null}
                {article.content ? article.content.map((item, i) => <Fragment key={i}>{this.renderBlock(item)}</Fragment>) : null}
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
        const { image, alt } = value || {};

        return image ? <img className={styles.image} src={image} alt={alt} loading='lazy' /> : null
    };

    renderMarkerList = (values) => {
        return (
            <ul className={styles.ul}>
                {values.map(value => (
                    <li className={styles.li}>
                        <Text size='l' className={styles['list-caption']} isHTML>{value.caption}</Text>
                        <Text size='l' isHTML>{value.text}</Text>
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
                        <Text size='l' className={styles['list-caption']} isHTML>{value.caption}</Text>
                        <Text size='l' isHTML>{value.text}</Text>
                    </li>
                ))}
            </ol>
        )
    };
}

export default Article;
