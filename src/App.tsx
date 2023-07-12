import { useEffect, useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Introduction from './components/Introduction';
import Description from './components/Description';
import GptAddon from './components/GptAddon';
import Modal from './components/Modal';
import ErrorMessage from './components/ErrorMessage';
import { GptEngine, Platforms } from './@types';
import './App.css';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [chatGptApiKey, setChatGptApiKey] = useState('');
  const [chatGptEngine, setChatGptEngine] = useState<GptEngine>('gpt-3.5-turbo');
  const [selectedPlatform, setSelectedPlatform] = useState<Platforms>('common');
  const [selectedUtil, setSelectedUtil] = useState('');

  const [showIntroduction, setShowIntroduction] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='app'>
        <Header setShowModal={setShowModal} />

        <Search
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          setSelectedUtil={setSelectedUtil}
        />

        {showIntroduction && <Introduction />}

        <div className='content-container'>
          <Description
            selectedLanguage={selectedLanguage}
            setShowIntroduction={setShowIntroduction}
            selectedPlatform={selectedPlatform}
            utility={selectedUtil}
          />
          <GptAddon
            selectedPlatform={selectedPlatform}
            utility={selectedUtil}
            chatGptApikey={chatGptApiKey}
            chatGptEngine={chatGptEngine}
            setError={setError}
          />
        </div>

        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          chatGptApiKey={chatGptApiKey}
          setChatGptApiKey={setChatGptApiKey}
          chatGptEngine={chatGptEngine}
          setChatGptEngine={setChatGptEngine}
        />

        <ErrorMessage
          error={error}
          setError={setError}
        />
      </div>
    </>
  );
}

export default App;
