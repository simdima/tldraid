import { Spinner, type SpinnerProps } from 'flowbite-react';

const Loader = (spinnerProps: SpinnerProps) => (
  <div className='flex flex-grow justify-center items-center'>
    <Spinner {...spinnerProps} />
  </div>
);

export default Loader;
