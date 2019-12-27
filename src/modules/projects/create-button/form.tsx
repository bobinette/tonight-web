import React, { FC, useState, useRef, useEffect } from 'react';

import { Project, newProject } from 'types';

interface Props {
  className?: string;

  onCancel(): void;
  onCreate(project: Project): void;
}

const CreateForm: FC<Props> = ({ className, onCancel, onCreate }) => {
  const [name, setName] = useState('');

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef) {
      // @ts-ignore
      nameInputRef.current.focus();
    }
  }, [nameInputRef]);

  return (
    <div className={className}>
      <div>
        <div className="input-label">Name:</div>
        <input
          className="input-text w-100"
          value={name}
          onChange={e => setName(e.target.value)}
          ref={nameInputRef}
        />
      </div>
      <div className="margin-top-small button-group">
        <button className="button-link" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="button-primary"
          onClick={() => onCreate(newProject(name))}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
