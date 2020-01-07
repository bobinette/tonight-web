/* tslint:disable */
import React, { FC, useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Project, Task, newTask } from 'types';

interface Props {
  project: Project;

  onCreate(task: Task): void;
  onDone(task: Task): void;
  onReorder(tasks: Task[]): void;
}

const onKeyPress = (onCreate: Function) => (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (event.key == 'Enter') {
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

const TaskList: FC<Props> = ({ project, onCreate, onDone, onReorder }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [dragging, setDragging] = useState(false);
  const [tasks, setTasks] = useState(project.tasks || []);

  useEffect(() => setTasks(project.tasks || []), [project]);

  return (
    <>
      <DragDropContext
        onDragEnd={onDragEnd(
          tasks,
          (tasks: Task[]) => {
            setTasks(tasks);
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
                <Draggable
                  key={task.uuid!}
                  draggableId={task.uuid!}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={provided.draggableProps.style}
                      className={`list-element flex-full-row ${
                        snapshot.isDragging
                          ? 'dragging'
                          : dragging
                          ? 'dragging-other'
                          : ''
                      }`}
                    >
                      <div>
                        {task.status === 'DONE' ? (
                          <i className="material-icons left-icon success">
                            check_circle
                          </i>
                        ) : (
                          <button
                            className="button-phantom"
                            onClick={() => onDone(task)}
                          >
                            <i className="material-icons left-icon">
                              radio_button_unchecked
                            </i>
                          </button>
                        )}
                        <span
                          className={`${
                            task.status === 'DONE' ? 'success' : ''
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                      <div>
                        <i
                          className={`material-icons dnd-handle`}
                          {...provided.dragHandleProps}
                        >
                          reorder
                        </i>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="padding">
        <div className="flex-aligned">
          <i className="material-icons left-icon">add_circle_outline</i>
          <input
            className="input-text-phantom w-100"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            onKeyPress={onKeyPress(() => {
              onCreate(newTask(newTaskTitle, project));
              setNewTaskTitle('');
            })}
            placeholder="New task..."
          />
        </div>
        <div className="w-100 align-right">
          <small className="muted">Press return to create</small>
        </div>
      </div>
    </>
  );
};

export default TaskList;
