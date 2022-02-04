import React,{ useState, useRef, useEffect, useReducer } from 'react';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import { TaskContext } from './context'
import { taskReducer } from './taskReducer';

const DATA = [
  { id: 'todo-0', name: 'Eat', completed: true },
  { id: 'todo-1', name: 'Sleep', completed: false },
  { id: 'todo-2', name: 'Repeat', completed: false }
];

function App() {

  const listHeadingRef = useRef(null);
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const [filter, setFilter] = useState('All');
  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };
  
  const FILTER_NAMES = Object.keys(FILTER_MAP);


  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));


  const [tasks, dispatch] = useReducer(taskReducer, DATA);

  // const { tasks, dispatch } = useContext(TaskContext);
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        // toggleTaskCompleted={toggleTaskCompleted}
        // deleteTask={deleteTask}
        // editTask={editTask}
      />
    ));
  
  const prevTaskLength = usePrevious(tasks.length);
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <TaskContext.Provider value={{tasks, dispatch}}>
        <h1>TodoMatic</h1>
        <Form/>
        <div className="filters btn-group stack-exception">
          {filterList}
        </div>
        <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
          {headingText}
        </h2>
        <ul
        // role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </TaskContext.Provider>
    </div>
  );
}

export default App;
