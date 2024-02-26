import { useCallback, useEffect, useState } from 'react';
import ISO6391 from 'iso-639-1';
import { sendApiRequest } from '../api';
import { APP_VERSION, ChatGptEngine, LanguagesResponse } from '../@types';
import './Modal.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  changeChatGptApiKey,
  changeChatGptEngine,
  changeLanguage,
  selectSettingsChatGptApikey,
  selectSettingsChatGptEngine,
  selectSettingsLanguage,
} from '../store/reducers/settingsSlice';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const Modal = ({ setShowModal, setError }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const language = useAppSelector(selectSettingsLanguage);
  const chatGptEngine = useAppSelector(selectSettingsChatGptEngine);
  const chatGptApiKey = useAppSelector(selectSettingsChatGptApikey);

  const [languagesList, setLanguagesList] = useState<string[]>([]);
  const [showLanguagesList, setShowLanguagesList] = useState(false);

  const engines: ChatGptEngine[] = ['gpt-3.5-turbo', 'gpt-4'];
  const [showEngineList, setShowEngineList] = useState(false);

  const [apiKey, setApiKey] = useState(chatGptApiKey);

  useEffect(() => {
    (async () => {
      try {
        const response = await sendApiRequest<LanguagesResponse>('/languages');

        if ('error' in response) {
          throw new Error(response.error);
        }

        setLanguagesList(response.data);
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
    dispatch(changeChatGptApiKey(apiKey));

    setShowLanguagesList(false);
    setShowEngineList(false);
    setShowModal(false);
  }, [setShowLanguagesList, setShowEngineList, setShowModal, dispatch, apiKey]);

  function handleClickLangSelect() {
    setShowEngineList(false);
    setShowLanguagesList(sll => !sll);
  }

  function handleClickEngineSelect() {
    setShowLanguagesList(false);
    setShowEngineList(sel => !sel);
  }

  function handleChangeLanguage(selectedOption: string) {
    dispatch(changeLanguage(selectedOption));

    setShowLanguagesList(false);
  }

  function handleChangeChatGptEngine(engine: ChatGptEngine) {
    dispatch(changeChatGptEngine(engine));

    setShowEngineList(false);
  }

  function handleChangeChatGptApiKey({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    setApiKey(value);
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
                value={ISO6391.getName(language)}
                onClick={handleClickLangSelect}
              />
            </label>
            {showLanguagesList && (
              <div className='language-select-list'>
                {languagesList.map(
                  lang =>
                    // skip options that have no entry in ISO-6391 library
                    ISO6391.getName(lang) && (
                      <div
                        key={lang}
                        className='searchOption'
                        onClick={() => handleChangeLanguage(lang)}>
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
                    onClick={() => handleChangeChatGptEngine(engine)}>
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
              onChange={handleChangeChatGptApiKey}
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
