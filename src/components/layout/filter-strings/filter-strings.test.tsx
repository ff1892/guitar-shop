import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FilterStrings from './filter-strings';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: FilterType', () => {

  const store = mockStore({
    STATE_FILTER: {
      filterType: [],
      filterStrings: [],
      filterPrice: { minPrice: '', maxPrice: '' },
    },
    STATE_PAGE: {
      page: 1,
    },
  });

  const fakeFilterStrings = (
    <Provider store={store}>
      <Router history={history}>
        <FilterStrings />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeFilterStrings);
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
  });
});
