import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImageLoader from '../ImageLoader';
import axios from 'axios';
import toFormData from "../../../utils/MultipartFormData";
import withNotification from '../../../plugins/Notifications/withNotification';

class ImageUploader extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        image: PropTypes.string,
        title: PropTypes.string,
        props: PropTypes.object,
        showNotification: PropTypes.func
    };

    render() {
        const { image, title } = this.props;

        return (
            <ImageLoader title={title} image={image} onChange={this.handleChange} />
        );
    }

    handleChange = async (file) => {
        const { onChange, showNotification, props } = this.props;

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

export default withNotification(ImageUploader);
