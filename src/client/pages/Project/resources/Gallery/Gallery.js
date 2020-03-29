import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Gallery.module.css';

class Gallery extends PureComponent {
    static propTypes = {
        images: PropTypes.array
    };

    state = {
        index: 0
    };

    render() {
        const { images } = this.props;
        const { index } = this.state;

        return (
            <>
                <div className={styles.imageContainer}>
                    <div className={styles.prevContainer} onClick={this.onPrev}>
                        <i className={styles.prev} />
                    </div>
                    <div className={styles.nextContainer} onClick={this.onNext}>
                        <i className={styles.next} />
                    </div>
                    <img className={styles.activeImage} src={images[index].src} alt={images[index].alt} itemProp="image" />
                </div>
                <div className={styles.images}>
                    {images.map((image, i) => {
                        return (
                            <img
                                itemProp="image"
                                key={image.src}
                                onClick={() => { this.setState({ index: i }) }}
                                className={cx(styles.image, {[styles.selectedImage]: index === i})}
                                src={image.src}
                                alt={image.alt} />
                        )
                    })}
                </div>
            </>
        );
    }

    onPrev = () => {
        const { images } = this.props;
        const { index } = this.state;
        const newIndex = index - 1;

        this.setState({
            index: newIndex === -1 ? images.length - 1 : newIndex
        });
    };

    onNext = () => {
        const { images } = this.props;
        const { index } = this.state;
        const newIndex = index + 1;

        this.setState({
            index: newIndex === images.length ? 0 : newIndex
        });
    };
}

export default Gallery;
