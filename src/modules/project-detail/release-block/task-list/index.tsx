/* tslint:disable */
import React, { FC, useState, useCallback } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Task, newTask } from 'types';

import TaskRow from './row';

interface Props {
  tasks: Task[];

  onCreate(task: Task): void;
  onUpdate(task: Task): Promise<void>;
  onDone(task: Task): void;
  onReorder(tasks: Task[]): void;
  onDeleteTask(task: Task): Promise<void>;
}

const onKeyPress = (onCreate: Function) => (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (event.key === 'Enter') {
    onCreate();
  }
};

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const onDragEnd = (
  tasks: Task[],
  onReorder: Function,
  setDragging: Function
) => (result: any) => {
  setDragging(false);

  // dropped outside the list
  if (!result.destination) {
    return;
  }

  const reordered = reorder(
    tasks,
    result.source.index,
    result.destination.index
  );

  onReorder(reordered);
};

const TaskList: FC<Props> = ({
  tasks,
  onCreate,
  onDone,
  onReorder,
  onUpdate,
  onDeleteTask,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [dragging, setDragging] = useState(false);

  const onDoneTask = useCallback(
    async (task: Task) => {
      onDone(task);
    },
    [onDone]
  );

  return (
    <>
      <DragDropContext
        onDragEnd={onDragEnd(
          tasks,
          (tasks: Task[]) => {
            onReorder(tasks);
          },
          setDragging
        )}
        onDragStart={() => setDragging(true)}
      >
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={dragging ? 'red' : ''}
            >
              {tasks.map((task: Task, index) => (
                <TaskRow
                  key={task.uuid || index}
                  dragging={dragging}
                  task={task}
                  index={index}
                  onUpdate={onUpdate}
                  onDone={onDoneTask}
                  onDelete={onDeleteTask}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="flex-center input-wrapper margin-top-small">
        <i className="material-icons left-icon input-icon">add_box</i>
        <input
          className="input-text-phantom w-100"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          onKeyPress={onKeyPress(() => {
            onCreate(newTask(newTaskTitle));
            setNewTaskTitle('');
          })}
          placeholder="New task..."
        />
      </div>
      <div className="w-100 align-right">
        <small className="muted">Press return to create</small>
      </div>
    </>
  );
};

export default TaskList;
