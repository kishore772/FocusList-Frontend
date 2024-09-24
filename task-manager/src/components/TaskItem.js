import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <div className="task-item">
      <h4>{task.name}</h4>
      <p>Status: {task.status}</p>
      <p>Date: {new Date(task.date_time).toLocaleString()}</p>
      <p>Created by: {task.creator}</p>
    </div>
  );
};

export default TaskItem;
