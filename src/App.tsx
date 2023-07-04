import { useEffect, useState } from 'react';
import Title from './components/Title';
import Search from './components/Search';
import Description from './components/Description';
import GptAddon from './components/GptAddon';
import { Platforms } from './@types';
import './App.css';
import Introduction from './components/Introduction';

function App() {
  const [showIntroduction, setShowIntroduction] = useState(true);
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
        {showIntroduction && <Introduction />}
        <div className='content-container'>
          <Description
            setShowIntroduction={setShowIntroduction}
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
