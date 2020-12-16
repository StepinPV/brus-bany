import React, { memo, useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import ColorPic from '../ColorPic';
import styles from './TextEditor.module.css';
import withFields from '@plugins/Fields/withFields';
import loadable from '@loadable/component';

const FieldsOption = loadable(() => import('../FieldsOption'));

const exportOptions = {
    inlineStyles: {
        BOLD: { element: 'b' }
    },
    inlineStyleFn: (styles) => {
        let key = 'color-';
        let color = styles.filter((value) => value.startsWith(key)).first();

        if (color) {
            return {
                element: 'span',
                style: {
                    color: color.replace(key, ''),
                },
            };
        }
    },
    defaultBlockTag: 'div'
};

const importOptions = {
    customInlineFn: (element, { Style }) => {
        if (element.style.color) {
            return Style('color-' + element.style.color);
        }
    }
};

const CKEditorBase = ({ value, title, onChange, fields, props }) => {
    const [editorState, setEditorState] = useState(EditorState.createWithContent(stateFromHTML(value, importOptions)));

    useEffect(() => {
        onChange(stateToHTML(editorState.getCurrentContent(), exportOptions));
    }, [editorState]);

    return (
        <>
            <div className={styles.label}>{title}</div>
            <Editor
                editorClassName={styles.editor}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbarHidden={props.withoutEditor && !fields}
                toolbar={{
                    options: props.withoutEditor ? [] : ['inline', 'fontSize', 'colorPicker', 'list', 'link'],
                    colorPicker: { component: ColorPic },
                    inline: {
                        inDropdown: true
                    },
                    list: {
                        inDropdown: true
                    }
                }}
                toolbarCustomButtons={fields ? [<FieldsOption fields={fields} />] : null} />
        </>
    );
};

export default memo(withFields(CKEditorBase));
