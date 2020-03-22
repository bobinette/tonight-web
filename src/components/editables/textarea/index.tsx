import React, { useState, useCallback, useEffect, useRef } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';

import './index.scss';

interface Props {
  className?: string;
  value: string | null;
  placeholder?: string;
  onChange(v: string): Promise<void>;
}

const EditableTextArea = ({
  className,
  value,
  onChange,
  placeholder,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  const onSetEditing = useCallback(() => {
    if (!editing && !saving && !window.getSelection()?.toString()) {
      setEditing(true);
    }
  }, [editing, saving, setEditing]);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (editing && editorRef.current) {
      editorRef.current.focus();
    }
  }, [editing]);

  const ref = useRef(null);
  useOnclickOutside(ref, () => {
    setEditing(false);
  });
  const onValidate = useCallback(async () => {
    // setSaving(true);
    await onChange(editedValue || '');
    setSaving(false);
    setEditing(false);
  }, [onChange, editedValue]);
  const onDiscard = useCallback(() => {
    setEditing(false);
    setEditedValue(value);
  }, [value, setEditing, setEditedValue]);

  const onChangeCallback = useCallback(
    evt => setEditedValue(evt.target.value),
    [setEditedValue]
  );

  return (
    <div
      ref={ref}
      className={`Editable ${editing ? 'editing' : ''} ${className || ''}`}
      onClick={onSetEditing}
    >
      {!editing && (
        <div className="Editable__plain">
          {value || <em className="muted">{placeholder}</em>}
        </div>
      )}
      {editing && (
        <>
          <textarea
            ref={editorRef}
            value={editedValue || ''}
            onChange={onChangeCallback}
            placeholder={placeholder}
            disabled={saving}
          />
          <div className="margin-top-small button-group">
            <button
              className="button-link"
              onClick={onDiscard}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              className="button-primary"
              onClick={onValidate}
              disabled={saving}
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditableTextArea;
