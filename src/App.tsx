import { useEffect, useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Introduction from './components/Introduction';
import Description from './components/Description';
import GptAddon from './components/GptAddon';
import Modal from './components/Modal';
import ErrorMessage from './components/ErrorMessage';
import Spinner from './components/Spinner';
import useLocalStorage from './hooks/useLocalStorage';
import {
  API_KEY_STORAGE_KEY,
  GptEngine,
  GptEngineNames,
  LANGUAGE_STORAGE_KEY,
  Platforms,
} from './@types';
import './App.css';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage(LANGUAGE_STORAGE_KEY, 'en');
  const [selectedPlatform, setSelectedPlatform] = useState<Platforms>('common');
  const [selectedUtility, setSelectedUtility] = useState('');

  const [chatGptApiKey, setChatGptApiKey] = useLocalStorage(API_KEY_STORAGE_KEY, '');
  const [chatGptEngine, setChatGptEngine] = useState<GptEngine>(GptEngineNames['GPT_V3']);

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

      <Search
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        setSelectedUtil={setSelectedUtility}
        setError={setError}
      />

      {showIntroduction ? <Introduction /> : <Spinner isLoading={isLoading} />}

      {selectedUtility && (
        <div className='content-container'>
          <Description
            selectedLanguage={selectedLanguage}
            setShowIntroduction={setShowIntroduction}
            selectedPlatform={selectedPlatform}
            selectedUtility={selectedUtility}
            setError={setError}
          />
          <GptAddon
            selectedPlatform={selectedPlatform}
            selectedUtility={selectedUtility}
            chatGptApikey={chatGptApiKey}
            chatGptEngine={chatGptEngine}
            setError={setError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      )}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          chatGptApiKey={chatGptApiKey}
          setChatGptApiKey={setChatGptApiKey}
          chatGptEngine={chatGptEngine}
          setChatGptEngine={setChatGptEngine}
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
