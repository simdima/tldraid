import { useCallback, useEffect, useState } from 'react';
import ISO6391 from 'iso-639-1';
import { sendApiRequest } from '../api';
import { APP_VERSION, GptEngine, GptEngineNames, LanguagesResponse } from '../@types';
import './Modal.scss';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  chatGptApiKey: string;
  setChatGptApiKey: React.Dispatch<React.SetStateAction<string>>;
  chatGptEngine: string;
  setChatGptEngine: React.Dispatch<React.SetStateAction<GptEngine>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const Modal = ({
  setShowModal,
  selectedLanguage,
  setSelectedLanguage,
  chatGptApiKey,
  setChatGptApiKey,
  chatGptEngine,
  setChatGptEngine,
  setError,
}: Props): JSX.Element => {
  const [langList, setLangList] = useState<string[]>([]);
  const [showLangList, setShowLangList] = useState(false);

  const engines: GptEngineNames[] = [GptEngineNames.GPT_V3, GptEngineNames.GPT_V4];
  const [showEngineList, setShowEngineList] = useState(false);

  const [apiKey, setApiKey] = useState(chatGptApiKey);

  useEffect(() => {
    (async () => {
      try {
        const response = await sendApiRequest<LanguagesResponse>('/languages');

        if ('error' in response) {
          throw new Error(response.error);
        }

        setLangList(response.data);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          console.error(error.message);
        }

        setError('Failed to fetch languages');
      }
    })();
  }, [setError]);

  const hideModal = useCallback(() => {
    setShowLangList(false);
    setShowEngineList(false);
    setChatGptApiKey(apiKey);
    setShowModal(false);
  }, [setShowLangList, setShowEngineList, setChatGptApiKey, setShowModal, apiKey]);

  function handleClickLangSelect() {
    setShowEngineList(false);
    setShowLangList(sll => !sll);
  }

  function handleClickEngineSelect() {
    setShowLangList(false);
    setShowEngineList(sel => !sel);
  }

  function handleLangOptionSelected(selectedOption: string) {
    setShowLangList(false);
    setSelectedLanguage(selectedOption);
  }

  function handleEngineOptionSelected(selectedOption: GptEngine) {
    setShowEngineList(false);
    setChatGptEngine(selectedOption);
  }

  function handleChangeApiKey(e: React.ChangeEvent<HTMLInputElement>) {
    setApiKey(e.target.value);
  }

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hideModal();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [hideModal]);

  return (
    <>
      <div id='config_modal'>
        <div className='modal-header'>
          <h1 className='modal-title'>Configuration</h1>
          <div
            className='modal-close-btn'
            onClick={hideModal}>
            <div className='close-logo'></div>
          </div>
        </div>
        <div className='modal-content'>
          <div className='lang-config'>
            <label htmlFor='lang_select'>
              <p>Descriptions' language:</p>
              <input
                type='text'
                readOnly={true}
                id='lang_select'
                name='lang_select'
                value={ISO6391.getName(selectedLanguage)}
                onClick={handleClickLangSelect}
              />
            </label>
            {showLangList && (
              <div className='language-select-list'>
                {langList.map(
                  lang =>
                    // skip options that have no entry in ISO-6391 library
                    ISO6391.getName(lang) && (
                      <div
                        key={lang}
                        className='searchOption'
                        onClick={() => handleLangOptionSelected(lang)}>
                        {ISO6391.getName(lang)}
                      </div>
                    )
                )}
              </div>
            )}
          </div>

          <div className='lang-config'>
            <label htmlFor='engine_select'>
              <p>API engine version:</p>
              <input
                type='text'
                readOnly={true}
                id='engine_select'
                name='engine_select'
                value={chatGptEngine}
                onClick={handleClickEngineSelect}
              />
            </label>

            {showEngineList && (
              <div className='language-select-list'>
                {engines.map(engine => (
                  <div
                    key={engine}
                    className='searchOption'
                    onClick={() => handleEngineOptionSelected(engine)}>
                    {engine}
                  </div>
                ))}
              </div>
            )}
          </div>

          <label htmlFor='chatgpt_apikey'>
            <p>OpenAI API key:</p>
            <input
              type='password'
              id='chatgpt_apikey'
              name='chatgpt_apikey'
              value={apiKey}
              onChange={handleChangeApiKey}
            />
          </label>
          <div className='modal-info-container'>
            <a
              href='https://platform.openai.com/account/api-keys'
              target='_blank'>
              Get an API key from OpenAI website
            </a>
          </div>

          <div className='repo-link-container'>
            <a
              href='https://gitlab.com/dsim/tldraid'
              target='_blank'>
              <div id='repo_link'></div>
            </a>
          </div>
          <p>v{APP_VERSION}</p>
        </div>
      </div>
    </>
  );
};

export default Modal;
