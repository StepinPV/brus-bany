import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Gallery.module.css';

class Gallery extends PureComponent {
    static propTypes = {
        images: PropTypes.array
    };

    state = {
        activeImageIndex: 0
    };

    render() {
        const { images } = this.props;
        const { activeImageIndex } = this.state;

       return (
           <>
               <img className={styles.activeImage} src={images[activeImageIndex].src} alt={images[activeImageIndex].alt} itemProp="image" />
               <div className={styles.images}>
                   {images.map((image, index) => {
                       return (
                           <img
                               itemProp="image"
                               key={image.src}
                               onClick={() => { this.setState({ activeImageIndex: index }) }}
                               className={cx(styles.image, {[styles.selectedImage]: index === activeImageIndex})}
                               src={image.src}
                               alt={image.alt} />
                       )
                   })}
               </div>
           </>
       );
    }
}

export default Gallery;
