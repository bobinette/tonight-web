import React, { FC, useState, useEffect } from 'react';

import { Project, Task } from 'types';

import TaskList from './task-list';

interface Props {
  project: Project;
  onCreateTask(task: Task): void;
  onDone(task: Task): void;
}

const ProjectCard: FC<Props> = ({ project, onCreateTask, onDone }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="card">
      <button
        className="w-100 button-phantom no-focus flex-full-row"
        onClick={() => setShowForm(!showForm)}
      >
        <strong>{project.name}</strong>
        <i className="material-icons">
          {showForm ? 'expand_less' : 'expand_more'}
        </i>
      </button>
      <div className="muted">
        <i className="material-icons left-icon">playlist_add_check</i>{' '}
        {project.tasks?.length || 0} tasks
      </div>
      {showForm && (
        <TaskList project={project} onCreate={onCreateTask} onDone={onDone} />
      )}
    </div>
  );
};

export default ProjectCard;
