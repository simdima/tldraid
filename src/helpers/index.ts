import { LOCAL_STORAGE_KEY } from '../@types';

function loadFromLocalStorage<T>(key: LOCAL_STORAGE_KEY): T | null {
  try {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      return JSON.parse(savedValue);
    }

    return null;
  } catch (error) {
    console.error(error);

    return null;
  }
}

function saveToLocalStorage(key: LOCAL_STORAGE_KEY, value: string) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

function sortUtilities(source: string[], term: string) {
  return source.sort((util1, util2) => {
    if (util1 === term) return -1;
    if (util2 === term) return 1;

    if (util1.startsWith(term)) {
      return util2.startsWith(term) ? util1.localeCompare(util2) : -1;
    }

    if (util2.startsWith(term)) return 1;

    return util1.localeCompare(util2);
  });
}

export { loadFromLocalStorage, saveToLocalStorage, sortUtilities };
