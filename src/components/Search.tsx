import { useState } from 'react';
import Downshift from 'downshift';
import { Dropdown, TextInput } from 'flowbite-react';
import { FaAndroid, FaWindows, FaApple, FaLinux, FaLaptop } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changePlatform, selectSettingsPlatform } from '../store/reducers/settingsSlice';
import { changeUtility, selectUtilityName } from '../store/reducers/utilitySlice';
import { useGetUtilitiesQuery } from '../store/service/tldraidApi';
import { sortUtilities } from '../helpers';
import { type Platform } from '../@types';

const Search = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const platform = useAppSelector(selectSettingsPlatform);
  const utility = useAppSelector(selectUtilityName);

  const [searchTerm, setSearchTerm] = useState('');

  const selectedPlatformIcon = (platform: Platform) => {
    if (platform === 'common') return <FaLaptop />;
    if (platform === 'android') return <FaAndroid />;
    if (platform === 'linux') return <FaLinux />;
    if (platform === 'osx') return <FaApple />;
    if (platform === 'windows') return <FaWindows />;
  };

  const { data: response } = useGetUtilitiesQuery(platform);

  const filteredUtilities = sortUtilities(response?.data, searchTerm);
  const showUtilitiesList =
    filteredUtilities.length > 0 && searchTerm !== '' && searchTerm.trim() !== utility;

  function handleSelectPlatform(p: Platform) {
    dispatch(changePlatform(p));
    if (utility) {
      dispatch(changeUtility(''));
    }
    setSearchTerm('');
  }

  function handleInputChange(value: string) {
    setSearchTerm(value.toLowerCase());
  }

  function handleSelectUtility(utility: string) {
    dispatch(changeUtility(utility));
    setSearchTerm('');
  }

  function handleEnterKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' && showUtilitiesList) {
      handleSelectUtility(filteredUtilities[0]);
    }
  }

  return (
    <div className='w-11/12 md:w-96 my-8 mx-auto flex z-30'>
      <div className='flex opacity-0 animate-right-appear z-10'>
        <Dropdown
          arrowIcon={false}
          label={selectedPlatformIcon(platform)}>
          <Dropdown.Item
            icon={FaLaptop}
            onClick={() => handleSelectPlatform('common')}>
            Universal
          </Dropdown.Item>
          <Dropdown.Item
            icon={FaAndroid}
            onClick={() => handleSelectPlatform('android')}>
            Android
          </Dropdown.Item>
          <Dropdown.Item
            icon={FaLinux}
            onClick={() => handleSelectPlatform('linux')}>
            Linux
          </Dropdown.Item>
          <Dropdown.Item
            icon={FaApple}
            onClick={() => handleSelectPlatform('osx')}>
            OSX
          </Dropdown.Item>
          <Dropdown.Item
            icon={FaWindows}
            onClick={() => handleSelectPlatform('windows')}>
            Windows
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div
        onKeyUp={handleEnterKey}
        className='w-full ml-2 flex flex-col relative'>
        <Downshift
          inputValue={searchTerm}
          onInputValueChange={value => handleInputChange(value)}
          onChange={selection => handleSelectUtility(selection)}>
          {({ getInputProps, getItemProps, getMenuProps, isOpen, getRootProps }) => (
            <>
              <div {...getRootProps({}, { suppressRefError: true })}>
                <TextInput
                  {...getInputProps({ value: searchTerm })}
                  sizing='md'
                  type='text'
                  placeholder='Search for utility...'
                  className='opacity-0 animate-bottom-appear'
                />
              </div>

              {showUtilitiesList && (
                <ul
                  {...getMenuProps()}
                  className='z-10 rounded shadow focus:outline-none transition-opacity duration-100 border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white absolute max-h-[300px] overflow-auto w-full mt-12 py-1'>
                  {isOpen && searchTerm !== ''
                    ? filteredUtilities.map((utility, index) => (
                        <li
                          {...getItemProps({
                            key: utility,
                            index,
                            item: utility,
                          })}>
                          <button className='flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white'>
                            {utility}
                          </button>
                        </li>
                      ))
                    : null}
                </ul>
              )}
            </>
          )}
        </Downshift>
      </div>
    </div>
  );
};

export default Search;
