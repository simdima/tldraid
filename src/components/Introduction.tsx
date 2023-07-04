import './Introduction.scss';

const Introduction = (): JSX.Element => {
  return (
    <div className='introduction'>
      <p>
        <span className='introduction-non-keywords'>Browse through </span>tldr pages
        <span className='introduction-non-keywords'> that are supercharged </span>with AI-powered
        ChatGPT bot{' '}
        <span className='introduction-non-keywords'>
          to help you find your way around the utility of your choice
        </span>
      </p>
    </div>
  );
};

export default Introduction;
