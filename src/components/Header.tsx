import { Button, Navbar } from 'flowbite-react';
import './Header.scss';
import { FaGear } from 'react-icons/fa6';
import { IconContext } from 'react-icons';

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
      <Navbar.Brand href='/'>
        <span className='self-center whitespace-nowrap text-4xl font-semibold dark:text-white'>
          <span>tldr</span>
          <span className='text-cyan-600 '>AI</span>
          <span>d</span>
        </span>
      </Navbar.Brand>

      <div className='flex'>
        <FaGear
          size={30}
          className='text-cyan-600 hover:cursor-pointer dark:hover:text-cyan-700 hover:animate-spin-slow'></FaGear>
      </div>
    </Navbar>
  );
};

export default Header;
