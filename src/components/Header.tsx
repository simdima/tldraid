import { Navbar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';

import AppLogo from './molecules/AppLogo';

const Header = (): JSX.Element => (
  <Navbar className="dark:bg-gray-800" fluid>
    <AppLogo />
    <div className="flex items-center gap-2 md:gap-4">
      <NavLink
        exact
        to="/"
        activeStyle={{ color: '#0891b2', textDecoration: 'underline' }}
        className="cursor-pointer text-sm font-bold transition-colors duration-200 hover:text-cyan-deep md:text-base dark:text-white"
      >
        Home
      </NavLink>
      <NavLink
        to="/settings"
        activeStyle={{ color: '#0891b2', textDecoration: 'underline' }}
        className="cursor-pointer text-sm font-bold transition-colors duration-200 hover:text-cyan-deep md:text-base dark:text-white"
      >
        Settings
      </NavLink>
    </div>
  </Navbar>
);

export default Header;
