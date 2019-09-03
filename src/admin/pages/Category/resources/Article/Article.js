import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Form from '../../../../components/Form';
import articleFormat from '../../../../formats/article';
import styles from './Article.module.css';

class Article extends PureComponent {
    static propTypes = {
        data: PropTypes.array,
        onChange: PropTypes.func
    };

    render() {
        const { data, onChange } = this.props;

        return (
            <Fragment>
                <div className={styles.caption}>Статья</div>
                <Form format={articleFormat} value={data || {}} onChange={onChange} errors={{}} />
            </Fragment>
        );
    }
}

export default Article;
