import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      <LogoutIcon className='icon' />
      Log Out
    </button>
  );
}

export default LogOutButton;
