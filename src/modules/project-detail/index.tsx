import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import EditableTextArea from 'components/editables/textarea';

import { createTask, markAsDone, reorder } from 'modules/projects/api';

import { Project, Task } from 'types';

import { find, update, updateTask, createRelease, deleteRelease } from './api';
import ReleaseBlock from './release-block';

const loadProject = async (setProject: Function, slug?: string) => {
  if (!slug) {
    return;
  }
  const project = await find(slug);
  setProject(project);
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    loadProject(setProject, slug);
  }, [setProject, slug]);

  const onChangeDescription = useCallback(
    async (description: string) => {
      if (project) {
        const newProject = { ...project, description };
        await update(newProject);
        setProject(newProject);
      }
    },
    [project]
  );

  const onDone = useCallback(
    async (task: Task) => {
      await markAsDone(task);
      await loadProject(setProject, slug);
    },
    [setProject, slug]
  );
  const onCreate = useCallback(
    async (task: Task, releaseUuid: string) => {
      if (!project) {
        return;
      }

      await createTask(task, project.uuid!, releaseUuid);
      await loadProject(setProject, slug);
    },
    [project, setProject, slug]
  );
  const onReorder = useCallback(
    async (tasks: Task[]) => {
      if (!project) {
        return;
      }
      await reorder(project, tasks);
      await loadProject(setProject, slug);
    },
    [project, setProject, slug]
  );
  const onUpdate = useCallback(
    async (task: Task) => {
      await updateTask(task);
      await loadProject(setProject, slug);
    },
    [setProject, slug]
  );
  const onCreateRelease = useCallback(
    async (title: string) => {
      if (project) {
        await createRelease(title, project.uuid!);
        await loadProject(setProject, slug);
      }
    },
    [project, setProject, slug]
  );
  const onDeleteTask = useCallback(
    async (task: Task) => {
      if (project) {
        await deleteRelease(task.uuid!);
        await loadProject(setProject, slug);
      }
    },
    [project, setProject, slug]
  );

  if (!slug) {
    return <div>invalid slug</div>;
  }

  if (!project) {
    return <div>LOADING?</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <Link to="/">Back</Link>
      <div className="card">
        <EditableTextArea
          value={project.description || ''}
          onChange={onChangeDescription}
          placeholder="Add a description to your project..."
        />
      </div>
      {project.releases.map(release => (
        <ReleaseBlock
          key={release.uuid}
          release={release}
          onDone={onDone}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onReorder={onReorder}
          onDeleteTask={onDeleteTask}
        />
      ))}
      <div className="card">
        <EditableTextArea
          value=""
          placeholder="Click to create a new release"
          onChange={onCreateRelease}
        />
      </div>
    </div>
  );
};

export default ProjectDetail;
