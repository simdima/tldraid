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

export { sortUtilities };
