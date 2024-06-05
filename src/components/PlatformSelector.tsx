import cls from 'classnames';
import { Dropdown } from 'flowbite-react';
import { memo } from 'react';
import { FaAndroid, FaApple, FaLaptop, FaLinux, FaWindows } from 'react-icons/fa6';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changePlatform, Platform, selectSettingsPlatform } from '../store/reducers/settingsSlice';
import { changeUtility, selectUtilityName } from '../store/reducers/utilitySlice';
import PlatformIcon from './molecules/PlatformIcon';

const PlatformSelector = memo(() => {
  const dispatch = useAppDispatch();

  const utility = useAppSelector(selectUtilityName);
  const platform = useAppSelector(selectSettingsPlatform);

  function handlePlatformChange(p: Platform) {
    dispatch(changePlatform(p));
    dispatch(changeUtility(''));
  }

  return (
    <div
      className={cls(
        'absolute right-[2px] top-[3px] h-auto w-fit',
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
