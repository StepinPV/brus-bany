import React, { memo } from 'react';
import PropTypes from "prop-types";
import { Caption, Text, Button } from '../meta';
import styles from './ImageLinkBlock.module.css';
import cx from 'classnames';

function ImageLinkBlock(props) {
    const className = cx(
        styles.content,
        props.paddingTop !== 'none' ? styles[`padding-top-${props.paddingTop}`] : null,
        props.paddingBottom !== 'none' ? styles[`padding-bottom-${props.paddingBottom}`] : null);

    return (
        <div className={className}>
            <img className={styles.image} src={props.__images__[props.image]} alt={props.imageAlt} loading='lazy' />
            <div className={styles.info}>
                <Caption size='s' align='left' paddingTop='s' paddingBottom='s'>{props.caption}</Caption>
                <Text align='left' paddingTop='s' paddingBottom='s' isHTML>{props.text}</Text>
                {props.buttonCaption ? (
                    <Button
                        paddingTop='s'
                        paddingBottom='s'
                        align='left'
                        href={props.buttonHref}
                        caption={props.buttonCaption}
                        fullWidth />
                ) : null}
            </div>
        </div>
    );
}

ImageLinkBlock.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    caption: PropTypes.string,
    text: PropTypes.string,
    buttonCaption: PropTypes.string,
    buttonHref: PropTypes.string
};

ImageLinkBlock.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm'
};

export default memo(ImageLinkBlock);
