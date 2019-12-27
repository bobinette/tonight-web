import React, { FC, useState } from 'react';

import { Project } from 'types';

import { create as createProject } from '../api';

import CreateForm from './form';

interface Props {
  className?: string;
  onCreate(project: Project): void;
}

const CreateButton: FC<Props> = ({ className, onCreate }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        className={`${className || ''} button-phantom no-focus flex-full-row`}
        onClick={() => setShowForm(!showForm)}
      >
        Create new project
        <i className="material-icons">
          {showForm ? 'expand_less' : 'expand_more'}
        </i>
      </button>
      {showForm && (
        <>
          <CreateForm
            className={className}
            onCancel={() => setShowForm(false)}
            onCreate={project => {
              onCreate(project);
              setShowForm(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default CreateButton;
