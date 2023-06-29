import { useEffect, useRef, useState } from 'react';
import { sendApiRequest } from '../api';
import { UtilitesResponse, QueryParams } from '../@types';
import './Search.css';
import { sortUtilities } from '../helpers';
import OutsideClicker from '../hooks/OutsideClicker';

const Search = () => {
  const [lang, setLang] = useState('en');
  const [platform, setPlatform] = useState('common');

  const [searchTerm, setSearchTerm] = useState('');
  const [utils, setUtils] = useState<string[]>([]);
  const [selectedUtil, setSelectedUtil] = useState('');

  const [showSearchList, setShowSearchList] = useState(false);
  const searchListRef = useRef(null);

  // watcher (test-only)
  useEffect(() => {
    console.log('New util was selected', selectedUtil);
  }, [selectedUtil]);

  useEffect(() => {
    setShowSearchList(!!searchTerm);
  }, [searchTerm]);

  // fetch utils with common params on component load
  useEffect(() => {
    (async () => {
      const response = await sendApiRequest<UtilitesResponse, QueryParams>('/utilities', {
        lang,
        platform,
      });
      if (response) {
        setUtils(response.data);
      }
    })();
  }, [lang, platform]);

  const sortedAndFilteredUtils = sortUtilities(
    utils.filter(util => util.indexOf(searchTerm) > -1),
    searchTerm
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSelectUtility(utility: string) {
    setSelectedUtil(utility);
    setShowSearchList(false);
  }

  function handleEnterKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' && showSearchList) {
      setSelectedUtil(sortedAndFilteredUtils[0]);
    }
  }

  return (
    <div className='search-container'>
      <OutsideClicker onShowSearchList={setShowSearchList}>
        <div
          className='wrapper'
          onKeyUp={handleEnterKey}>
          <input
            type='text'
            placeholder='Search for utility...'
            value={searchTerm}
            onChange={handleChange}
          />

          {showSearchList && (
            <div
              className='searchList'
              ref={searchListRef}>
              {sortedAndFilteredUtils.map(util => (
                <div
                  key={util}
                  className='searchOption'
                  onClick={() => handleSelectUtility(util)}>
                  {util}
                </div>
              ))}
            </div>
          )}
        </div>
      </OutsideClicker>
    </div>
  );
};

export default Search;
