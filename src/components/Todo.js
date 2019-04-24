import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Todo = () => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(
    () => {
      axios
        .get('https://react-hooks-5e579.firebaseio.com/todos.json')
        .then(result => {
          console.log(result);
          const todoData = result.data;
          const todos = [];
          for (const key in todoData) {
            todos.push({ id: key, name: todoData[key].name });
          }
          setTodoList(todos);
        });

      // cleanup
      return () => {
        console.log('Cleanup');
      };
    },
    [todoName]
  );

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler);
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

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
      <ul> {todoList.map(todo => <li key={todo.id}>{todo.name}</li>)}</ul>
    </React.Fragment>
  );
};

export default Todo;
