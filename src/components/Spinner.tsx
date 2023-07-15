import './Spinner.scss';

type Props = {
  isLoading: boolean;
};

const Spinner = ({ isLoading }: Props): JSX.Element => {
  return (
    <div className={`loader-container ${isLoading && 'loader-visible'}`}>
      <div className='loader'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
