import React, { memo, useState } from 'react';
import { EditorState, Modifier } from 'draft-js';
import styles from './FieldsOption.module.css';

function FieldsOption(props) {
    const [opened, setOpened] = useState(false);

    const pasteField = fieldId => {
        const { editorState, onChange } = props;

        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            `{{${fieldId}}}`,
            editorState.getCurrentInlineStyle(),
        );
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    }

    return (
        <div onClick={() => setOpened(!opened)} className="rdw-block-wrapper" aria-label="rdw-block-control">
            <div className={`rdw-dropdown-wrapper ${styles.dropdown}`} aria-label="rdw-dropdown">
                <div className="rdw-dropdown-selectedtext" title="Placeholders">
                    <span>Вставить поле</span>
                    <div className={`rdw-dropdown-caretto${opened ? "close": "open"}`} />
                </div>
                <ul className={`rdw-dropdown-optionwrapper ${opened ? '' : styles.ul}`}>
                    {Object.keys(props.fields).map(id => (
                        <li
                            onClick={() => pasteField(id)}
                            key={id}
                            className={`rdw-dropdownoption-default ${styles.li}`}
                        >{props.fields[id]}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default memo(FieldsOption);
