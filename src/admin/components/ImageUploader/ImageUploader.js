import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImageLoader from '../ImageLoader';
import axios from '../../../utils/axios';
import toFormData from "../../../utils/MultipartFormData";

const uploadFile = async (file) => {
    const res = await axios.put(`/api/upload-image`, { file }, {
        transformRequest: [toFormData],
    });

    return res.data.status === 'success' ? res.data.data : null;
};

class ImageUploader extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        image: PropTypes.string,
        title: PropTypes.string
    };

    render() {
        const { image, title } = this.props;

        return (
            <ImageLoader title={title} image={image} onChange={this.handleChange} />
        );
    }

    handleChange = async (file) => {
        const { onChange } = this.props;
        onChange(file ? await uploadFile(file) : null);
    };
}

export default ImageUploader;
