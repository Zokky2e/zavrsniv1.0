import {  React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthValue } from '../User/UserContext';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const currentUser = useAuthValue();
  const [content, setContent] = useState(null);
 useEffect(()=>{
  if(currentUser===null) {
    setContent(<li><Link to='sign-in'>Sign In</Link></li>);
  }
  else{
    setContent(<li><Link to='/profile'>Profile</Link></li>)
  }
 },[currentUser])
  return (
    <header className={classes.header}>
      <div className={classes.logo}>My Notes</div>
      <nav>
        <ul><li><Link to='/'>My Notes</Link></li>
        {content}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;