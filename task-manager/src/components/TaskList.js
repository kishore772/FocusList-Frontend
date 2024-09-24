import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { getTasksByCategory } from '../services/api';

const TaskList = ({ category, color }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the API based on the selected category
    getTasksByCategory(category).then((data) => {
      setTasks(data); // Set the tasks from the API response
    });
  }, [category]);

  // Convert category into a readable title
  const categoryTitle = {
    today: 'Today',
    scheduled: 'Scheduled',
    all: 'All',  // Ensure 'All' displays all tasks
    flagged: 'Flagged',
    completed: 'Completed',
  }[category];

  // Filter tasks based on their status (Only for the 'all' section)
  const filteredTasks = category === 'all' 
    ? tasks  // For 'All', show all tasks
    : tasks.filter(task => task.status === category);  // For others, filter by status

  return (
    <div className="task-list-container" style={{ backgroundColor: color }}>
      {/* Apply the category color to the container */}
      <h2 style={{ color: 'white', textAlign: 'center' }}>{categoryTitle} Tasks</h2>
      {filteredTasks.length === 0 ? (
        <p>No tasks available for {categoryTitle}.</p>
      ) : (
        <div className="task-items">
          {filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)}
        </div>
      )}
    </div>
  );
};

export default TaskList;
