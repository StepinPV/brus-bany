import React, { memo, useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import ColorPic from '../ColorPic';
import styles from './TextEditor.module.css';
import cx from 'classnames';

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

const CKEditorBase = ({ value, title, onChange, props }) => {
    const [editorState, setEditorState] = useState(EditorState.createWithContent(stateFromHTML(value, importOptions)));

    useEffect(() => {
        onChange(stateToHTML(editorState.getCurrentContent(), exportOptions));
    }, [editorState])

    return (
        <>
            <div className={styles.label}>{title}</div>
            <Editor
                editorClassName={styles.editor}
                toolbarClassName={cx({ [styles['toolbar-hidden']]: props.withoutEditor })}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
                    options: props.withoutEditor ? [] : ['inline', 'fontSize', 'colorPicker', 'list', 'link'],
                    colorPicker: { component: ColorPic },
                    inline: {
                        inDropdown: true
                    },
                    list: {
                        inDropdown: true
                    }
                }} />
        </>
    );
};

export default memo(CKEditorBase);
