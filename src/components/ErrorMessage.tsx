import './ErrorMessage.scss';

type Props = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const ErrorMessage = ({ error, setError }: Props): JSX.Element => {
  return (
    <>
      {error && (
        <div
          className='error-popup'
          onClick={() => setError('')}>
          <div>Error</div>
          <div>{error}</div>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
