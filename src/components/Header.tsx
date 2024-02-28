import { Navbar } from 'flowbite-react';
import { FaGear } from 'react-icons/fa6';

const Header = (): JSX.Element => {
  return (
    // <div className='app-header'>
    //   <h1
    //     className='title'
    //     onClick={() => window.location.reload()}>
    //     <span className='title-fade-from-left'>tldr</span>
    //     <span className='title-fade-in'>AI</span>
    //     <span className='title-fade-from-top'>d</span>
    //   </h1>

    //   <div
    //     id='config_btn_container'
    //     onClick={() => setShowModal(true)}>
    //     <div id='config_btn'></div>
    //   </div>
    // </div>
    <Navbar fluid>
      <Navbar.Brand
        href='/'
        className='hover:animate-pulse'>
        <span className='self-center whitespace-nowrap text-4xl font-semibold dark:text-white'>
          <span className='relative animate-left-appear'>tldr</span>
          <span className='opacity-0 animate-fade-in-slower text-cyan-600'>AI</span>
          <span className='relative opacity-0 animate-top-appear'>d</span>
        </span>
      </Navbar.Brand>
      <div>
        <FaGear
          size={30}
          className='flex opacity-0 animate-fade-in-slowest text-cyan-600 hover:cursor-pointer dark:hover:text-cyan-700'></FaGear>
      </div>
    </Navbar>
  );
};

export default Header;
