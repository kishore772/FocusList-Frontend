import React, { useState } from 'react';
import { createTask } from '../services/api'; // API function to create a task

const CreateTaskModal = ({ category, onClose, onTaskCreated }) => {
  const [taskName, setTaskName] = useState('');

  const handleCreateTask = async () => {
    if (taskName.trim()) {
      // Create the task with the given name and status (category)
      const newTask = await createTask({
        name: taskName,
        status: category,  // Pass the current category as the task status
        date_time: new Date().toISOString(), // Get current time stamp
      });

      if (newTask) {
        onTaskCreated(newTask); // Pass the created task back to the parent
        onClose();  // Close the modal
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Create Task</h3>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleCreateTask}>Create</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
