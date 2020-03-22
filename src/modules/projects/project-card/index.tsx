import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Project } from 'types';

interface Props {
  project: Project;
}

const ProjectCard: FC<Props> = ({ project }) => {
  const doneTasksCount = useMemo(
    () => project.tasks.filter(t => t.status === 'DONE').length,
    [project]
  );
  return (
    <Link to={`projects/${project.slug}`}>
      <div className="card">
        <div className="flex-full-row">
          <strong>{project.name}</strong>
          <div>
            {doneTasksCount} / {project.tasks.length || 0} tasks
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
