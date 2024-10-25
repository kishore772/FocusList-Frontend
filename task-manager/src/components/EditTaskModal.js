import React, { useState } from 'react';

const EditTaskModal = ({ task, onClose, onTaskUpdated }) => {
  const [name, setName] = useState(task.name);
  const [status, setStatus] = useState(task.status);
  const [date, setDate] = useState(task.date_time);

  const handleSubmit = () => {
    if (!task) {
      console.error("No task selected for editing."); // Log if task is undefined
      return; // Exit early if task is not defined
  }
    const updatedTask = {
      id: task.id,
      name,
      status,
      date_time: new Date(date).toISOString(), // Convert to ISO string
    };
    console.log("Updated Task:", updatedTask); // Log the updated task
    onTaskUpdated(updatedTask); // Pass task.id and updated details
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Task</h3>
        <div className="modal-body">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task Name"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="today">Today</option>
            <option value="scheduled">Scheduled</option>
            <option value="flagged">Flagged</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="datetime-local"
            value={new Date(date).toISOString().slice(0, 16)}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Update Task</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
