import { useEffect, useState } from 'react';
import ISO6391 from 'iso-639-1';
import { sendApiRequest } from '../api';
import { GptEngine, LanguagesResponse } from '../@types';
import './Modal.scss';

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  chatGptApiKey: string;
  setChatGptApiKey: React.Dispatch<React.SetStateAction<string>>;
  chatGptEngine: string;
  setChatGptEngine: React.Dispatch<React.SetStateAction<GptEngine>>;
};

const Modal = ({
  showModal,
  setShowModal,
  selectedLanguage,
  setSelectedLanguage,
  chatGptApiKey,
  setChatGptApiKey,
  chatGptEngine,
  setChatGptEngine,
}: Props): JSX.Element => {
  const [langList, setLangList] = useState<string[]>([]);
  const [showLangList, setShowLangList] = useState(false);

  const [showEngineList, setShowEngineList] = useState(false);

  const engines = ['gpt-3.5-turbo', 'gpt-4'] as const;

  useEffect(() => {
    (async () => {
      try {
        const response = await sendApiRequest<LanguagesResponse>('/languages');
        if (response) {
          setLangList(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function hideModal() {
    setShowLangList(false);
    setShowEngineList(false);
    setShowModal(false);
  }

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
    setChatGptApiKey(e.target.value);
  }

  return (
    <>
      {showModal && (
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
                value={chatGptApiKey}
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
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
