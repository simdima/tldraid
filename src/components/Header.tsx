import './Header.scss';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setShowModal }: Props): JSX.Element => {
  return (
    <div className='app-header'>
      <h1
        className='title'
        onClick={() => window.location.reload()}>
        <span className='title-fade-from-left'>tldr</span>
        <span className='title-fade-in'>AI</span>
        <span className='title-fade-from-top'>d</span>
      </h1>

      <div
        id='config_btn_container'
        onClick={() => setShowModal(true)}>
        <div id='config_btn'></div>
      </div>
    </div>
  );
};

export default Header;
