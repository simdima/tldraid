# What's Changed

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
