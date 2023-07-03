import Search from './components/Search';
import './App.css';
import { useEffect, useState } from 'react';
import Description from './components/Description';
import GptAddon from './components/GptAddon';
import Title from './components/Title';
import { Platforms } from './@types';

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platforms>('common');
  const [selectedUtil, setSelectedUtil] = useState('');
  // watcher (test-only)
  useEffect(() => {
    console.log('🏷️ new util has been selected: ', selectedUtil);
  }, [selectedUtil]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  useEffect(() => {
    console.log('💻 platform has changed');
    setSelectedUtil('');
  }, [selectedPlatform]);

  return (
    <>
      <Title />
      <div className='app'>
        <Search
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          setSelectedUtil={setSelectedUtil}
        />
        <div className='description'>
          <Description
            selectedPlatform={selectedPlatform}
            utility={selectedUtil}
          />
          <GptAddon
            selectedPlatform={selectedPlatform}
            utility={selectedUtil}
          />
        </div>
      </div>
    </>
  );
}

export default App;
