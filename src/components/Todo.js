import React, { useEffect, useRef, useState, useContext } from 'react';
import { TaskContext } from '../context';

export default function Todo(props) {

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const { dispatch } = useContext(TaskContext);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);


  function handleChange(e) {
    setNewName(e.target.value);
  }

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: 'EDIT_TASK',
      task: {
        id: props.id,
        name: newName,
        completed: props.completed
      }
    });
    setNewName('');
    setEditing(false);
  }

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      // editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);
  
  
  
  
  


  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />

      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
          ref={editButtonRef}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>

        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => dispatch({
            type: 'TOGGLE_TASK',
            id: props.id
          })}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>

        <button
          type="button"
          className="btn btn__danger"
          onClick={() => dispatch({
            type: 'DELETE_TASK',
            id: props.id
          })}
        >
            Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );
  

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;

}