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
           <div className={styles.container}>
               <img className={styles.activeImage} src={images[activeImageIndex]} alt="" />
               <div className={styles.images}>
                   {images.map((image, index) => {
                       return (
                           <img
                               key={image}
                               onClick={() => { this.setState({ activeImageIndex: index }) }}
                               className={cx(styles.image, {[styles.selectedImage]: index === activeImageIndex})}
                               src={image}
                               alt="" />
                       )
                   })}
               </div>
           </div>
       );
    }
}

export default Gallery;
