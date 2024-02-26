import { useEffect, useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Introduction from './components/Introduction';
import Description from './components/Description';
import GptAddon from './components/GptAddon';
import Modal from './components/Modal';
import ErrorMessage from './components/ErrorMessage';
import Spinner from './components/Spinner';

import './App.css';

function App() {
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='app'>
      <Header setShowModal={setShowModal} />
      <Search />
      {showIntroduction ? <Introduction /> : <Spinner isLoading={isLoading} />}
      <div className='content-container'>
        <Description
          setShowIntroduction={setShowIntroduction}
          setError={setError}
        />

        <GptAddon
          setError={setError}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setError={setError}
        />
      )}

      {error && (
        <ErrorMessage
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
}

export default App;
