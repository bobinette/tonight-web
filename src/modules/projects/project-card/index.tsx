import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Project, Task } from 'types';

interface Props {
  project: Project;
}

const ProjectCard: FC<Props> = ({ project }) => {
  const tasks = useMemo(
    () =>
      project?.releases.reduce((acc, r) => acc.concat(r.tasks), [] as Task[]) ??
      [],
    [project]
  );
  const doneTasks = useMemo(() => tasks.filter(t => t.status === 'DONE'), [
    tasks,
  ]);
  return (
    <Link to={`projects/${project.slug}`} className="card">
      <div className="flex-full-row">
        <strong>{project.name}</strong>
        <div>
          {doneTasks.length} / {tasks.length || 0} tasks
        </div>
      </div>
      {project.description && (
        <div className="margin-top">{project.description}</div>
      )}
    </Link>
  );
};

export default ProjectCard;
