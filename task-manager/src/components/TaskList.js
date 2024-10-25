import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, category, color, onDelete, onEdit }) => {
  // Convert category into a readable title
  const categoryTitle = {
    today: 'Today',
    scheduled: 'Scheduled',
    all: 'All',
    flagged: 'Flagged',
    completed: 'Completed',
  }[category];

  // Filter tasks based on their status (Only for the 'all' section)
  const filteredTasks = category === 'all' 
    ? tasks // For 'All', show all tasks
    : tasks.filter(task => task.status === category); // For others, filter by status

  return (
    <div className="task-list-container" style={{ backgroundColor: color }}>
      <h2 style={{ color: 'white', textAlign: 'center' }}>{categoryTitle} Tasks</h2>
      {filteredTasks.length === 0 ? (
        <p>No tasks available for {categoryTitle}.</p>
      ) : (
        <div className="task-items">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
