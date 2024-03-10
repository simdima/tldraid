import { NavLink } from 'react-router-dom';
import { Navbar } from 'flowbite-react';
import AppLogo from './molecules/AppLogo';

const Header = (): JSX.Element => {
  return (
    <Navbar
      className='dark:bg-gray-800'
      fluid>
      <AppLogo />
      <div className='flex items-center gap-2 md:gap-4'>
        <NavLink
          exact
          activeClassName='navbar-link-active'
          to='/'
          className='navbar-link'>
          Home
        </NavLink>
        <NavLink
          activeClassName='navbar-link-active'
          to='/settings'
          className='navbar-link'>
          Settings
        </NavLink>
      </div>
    </Navbar>
  );
};

export default Header;
