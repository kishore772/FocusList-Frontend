import React, { useEffect, useState } from 'react';import Button from '../components/Button';
import TaskList from '../components/TaskList';
import { getAllTasks, getTasksByCategory } from '../services/api'; // Import the API methods
import '../styles.css';
import { FaRegCalendarAlt, FaRegClock, FaFlag, FaCheckCircle, FaListUl } from 'react-icons/fa';

const TaskPage = () => {
  const [category, setCategory] = useState('all');
  const [tasks, setTasks] = useState([]); // Store tasks from the API response
  const [color, setColor] = useState('#6c757d'); // Default color for 'All'

  const buttons = [
    { label: 'Today', value: 'today', color: '#dc3545', icon: <FaRegCalendarAlt /> },
    { label: 'Scheduled', value: 'scheduled', color: '#007bff', icon: <FaRegClock /> },
    { label: 'All', value: 'all', color: '#6c757d', icon: <FaListUl /> }, // All tasks button
    { label: 'Flagged', value: 'flagged', color: '#ffc107', icon: <FaFlag /> },
    { label: 'Completed', value: 'completed', color: '#28a745', icon: <FaCheckCircle /> },
  ];

  useEffect(() => {
    if (category === 'all') {
      // Fetch all tasks if category is 'all'
      getAllTasks().then((data) => {
        setTasks(data); // Set the tasks for 'all'
      });
    } else {
      // Fetch tasks by status (category)
      getTasksByCategory(category).then((data) => {
        setTasks(data); // Set the tasks for the selected category
      });
    }
  }, [category]);

  const handleButtonClick = (value, selectedColor) => {
    setCategory(value); // Set the selected category (e.g., 'all', 'today', etc.)
    setColor(selectedColor); // Change color according to the selected category
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
        <TaskList category={category} tasks={tasks} color={color} />
      </div>
    </div>
  );
};

export default TaskPage;