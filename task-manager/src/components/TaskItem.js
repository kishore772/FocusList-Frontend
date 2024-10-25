import React from 'react';

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <div className="task-item">
      <h4>{task.name}</h4>
      <p>Status: {task.status}</p>
      <p>Date: {new Date(task.date_time).toLocaleString()}</p>
      <p>Created by: {task.creator}</p>
      
      {/* Edit and Delete buttons */}
      <div className="task-item-actions">
        <button onClick={() => onEdit(task.id)}>Edit</button> {/* Pass the task ID here */}
        <button onClick={() => onDelete(task.id)}>Delete</button> {/* Pass the task ID here */}
      </div>
    </div>
  );
};

export default TaskItem;
