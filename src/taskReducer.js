import { nanoid } from 'nanoid';

function addTask(tasks, task) {
  const newTask = { 
    id: 'todo-' + nanoid(), 
    name: task.name, 
    completed: false 
  };
  return([...tasks, newTask]);
}
  
function toggleTaskCompleted(tasks, id) {
  const updatedTasks = tasks.map(task => {
    if (id === task.id) {
      return {...task, completed: !task.completed}
    }
    return task;
  });
  return updatedTasks;
}
  
function editTask(tasks, task) {
  const editedTaskList = tasks.map(t => {
    if (task.id === t.id) {
      //
      return task;
    }
    return t;
  });
  return editedTaskList;
}
  
function deleteTask(tasks, id) {
  const remainingTasks = tasks.filter(task => id !== task.id);
  return remainingTasks;
}
  
  
export const taskReducer = (state, action) => {
  switch (action.type) {
  case 'ADD_TASK':
    return addTask(state, action.task);
  case 'TOGGLE_TASK':
    return toggleTaskCompleted(state, action.id);
  case 'EDIT_TASK':
    return editTask(state, action.task);
  case 'DELETE_TASK':
    return deleteTask(state, action.id);
  default:
    return state;
  }
}