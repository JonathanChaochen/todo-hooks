import React, { useContext } from 'react';
import AuthConext from '../auth-context';
const header = props => {
  const auth = useContext(AuthConext);
  return (
    <header>
      {auth.status && <button onClick={props.onLoadTodo}>Todo List</button>}
      <button onClick={props.onLoadAuth}>Auth</button>
    </header>
  );
};

export default header;
