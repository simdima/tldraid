import { Navbar } from 'flowbite-react';
import { FaGear } from 'react-icons/fa6';

const Header = (): JSX.Element => {
  return (
    <Navbar fluid>
      <Navbar.Brand
        href='/'
        className='hover:animate-pulse'>
        <span className='self-center whitespace-nowrap text-4xl font-semibold dark:text-white'>
          <span className='relative animate-left-appear'>tldr</span>
          <span className='opacity-0 animate-fade-in-slower text-cyan-normal'>AI</span>
          <span className='relative opacity-0 animate-top-appear'>d</span>
        </span>
      </Navbar.Brand>
      <div>
        <FaGear
          size={30}
          className='flex opacity-0 animate-fade-in-slowest text-cyan-normal hover:cursor-pointer dark:hover:text-cyan-deep'></FaGear>
      </div>
    </Navbar>
  );
};

export default Header;
