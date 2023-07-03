import { useEffect, useRef, useState } from 'react';
import OutsideClicker from '../hooks/OutsideClicker';
import { sendApiRequest } from '../api';
import { sortUtilities } from '../helpers';
import { UtilitesResponse, QueryParams, Platforms } from '../@types';
import './Search.scss';

type Props = {
  selectedPlatform: Platforms;
  setSelectedPlatform: React.Dispatch<React.SetStateAction<Platforms>>;
  setSelectedUtil: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ selectedPlatform, setSelectedPlatform, setSelectedUtil }: Props): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [utils, setUtils] = useState<string[]>([]);

  const [showSearchList, setShowSearchList] = useState(false);
  const searchListRef = useRef(null);

  useEffect(() => {
    console.log('>> Selected Platform: ', selectedPlatform);
  }, [selectedPlatform]);

  // get it from API?
  const platforms: Platforms[] = ['common', 'linux', 'osx', 'windows', 'android'];

  useEffect(() => {
    setShowSearchList(!!searchTerm);
  }, [searchTerm]);

  // fetch utils with common params on component load
  useEffect(() => {
    (async () => {
      const response = await sendApiRequest<UtilitesResponse, QueryParams>('/utilities', {
        platform: selectedPlatform,
      });

      if (response) {
        console.log('🟢', response.data);
        setUtils(response.data);
      }
    })();
  }, [selectedPlatform]);

  const sortedAndFilteredUtils = sortUtilities(
    utils.filter(util => util.indexOf(searchTerm.toLowerCase()) > -1),
    searchTerm.toLowerCase()
  );

  function handleSelectPlatform(p: Platforms) {
    setSelectedPlatform(p);
  }

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
      setShowSearchList(false);
    }
  }

  return (
    <div className='search-container'>
      <OutsideClicker onShowSearchList={setShowSearchList}>
        <div
          className='wrapper'
          onKeyUp={handleEnterKey}>
          <div id='searchTools'>
            <div id='util_platforms'>
              {platforms.map(id => (
                <div
                  key={id}
                  id={id}
                  style={{ opacity: '0' }}
                  className={`platform ${id == selectedPlatform ? 'selected-platform' : ''}`}
                  onClick={() => handleSelectPlatform(id)}>
                  <div className='platform-icon'></div>
                </div>
              ))}
            </div>

            <input
              id='util_search'
              type='text'
              placeholder='Search for utility...'
              value={searchTerm}
              onChange={handleChange}
            />
          </div>

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
