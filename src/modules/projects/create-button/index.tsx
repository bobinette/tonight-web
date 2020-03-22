import React, { FC, useState, useCallback } from 'react';

import { Project, newProject } from 'types';

interface Props {
  className?: string;

  onCreate(project: Project): void;
}

const CreateButton: FC<Props> = ({ className, onCreate }) => {
  const [name, setName] = useState('');

  const onCreateCallback = useCallback(() => onCreate(newProject(name)), [
    onCreate,
    name,
  ]);
  const onCancelCallback = useCallback(() => setName(''), [setName]);

  return (
    <div className={className}>
      <div>
        <div className="input-label">New project name:</div>
        <input
          className="input-text w-100"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="My new project..."
        />
      </div>
      <div className="margin-top-small button-group">
        <button className="button-link" onClick={onCancelCallback}>
          Cancel
        </button>
        <button className="button-primary" onClick={onCreateCallback}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateButton;
