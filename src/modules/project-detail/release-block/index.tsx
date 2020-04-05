import React, { useMemo, useCallback } from 'react';

import { Release, Task } from 'types';

import TaskList from './task-list';

interface Props {
  release: Release;

  onCreate(task: Task, releaseUuid: string): void;
  onUpdate(task: Task): Promise<void>;
  onDone(task: Task): void;
  onReorder(tasks: Task[]): void;
}

const ReleaseBlock = ({
  release,
  onCreate,
  onUpdate,
  onDone,
  onReorder,
}: Props) => {
  const doneTasks = useMemo(
    () => release.tasks.filter(t => t.status === 'DONE'),
    [release]
  );
  const onCreateTask = useCallback(
    (task: Task) => onCreate(task, release.uuid),
    [release, onCreate]
  );
  return (
    <div className="card">
      <div className="flex-full-row">
        <strong>{release.title}</strong>
        <div>
          {doneTasks.length} / {release.tasks.length} tasks
        </div>
      </div>
      <TaskList
        tasks={release.tasks}
        onDone={onDone}
        onCreate={onCreateTask}
        onUpdate={onUpdate}
        onReorder={onReorder}
      />
    </div>
  );
};

export default ReleaseBlock;
