import { useAppSelector } from '../store/hooks';
import { selectIsLoading } from '../store/reducers/loadAndErrorSlice';

import './Spinner.scss';

const Spinner = (): JSX.Element | null => {
  const isLoading = useAppSelector(selectIsLoading);

  return isLoading ? (
    <div className={`loader-container ${isLoading && 'loader-visible'}`}>
      <div className='loader'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
};

export default Spinner;
