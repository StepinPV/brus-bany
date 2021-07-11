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
        const colorKey = 'color-';
        const fontSizeKey = 'fontsize-';

        const color = styles.filter((value) => value.startsWith(colorKey)).first();
        const fontsize = styles.filter((value) => value.startsWith(fontSizeKey)).first();

        if (color || fontsize) {
            return {
                element: 'span',
                style: {
                    ...(color ? {
                        color: color.replace(colorKey, '')
                    } : {}),
                    ...(fontsize ? {
                        'font-size': fontsize.replace(fontSizeKey, '')
                    } : {})
                }
            };
        }
    },
    defaultBlockTag: 'div'
};

const importOptions = {
    customInlineFn: (element, { Style }) => {
        let styles = [];

        if (element.style.color) {
            styles.push(`color-${element.style.color}`);
        }

        if (element.style.fontSize) {
            styles.push(`fontsize-${parseInt(element.style.fontSize)}`);
        }

        if (styles.length) {
            return Style(styles);
        }
    }
};

const CKEditorBase = ({ value, title, onChange, fields, props }) => {
    const [editorState, setEditorState] = useState(EditorState.createWithContent(stateFromHTML(value || '', importOptions)));

    useEffect(() => {
        let html = stateToHTML(editorState.getCurrentContent(), exportOptions);

        const match = html.match(/<div/g);
        // Проверяем, что совпадение единственное и div пустой и в начале
        if (match && match.length === 1 && html.match(/^<div>/g)) {
            const content = html.match(new RegExp('<div>((.|\n)*?)<\/div>'));
            html = html.replace(content[0], content[1]);
        }

        if (html === '<br>') {
            html = '';
        }

        console.log(html);
        onChange(html);
    }, [editorState]);

    return (
        <>
            <div className={styles.label}>{title}</div>
            <Editor
                editorClassName={styles.editor}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbarHidden={props.withoutEditor && !fields}
                stripPastedStyles
                toolbar={{
                    options: props.withoutEditor ? [] : ['inline', 'colorPicker', 'fontSize', 'list', 'link'],
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
