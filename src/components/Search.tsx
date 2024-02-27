import { useEffect, useState } from 'react';
import OutsideClicker from '../hooks/OutsideClicker';
import { sortUtilities } from '../helpers';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changePlatform, selectSettingsPlatform } from '../store/reducers/settingsSlice';
import { changeUtility, selectUtilityName } from '../store/reducers/utilitySlice';
import { useGetUtilitiesQuery } from '../store/service/tldraidApi';
import { type Platform, PLATFORMS } from '../@types';

import './Search.scss';

const Search = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const platform = useAppSelector(selectSettingsPlatform);
  const utility = useAppSelector(selectUtilityName);

  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchList, setShowSearchList] = useState(false);

  useEffect(() => {
    setShowSearchList(!!searchTerm);
  }, [searchTerm]);

  const { data: response, isLoading, isError } = useGetUtilitiesQuery(platform);

  // if (isError) {}

  const sortedAndFilteredUtils = sortUtilities(
    response?.data.filter(util => util.indexOf(searchTerm.trim().toLowerCase()) > -1),
    searchTerm.trim().toLowerCase()
  );

  function handleSelectPlatform(p: Platform) {
    dispatch(changePlatform(p));
    if (utility) {
      dispatch(changeUtility(''));
    }

    setSearchTerm('');
    setShowSearchList(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  function handleSelectUtility(utility: string) {
    dispatch(changeUtility(utility));

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
            {PLATFORMS.map(id => (
              <div
                key={id}
                id={id}
                style={{ opacity: '0' }}
                className={`platform ${id === platform ? 'selected-platform' : ''}`}
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
