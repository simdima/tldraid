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
import { GptEngine, GptEngineNames, Platforms } from './@types';
import './App.css';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedPlatform, setSelectedPlatform] = useState<Platforms>('common');
  const [selectedUtility, setSelectedUtility] = useState('');

  const [chatGptApiKey, setChatGptApiKey] = useLocalStorage();
  const [chatGptEngine, setChatGptEngine] = useState<GptEngine>(GptEngineNames['GPT_V3']);

  const [showIntroduction, setShowIntroduction] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
          setSelectedUtil={setSelectedUtility}
          setError={setError}
        />

        {showIntroduction ? <Introduction /> : <Spinner isLoading={isLoading} />}

        <div className='content-container'>
          <Description
            selectedLanguage={selectedLanguage}
            setShowIntroduction={setShowIntroduction}
            selectedPlatform={selectedPlatform}
            utility={selectedUtility}
            setError={setError}
          />
          <GptAddon
            selectedPlatform={selectedPlatform}
            utility={selectedUtility}
            chatGptApikey={chatGptApiKey}
            chatGptEngine={chatGptEngine}
            setError={setError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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
          setError={setError}
        />

        <ErrorMessage
          key={error}
          error={error}
          setError={setError}
        />
      </div>
    </>
  );
}

export default App;
