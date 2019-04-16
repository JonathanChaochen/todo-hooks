import React, { useState } from 'react';

const Todo = () => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);
  const inpustChangeHandler = event => {
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName));
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inpustChangeHandler}
        value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul> {todoList.map(todo => <li ker={todo}>{todo}</li>)}</ul>
    </React.Fragment>
  );
};

export default Todo;
