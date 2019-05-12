import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import List from './List';
const Todo = () => {
  const [inputIsValid, setInputIsValid] = useState(false);
  // const [todoName, setTodoName] = useState('');
  // const [submittedTodo, setSubmittedTodo] = useState(null);
  // const [todoList, setTodoList] = useState([]);
  const todoInputRef = useRef(null);

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    axios
      .get('https://react-hooks-5e579.firebaseio.com/todos.json')
      .then(result => {
        const todoData = result.data;
        const todos = [];
        for (const key in todoData) {
          todos.push({ id: key, name: todoData[key].name });
        }
        console.log('TCL: Todo -> todos', todos);

        dispatch({ type: 'SET', payload: todos });
      });

    // cleanup
    return () => {
      console.log('Cleanup');
    };
  }, []);

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  const inputValidationHandler = event => {
    if (event.target.value.trim() === '') {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
  };

  // useEffect(() => {
  //   document.addEventListener('mousemove', mouseMoveHandler);
  //   return () => {
  //     document.removeEventListener('mousemove', mouseMoveHandler);
  //   };
  // }, []);

  // useEffect(
  //   () => {
  //     if (submittedTodo) {
  //       console.log('TCL: Todo -> submittedTodo', submittedTodo);
  //       dispatch({ type: 'ADD', payload: submittedTodo });
  //     }
  //   },
  //   [submittedTodo]
  // );

  // const inpustChangeHandler = event => {
  //   setTodoName(event.target.value);
  // };

  const todoAddHandler = () => {
    const todoName = todoInputRef.current.value;

    axios
      .post('https://react-hooks-5e579.firebaseio.com/todos.json', {
        name: todoName
      })
      .then(res => {
        setTimeout(() => {
          const todoItem = { id: res.data.name, name: todoName };
          dispatch({ type: 'ADD', payload: todoItem });
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const todoRemoveHandler = todoId => {
    axios
      .delete(`https://react-hooks-5e579.firebaseio.com/todos/${todoId}.json`)
      .then(res => {
        dispatch({ type: 'REMOVE', payload: todoId });
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
        ref={todoInputRef}
        onChange={inputValidationHandler}
        style={{ backgroundColor: inputIsValid ? 'transparent' : 'red' }}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      {useMemo(() => <List items={todoList} onClick={todoRemoveHandler} />, [
        todoList
      ])}
    </React.Fragment>
  );
};

export default Todo;
