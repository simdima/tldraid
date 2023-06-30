import { useEffect, useRef, useState } from 'react';
import OutsideClicker from '../hooks/OutsideClicker';
import { sendApiRequest } from '../api';
import { sortUtilities } from '../helpers';
import { UtilitesResponse, QueryParams } from '../@types';
import './Search.scss';

type Props = {
  lang: string;
  platform: string;
  setSelectedUtil: React.Dispatch<React.SetStateAction<string>>;
};

const Search: React.FC<Props> = ({ lang, platform, setSelectedUtil }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [utils, setUtils] = useState<string[]>([]);

  const [showSearchList, setShowSearchList] = useState(false);
  const searchListRef = useRef(null);

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
    utils.filter(util => util.indexOf(searchTerm.toLowerCase()) > -1),
    searchTerm.toLowerCase()
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
      setShowSearchList(false);
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
