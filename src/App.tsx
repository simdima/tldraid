import { useEffect, useState } from 'react';
import Title from './components/Title';
import Search from './components/Search';
import Description from './components/Description';
import GptAddon from './components/GptAddon';
import { Platforms } from './@types';
import './App.css';

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platforms>('common');
  const [selectedUtil, setSelectedUtil] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='app'>
        <Title />
        <Search
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          setSelectedUtil={setSelectedUtil}
        />
        <div className='content-container'>
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
