import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeStore } from '../../utils/mocks';
import { createApi } from '../../services/api';
import { State } from '../../types/state';
import { AppRoute } from '../../constants';
import App from './app';


const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


function getFakeApp(): JSX.Element {
  const fakeStore = getFakeStore();
  const store = mockStore(fakeStore);
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
}

describe('Application routing', () => {
  it('should render MainPage when user navigates to "/"', () => {
    history.push(AppRoute.Main);
    render(getFakeApp());
    expect(screen.getByTestId(/root page/i)).toBeInTheDocument();
  });
  it('should render NotFoundPage when user navigates to incorrect route', () => {
    history.push('/incorrect');
    render(getFakeApp());

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти на главную страницу/i)).toBeInTheDocument();
  });
});
