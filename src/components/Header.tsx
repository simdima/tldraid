import { Link, useLocation } from 'react-router-dom';
import { Navbar } from 'flowbite-react';
import { FaGear } from 'react-icons/fa6';
import AppIcon from './molecules/AppIcon';

const Header = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <Navbar fluid>
      <AppIcon />
      {pathname === '/' && (
        <Link to='/settings'>
          <FaGear
            size={30}
            className='flex opacity-0 animate-fade-in-slower text-cyan-normal hover:text-cyan-deep hover:cursor-pointer '></FaGear>
        </Link>
      )}
    </Navbar>
  );
};

export default Header;
