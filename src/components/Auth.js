import React, { useContext } from 'react';

import AuthConext from '../auth-context';

const auth = props => {
  const auth = useContext(AuthConext);
  return <button onClick={auth.login}>Log in!</button>;
};

export default auth;
