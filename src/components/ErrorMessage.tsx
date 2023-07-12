import './ErrorMessage.scss';

type Props = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  // children: React.ReactNode;
};

const ErrorMessage = ({ error, setError }: Props): JSX.Element => {
  // return <>{children}</>;
  return (
    <>
      {error && (
        <div
          className='error-popup'
          onClick={() => setError('')}>
          <div>{error}</div>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
