import { Guitar } from './types/data';

export const getFormattedPrice = (price: number): string => (
  `${price.toLocaleString() } ₽`
);

const filterNameByQuery = (name: string, query: string): boolean => {
  const lowerCaseName = name.toLowerCase();
  const lowerCaseQuery = query.toLowerCase();
  const indexFind = lowerCaseName.indexOf(lowerCaseQuery);
  return indexFind !== -1;
};

export const getFilteredOffersByName = (query: string, offers: Guitar[]): Guitar[] => {
  const trimmedQuery = query.replace(/^\s+/, '');
  if (!trimmedQuery) {
    return [];
  }
  return offers.filter(({ name }) => filterNameByQuery(name, trimmedQuery));
};

export const getMinMaxPrice = (offers: Guitar[]) => {
  const minPrice = Math.min(...offers.map(({ price }) => price));
  const maxPrice = Math.max(...offers.map(({ price }) => price));
  return { minPrice, maxPrice };
};
