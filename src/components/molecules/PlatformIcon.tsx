import { FaAndroid, FaApple, FaLaptop, FaLinux, FaWindows } from 'react-icons/fa6';
import { Platform } from '../../@types';

interface PlatformIcon {
  platform: Platform;
}
const PlatformIcon = ({ platform }: PlatformIcon) => {
  if (platform === 'common') return <FaLaptop />;
  if (platform === 'android') return <FaAndroid />;
  if (platform === 'linux') return <FaLinux />;
  if (platform === 'osx') return <FaApple />;
  if (platform === 'windows') return <FaWindows />;
  return null;
};

export default PlatformIcon;
