import React from 'react';
import { useTaskContext } from '../context/TaskContext'; 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; 
import TaskItem from './TaskItem'; 
import './TaskList.css'; 

const TaskList = () => {
  const { tasks, filter, setTasks } = useTaskContext(); 

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true; 
    }
  });

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return; 

    const reorderedTasks = Array.from(filteredTasks);
    const [removed] = reorderedTasks.splice(source.index, 1); 
    reorderedTasks.splice(destination.index, 0, removed); 

    setTasks(reorderedTasks); 
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Task List</h2>

      {/* Drag and Drop context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="task-list"
            >
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`task-item ${task.completed ? 'completed' : ''}`}
                      >
                        <TaskItem task={task} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className="no-tasks">No tasks available</div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;

