import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImageLoader from '../ImageLoader';
import axios from 'axios';
import toFormData from '@utils/MultipartFormData';
import showNotification from '@utils/showNotification';

class ImageUploader extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        image: PropTypes.string,
        images: PropTypes.object,
        title: PropTypes.string,
        props: PropTypes.object
    };

    render() {
        const { image, images, title, onChange, props } = this.props;

        return (
            <ImageLoader
                title={title}
                image={images[image]}
                onChange={this.handleChange}
                allowedTypes={props ? props.allowedTypes : undefined}
                onChangeURL={onChange} />
        );
    }

    handleChange = async (file) => {
        const { onChange, props } = this.props;

        if (file) {
            const data = {
                ...(props || {}),
                file
            };

            const res = await axios.put(`/api/upload-image`, data, {
                transformRequest: [toFormData],
            });

            switch(res.data.status) {
                case 'success':
                    onChange(res.data.data);
                    break;
                case 'error':
                    onChange(null);
                    showNotification({ message: res.data.message, status: 'error' });
                    break;
                default:
                    break;
            }
        } else {
            onChange(null);
        }
    };
}

export default ImageUploader;
