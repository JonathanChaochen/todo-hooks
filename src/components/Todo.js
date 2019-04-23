import React, { useState } from 'react';
import axios from 'axios';
const Todo = () => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);
  const inpustChangeHandler = event => {
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName));
    axios
      .post('https://react-hooks-5e579.firebaseio.com/todos.json', {
        name: todoName
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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
