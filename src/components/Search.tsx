import { useQuery } from '@tanstack/react-query';
import cls from 'classnames';
import { useCombobox } from 'downshift';
import { TextInput } from 'flowbite-react';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { getUtilitiesByPlatform } from '../api/tldraidApi';
import { globalErrorAtom } from '../atoms/globalError';
import { platformAtom } from '../atoms/settings';
import { utilityAtom } from '../atoms/utility';
import PlatformSelector from './PlatformSelector';

const Search = (): JSX.Element | null => {
  const [platform] = useAtom(platformAtom);
  const [utility, setUtility] = useAtom(utilityAtom);

  const { data: utilitiesResponse = [], isError } = useQuery({
    queryKey: ['utilities', platform],
    queryFn: () => getUtilitiesByPlatform(platform),
    staleTime: 1000 * 60 * 60,
  });

  const [, setGlobalError] = useAtom(globalErrorAtom);

  const [utilities, setUtilities] = useState<string[]>([]);

  const sortUtilities = (term: string) =>
    utilitiesResponse.filter(util => new RegExp(`^${term.trim()}.*`, 'gi').test(util));

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputValue,
    setInputValue,
    setHighlightedIndex,
  } = useCombobox({
    items: utilities,
    defaultInputValue: utility,
    onIsOpenChange: ({ inputValue, isOpen }) => {
      if (isOpen) {
        if (inputValue) {
          setUtilities(sortUtilities(inputValue.toLowerCase()));
        } else {
          setUtilities([]);
        }
      }
    },
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        setHighlightedIndex(0);
        setUtilities(sortUtilities(inputValue.toLowerCase()));
      } else {
        setUtilities([]);
      }
    },
    onSelectedItemChange: ({ inputValue }) => {
      if (inputValue) {
        setUtility(inputValue.toLowerCase());
      }
    },
  });

  useEffect(() => {
    setInputValue('');
  }, [platform, setInputValue]);

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue && utilities.indexOf(inputValue) > -1) {
      setUtility(inputValue);
    }
  }

  if (isError) {
    setGlobalError('Failed to get list of utilities');

    return null;
  }

  return (
    <div className="relative z-50 mx-auto my-8 flex w-11/12 md:w-5/12">
      <div className="relative ml-2 flex w-full flex-col">
        <form onSubmit={handleSearchSubmit}>
          <TextInput
            {...getInputProps()}
            value={inputValue.toLowerCase()}
            sizing="md"
            type="text"
            placeholder="Search for utility..."
            className={cls(
              'rounded-xl dark:bg-gray-700',
              { 'opacity-100': utility },
              { 'animate-bottom-appear opacity-0': !utility }
            )}
          />
        </form>
        <ul
          {...getMenuProps()}
          className="absolute mx-auto mt-12 max-h-[300px] w-full overflow-auto rounded border border-none border-gray-200 bg-white text-sm shadow transition-opacity duration-100 focus:outline-none dark:bg-gray-700 dark:text-white"
        >
          {isOpen &&
            utilities.map((utilityName, index) => (
              <li
                key={utilityName}
                {...getItemProps({
                  item: utilityName,
                  index,
                })}
                className={`my-2 cursor-pointer px-4 py-2 ${
                  index === highlightedIndex ? 'bg-gray-100 dark:bg-gray-600' : ''
                }`}
              >
                {utilityName}
              </li>
            ))}
        </ul>
        <PlatformSelector />
      </div>
    </div>
  );
};

export default Search;
