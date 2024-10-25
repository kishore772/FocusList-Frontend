import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import TaskList from '../components/TaskList';
import CreateTaskModal from '../components/CreateTaskModal';
import EditTaskModal from '../components/EditTaskModal'; // Import the Edit Task Modal
import { getAllTasks, getTasksByCategory, deleteTask, updateTask } from '../services/api'; // Include delete and update task
import '../styles.css';
import { FaPlus, FaRegCalendarAlt, FaRegClock, FaFlag, FaCheckCircle, FaListUl } from 'react-icons/fa';

const TaskPage = () => {
  const [category, setCategory] = useState('all');
  const [tasks, setTasks] = useState([]); // Store tasks from the API response
  const [allTasks, setAllTasks] = useState([]); // Store all tasks for "All" category
  const [color, setColor] = useState('#6c757d'); // Default color for 'All'
  const [showModal, setShowModal] = useState(false); // For showing the task creation modal
  const [selectedTask, setSelectedTask] = useState(null); // For editing a specific task

  const buttons = [
    { label: 'Today', value: 'today', color: '#dc3545', icon: <FaRegCalendarAlt /> },
    { label: 'Scheduled', value: 'scheduled', color: '#007bff', icon: <FaRegClock /> },
    { label: 'All', value: 'all', color: '#6c757d', icon: <FaListUl /> }, // All tasks button
    { label: 'Flagged', value: 'flagged', color: '#ffc107', icon: <FaFlag /> },
    { label: 'Completed', value: 'completed', color: '#28a745', icon: <FaCheckCircle /> },
  ];

  // Fetch tasks based on the current category
  const fetchTasks = () => {
    if (category === 'all') {
      getAllTasks().then((data) => {
        setAllTasks(data); 
        setTasks(data);
      });
    } else {
      getTasksByCategory(category).then((data) => {
        setTasks(data);
      });
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the category changes
  }, [category]);

  const handleButtonClick = (value, selectedColor) => {
    setCategory(value);
    setColor(selectedColor);
  };

  // Handle deleting a task
  const handleTaskDelete = async (taskId) => {
    console.log("Deleting task with ID:", taskId); // Debug log
    await deleteTask(taskId); // Delete the task by ID
    fetchTasks(); // Re-fetch tasks to update the UI
  };

  // Handle editing a task
  const handleTaskEdit = (taskId) => {
    console.log("Editing task with ID:", taskId); // Debug log
    const taskToEdit = tasks.find((task) => task.id === taskId); // Find the task by ID
    setSelectedTask(taskToEdit); // Set the selected task for editing
  };

  // Handle task update after the modal submission
  const handleTaskUpdated = async (updatedTask) => {
    console.log("Updating task with ID:", updatedTask.id); // Debug log
    const response = await updateTask(updatedTask.id, updatedTask); // Update the task on the backend
    
    if (response) {
      console.log("Task updated:", response); // Debug log for successful update
      fetchTasks(); // Re-fetch tasks to update the UI
      setSelectedTask(null); // Close the edit modal
    } else {
      console.error("Failed to update the task"); // Log error if the update failed
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        {buttons.map((btn) => (
          <Button
            key={btn.value}
            label={btn.label}
            onClick={() => handleButtonClick(btn.value, btn.color)}
            active={category === btn.value}
            color={btn.color}
            icon={btn.icon}
          />
        ))}
      </div>
      <div className="tasks">
        <TaskList
          category={category}
          tasks={category === 'all' ? allTasks : tasks}
          color={color}
          onDelete={handleTaskDelete} // Pass the delete handler
          onEdit={handleTaskEdit} // Pass the edit handler
        />
      </div>

      <div className="plus-button" onClick={() => setShowModal(true)}>
        <FaPlus size={30} />
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <CreateTaskModal
          category={category}
          onClose={() => setShowModal(false)}
          onTaskCreated={fetchTasks}
        />
      )}

      {/* Edit Task Modal */}
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)} // Close the modal
          onTaskUpdated={handleTaskUpdated} // Handle the update
        />
      )}
    </div>
  );
};

export default TaskPage;
