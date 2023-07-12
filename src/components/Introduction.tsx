import './Introduction.scss';

const Introduction = (): JSX.Element => {
  return (
    <div className='introduction'>
      <p>
        <span className='introduction-non-keywords'>Get summaries of </span>
        <a
          href='https://tldr.sh/'
          target='_blank'>
          tldr pages
        </a>
        <span className='introduction-non-keywords'> that are supercharged </span>
        <a
          href='https://chat.openai.com/'
          target='_blank'>
          with AI-powered ChatGPT bot
        </a>
        <span className='introduction-non-keywords'>
          {' '}
          to help you find your way around any utility
        </span>
      </p>
    </div>
  );
};

export default Introduction;
