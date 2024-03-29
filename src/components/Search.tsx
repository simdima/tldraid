import { useState } from 'react';
import { useCombobox } from 'downshift';
import { Dropdown, TextInput } from 'flowbite-react';
import { FaAndroid, FaWindows, FaApple, FaLinux, FaLaptop } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changePlatform, selectSettingsPlatform } from '../store/reducers/settingsSlice';
import { changeUtility, selectUtilityName } from '../store/reducers/utilitySlice';
import { useGetUtilitiesQuery } from '../store/service/tldraidApi';
import { setToastError } from '../store/reducers/loadAndErrorSlice';
import PlatformIcon from './molecules/PlatformIcon';
import { type Platform } from '../@types';

const Search = (): JSX.Element | null => {
  const dispatch = useAppDispatch();

  const platform = useAppSelector(selectSettingsPlatform);
  const utility = useAppSelector(selectUtilityName);

  const { data: utilitiesResponse = [], isError } = useGetUtilitiesQuery(platform);

  const [utilities, setUtilities] = useState<string[]>([]);

  const sortUtilities = (source: string[], term: string) =>
    source.filter(util => new RegExp(`^${term.trim()}.*`, 'gi').test(util));

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputValue,
    setInputValue,
  } = useCombobox({
    items: utilities,
    defaultInputValue: utility,
    onIsOpenChange: ({ inputValue, isOpen }) => {
      if (isOpen) {
        if (inputValue) {
          setUtilities(sortUtilities(utilitiesResponse, inputValue));
        } else {
          setUtilities([]);
        }
      }
    },
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        setUtilities(sortUtilities(utilitiesResponse, inputValue));
      } else {
        setUtilities([]);
      }
    },
    onSelectedItemChange: ({ inputValue }) => {
      if (inputValue) {
        dispatch(changeUtility(inputValue));
      }
    },
  });

  function handlePlatformChange(p: Platform) {
    dispatch(changePlatform(p));
    if (utility) {
      dispatch(changeUtility(''));
      setInputValue('');
    }
  }

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(changeUtility(inputValue));
  }

  if (isError) {
    dispatch(setToastError('Failed to get list of utilities'));

    return null;
  }

  return (
    <div className='w-11/12 md:w-5/12 my-8 mx-auto flex relative z-50'>
      <div className='flex opacity-0 animate-right-appear'>
        <Dropdown
          arrowIcon={false}
          label={<PlatformIcon platform={platform} />}>
          <Dropdown.Item
            icon={FaLaptop}
            onClick={() => handlePlatformChange('common')}>
            Universal
          </Dropdown.Item>
          <Dropdown.Item
            icon={FaAndroid}
            onClick={() => handlePlatformChange('android')}>
            Android
          </Dropdown.Item>
          <Dropdown.Item
            icon={FaLinux}
            onClick={() => handlePlatformChange('linux')}>
            Linux
          </Dropdown.Item>
          <Dropdown.Item
            icon={FaApple}
            onClick={() => handlePlatformChange('osx')}>
            OSX
          </Dropdown.Item>
          <Dropdown.Item
            icon={FaWindows}
            onClick={() => handlePlatformChange('windows')}>
            Windows
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className='w-full ml-2 flex flex-col relative'>
        <form onSubmit={handleSearchSubmit}>
          <TextInput
            {...getInputProps()}
            sizing='md'
            type='text'
            placeholder='Search for utility...'
            className='opacity-0 animate-bottom-appear dark:bg-gray-700 rounded-xl'
          />
        </form>
        <ul
          {...getMenuProps()}
          className='rounded shadow focus:outline-none transition-opacity duration-100 border border-gray-200 border-none bg-white dark:bg-gray-700 dark:text-white max-h-[300px] overflow-auto w-full mx-auto text-sm absolute mt-12'>
          {isOpen &&
            utilities.map((utilityName, index) => (
              <li
                key={utilityName}
                {...getItemProps({
                  item: utilityName,
                  index,
                })}
                className={`my-2 px-4 py-2 cursor-pointer ${
                  index === highlightedIndex ? ' bg-gray-100 dark:bg-gray-600' : ''
                }`}>
                {utilityName}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
