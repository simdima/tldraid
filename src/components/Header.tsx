import { Navbar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';

import AppLogo from './molecules/AppLogo';

const Header = (): JSX.Element => (
  <Navbar
    className='dark:bg-gray-800'
    fluid>
    <AppLogo />
    <div className='flex items-center gap-2 md:gap-4'>
      <NavLink
        exact
        to='/'
        activeStyle={{ color: '#0891b2', textDecoration: 'underline' }}
        className='dark:text-white text-sm md:text-base font-bold cursor-pointer hover:text-cyan-deep transition-colors duration-200'>
        Home
      </NavLink>
      <NavLink
        to='/settings'
        activeStyle={{ color: '#0891b2', textDecoration: 'underline' }}
        className='dark:text-white text-sm md:text-base font-bold cursor-pointer hover:text-cyan-deep transition-colors duration-200'>
        Settings
      </NavLink>
    </div>
  </Navbar>
);

export default Header;
