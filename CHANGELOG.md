# What's Changed

## 1.5.1 - 2024-06-06

### Fixed

- Missing intro component

## 1.5.0 - 2024-06-06

### Added

- Redux toolkit was completely dropped and replaced with [jotai](https://jotai.org/) due to unnecessarily complicated and boilerplate'y setup just for keeping track of app's global state
- Persistant storage is also handled by jotai now

### Fixed

- Chatbot icon getting in the way of last lines of content

## 1.4.0 - 2024-06-05

### Added

- RTK is now completely removed from the project in favor of React Query
- Multi staging build in Dockerfile (as a result docker image is now more than 50% smaller)

### Fixed

- Minor layout changes (e.g platform selector was moved inside the search field)
- Background not taking the full screen in Safari
- Removed all animations from the header for a cleaner feel

## 1.3.9 - 2024-05-08

### Added

- Swap yup library for [zod](https://zod.dev) for more fine-tuning and validation
- Make search term text always lowercase

### Fixed

- Utility links wrapping issues

## 1.3.8 - 2024-04-06

### Added

- All bot-related API calls are now handled by [React Query](https://tanstack.com/query)
- App error notification was moved from Redux store to its own context

### Fixed

- Refactored global error notification component to be more concise

## 1.3.7 - 2024-04-05

### Added

- Settings component is now lazy-loaded
- Loader component extracted to separate file
- eslint import/export sorting plugin

### Fixed

- Fetching utilities that are not in the Search dropdown
- Search component animations removed if search field is not empty and user switches between routes

## 1.3.3 - 2024-03-19

### Fixed

- Ollama server not found error when input field in invalid

## 1.3.2 - 2024-03-19

### Added

- Add [yup](https://www.npmjs.com/package/yup) for more silmpler Settings form validation

## 1.3.1 - 2024-03-19

### Added

- Local storage handling is deferred to [redux-persist](https://www.npmjs.com/package/redux-persist) library

## 1.3.0 - 2024-03-18

### Added

- Ability to use locally running Ollama LLM instead of OpenAI's ChatGPT bot

## 1.2.0 - 2024-03-15

### Added

- Adjusted HTTP queries for the newest version of tldrAId API

## 1.1.6 - 2024-03-10

### Added

- Possibility to remove ChatGPT answers from utility's description

## 1.1.5 - 2024-03-10

### Added

- Validation for Settings form (using [react-hook-form](https://react-hook-form.com))

## 1.1.4 - 2024-03-10

### Added

- Force dark mode of the app for all devices

### Fixed

- Make navbar links more intuitive

## 1.1.3 - 2024-03-08

### Added

- Chat bot answers for each utility are now saved until page reload

## 1.1.2 - 2024-03-08

### Fixed

- Favicon changed to .svg one

## 1.1.1 - 2024-03-08

### Fixed

- Colors are wrong on devices set to lightmode

## 1.1.0 - 2024-03-06

### Added

- Extensive refactoring of app's components
- TailwindCSS and Flowbite-React libraries for stying
- Redux-toolkit for state managment
- RTK-query for handling requests to API endpoints
- Navigation is now handled by react-router
- Custom logo
- New font

## 1.0.4 - 2023-07-20

### Added

- Close configuration modal by pressing Escape key
- Current release version in Modal component

### Fixed

- Modal close button colors
- Conditional rendering for Modal and Error components
- API key field triggering re-rendering of the App with onChange event
- Inconsistent naming for pieces of state

## 1.0.3 - 2023-07-19

### Added

- Save selected language to local storage

## 1.0.2 - 2023-07-17

### Added

- Search field transforms text to lower case

### Fixed

- Text is too big in GPTaddon portion of the app
- Animation inconsistencies

## 1.0.1 - 2023-07-16

### Added

- Repository with the source code link to Configuration modal

### Fixed

- Styling for phone screens

## 1.0.0 - 2023-07-16

### Added

- Initial version of the app
