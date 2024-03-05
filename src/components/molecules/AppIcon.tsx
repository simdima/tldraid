import { Navbar } from 'flowbite-react';

const AppIcon = () => (
  <Navbar.Brand
    href='/'
    className='hover:animate-pulse'>
    <span className='self-center whitespace-nowrap text-4xl font-semibold dark:text-white'>
      <span className='relative animate-left-appear'>tldr</span>
      <span className='opacity-0 animate-fade-in-slower text-cyan-normal'>AI</span>
      <span className='relative opacity-0 animate-top-appear'>d</span>
    </span>
  </Navbar.Brand>
);

export default AppIcon;
