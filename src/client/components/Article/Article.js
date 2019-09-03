import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import styles from './Article.module.css';

class Article extends PureComponent {
    static propTypes = {
        article: PropTypes.object
    };

    render() {
        const { article } = this.props;

        return (
            <div className={styles.content}>
                {article.name ? <Caption size='m' align='center' className={styles['header-caption']}>{article.name}</Caption> : null}
                {article.description ? this.renderText(article.description) : null}
                {article.content.map(item => this.renderBlock(item))}
            </div>
        );
    }

    renderBlock = (block) => {
        const { caption, content } = block;

        return (
            <div className={styles.block}>
                {caption ? <Caption size='s' className={styles.caption}>{caption}</Caption> : null}
                {content ? content.map(data => this.renderItem(data.item)) : null}
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
        return text ? <Text className={styles.text} size='l' isHTML>{this.prepareText(text)}</Text> : null
    };

    renderImage = (value) => {
        const { image, alt } = value || {};

        return image ? <img className={styles.image} src={image} alt={alt} /> : null
    };

    renderMarkerList = (values) => {
        return (
            <ul className={styles.ul}>
                {values.map(value => (
                    <li className={styles.li}>
                        <Text size='l' className={styles['list-caption']} isHTML>{value.caption}</Text>
                        <Text size='l' isHTML>{this.prepareText(value.text)}</Text>
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
                        <Text size='l' isHTML>{this.prepareText(value.text)}</Text>
                    </li>
                ))}
            </ol>
        )
    };

    prepareText = (text) => {
        let res;

        while ((res = /{{(.+?)}}/.exec(text)) && res) {
            if (res[0] && res[1]) {
                const data = res[1].split('|');

                switch (data[0]) {
                    case 'link':
                        if (data[1] && data[2]) {
                            text = text.replace(res[0], `<a class="${styles.link}" href="${data[2]}">${data[1]}</a>`);
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        return text;
    }
}

export default Article;
