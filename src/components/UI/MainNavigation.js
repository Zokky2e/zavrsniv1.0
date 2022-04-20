import {  React } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>My Notes</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>My Notes</Link>
          </li>
          <li>
            <Link to='/new-note'>Add New Note</Link>
          </li>
          {/* <li>
            <Link to='/login'>
              Login
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;