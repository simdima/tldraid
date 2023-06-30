import Search from './components/Search';
import './App.css';
import { useEffect, useState } from 'react';
import Description from './components/Description';

function App() {
  const [lang] = useState('en');
  const [platform] = useState('common');

  const [selectedUtil, setSelectedUtil] = useState('');
  // watcher (test-only)
  useEffect(() => {
    console.log('New util was selected', selectedUtil);
  }, [selectedUtil]);

  return (
    <>
      <h1 className='title'>TLDRaiD</h1>
      <div className='container'>
        <Search
          lang={lang}
          platform={platform}
          setSelectedUtil={setSelectedUtil}
        />
        <Description
          lang={lang}
          platform={platform}
          utility={selectedUtil}
        />
      </div>
    </>
  );
}

export default App;
