import React, { FC, useState, useEffect, useCallback } from 'react';

import { Project } from 'types';

import { createProject, loadProjects } from './actions';
import CreateButton from './create-button';
import ProjectCard from './project-card';

interface Props {}

const ProjectList: FC<Props> = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    loadProjects(setProjects);
  }, []);
  const onCreate = useCallback(
    (project: Project) => {
      createProject(project, setProjects);
    },
    [setProjects]
  );

  return (
    <>
      {projects.map(project => (
        <ProjectCard key={project.uuid!} project={project} />
      ))}
      <div className="card">
        <CreateButton className="w-100" onCreate={onCreate} />
      </div>
    </>
  );
};

export default ProjectList;
