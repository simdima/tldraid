import { useEffect, useState } from 'react';
import OutsideClicker from '../hooks/OutsideClicker';
import { sendApiRequest } from '../api';
import { sortUtilities } from '../helpers';
import { UtilitesResponse, Platforms } from '../@types';
import './Search.scss';

type Props = {
  selectedPlatform: Platforms;
  setSelectedPlatform: React.Dispatch<React.SetStateAction<Platforms>>;
  setSelectedUtil: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({
  selectedPlatform,
  setSelectedPlatform,
  setSelectedUtil,
  setError,
}: Props): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchList, setShowSearchList] = useState(false);
  const [utils, setUtils] = useState<string[]>([]);

  useEffect(() => {
    setShowSearchList(!!searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    (async () => {
      try {
        if (selectedPlatform) {
          const response = await sendApiRequest<UtilitesResponse>('/utilities', {
            platform: selectedPlatform,
          });

          if ('error' in response) {
            throw new Error(response.error);
          }

          setUtils(response.data);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          console.error(error.message);
        }

        setError('Failed to fetch utilities');
      }
    })();
  }, [selectedPlatform, setError]);

  const platforms: Platforms[] = ['common', 'linux', 'osx', 'windows', 'android'];

  const sortedAndFilteredUtils = sortUtilities(
    utils.filter(util => util.indexOf(searchTerm.trim().toLowerCase()) > -1),
    searchTerm.trim().toLowerCase()
  );

  function handleSelectPlatform(p: Platforms) {
    setSelectedPlatform(p);
    setSelectedUtil('');
    setSearchTerm('');
    setShowSearchList(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSelectUtility(utility: string) {
    setSelectedUtil(utility);
    setShowSearchList(false);
    setSearchTerm('');
  }

  function handleEnterKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' && showSearchList) {
      handleSelectUtility(sortedAndFilteredUtils[0]);
    }
  }

  return (
    <div className='search-container'>
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
                className={`platform ${id === selectedPlatform ? 'selected-platform' : ''}`}
                onClick={() => handleSelectPlatform(id)}>
                <div className='platform-icon'></div>
              </div>
            ))}
          </div>

          <OutsideClicker onShowSearchList={setShowSearchList}>
            <input
              id='util_search'
              type='text'
              placeholder='Search for utility...'
              value={searchTerm}
              onChange={handleChange}
            />

            {showSearchList && (
              <div className='searchList'>
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
          </OutsideClicker>
        </div>
      </div>
    </div>
  );
};

export default Search;
