import { Spinner, type SpinnerProps } from 'flowbite-react';

const Loader = (spinnerProps: SpinnerProps) => (
  <div className="flex flex-grow items-center justify-center">
    <Spinner {...spinnerProps} />
  </div>
);

export default Loader;
