import cls from 'classnames';
import { Dropdown } from 'flowbite-react';
import { useAtom } from 'jotai';
import { memo } from 'react';
import { FaAndroid, FaApple, FaLaptop, FaLinux, FaWindows } from 'react-icons/fa6';

import type { Platform } from '../atoms/platform';
import { platformAtom } from '../atoms/platform';
import { utilityAtom } from '../atoms/utility';
import PlatformIcon from './molecules/PlatformIcon';

const PlatformSelector = memo(() => {
  const [utility, setUtility] = useAtom(utilityAtom);
  const [platform, setPlatform] = useAtom(platformAtom);

  function handlePlatformChange(p: Platform) {
    setPlatform(p);
    setUtility('');
  }

  return (
    <div
      className={cls(
        'absolute right-[3px] top-[3px] h-auto w-fit',
        { 'opacity-100': utility },
        { 'animate-right-appear opacity-0': !utility }
      )}
    >
      <Dropdown arrowIcon={false} label={<PlatformIcon platform={platform} />}>
        <Dropdown.Item icon={FaLaptop} onClick={() => handlePlatformChange('common')}>
          Universal
        </Dropdown.Item>
        <Dropdown.Item icon={FaAndroid} onClick={() => handlePlatformChange('android')}>
          Android
        </Dropdown.Item>
        <Dropdown.Item icon={FaLinux} onClick={() => handlePlatformChange('linux')}>
          Linux
        </Dropdown.Item>
        <Dropdown.Item icon={FaApple} onClick={() => handlePlatformChange('osx')}>
          OSX
        </Dropdown.Item>
        <Dropdown.Item icon={FaWindows} onClick={() => handlePlatformChange('windows')}>
          Windows
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
});

export default PlatformSelector;
