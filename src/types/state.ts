import { Guitar, GuitarNoComments, Coupon } from './data';
import { Sort, FilterPrice } from './components';
import { RootState } from '../store/reducers/root-reducer';

export type DataOffers = {
  totalCount: number,
  allOffers: Guitar[],
  isAllOffersLoaded: boolean,
  isAllOffersError: boolean,
  priceOffers: Guitar[],
  isPriceOffersLoaded: boolean,
  isPriceOffersError: boolean,
  similiarOffers: GuitarNoComments[],
  similiarOffersSearch: string,
  isSimiliarOffersLoaded: boolean,
  isSimiliarOffersError: boolean,
};

export type StateSort = {
  sort: Sort,
};

export type StateFilter = {
  filterType: string[],
  filterStrings: string[],
  filterPrice: FilterPrice,
};

export type StatePage = {
  page: number | null;
};

export type DataCurrentOffer = {
  currentOffer: Guitar | null,
  isCurrentOfferLoaded: boolean,
  isCurrentOfferError: boolean,
};

export type DataComment = {
  commentStatus: string,
};

export type DataCart = {
  cartOffers: Guitar[],
};

export type DataCoupon = {
  discount: number;
  coupon: Coupon,
  couponStatus: string,
};

export type State = RootState;
