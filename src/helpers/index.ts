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

function sortUtilities(source: string[] = [], term: string) {
  const filtered = source.filter(util => new RegExp(`^${term.trim()}.*`, 'gi').test(util));

  return term.length > 2 ? filtered : filtered.slice(0, 20);
}

export { loadFromLocalStorage, saveToLocalStorage, sortUtilities };
