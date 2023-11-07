import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createStore } from '../redux/store';

/**
 * Render the given component with the necessary providers.
 *
 * @param {React.ReactElement} component - The component to render.
 * @param {ReturnType<typeof createStore>} injectedStore - An optional injected store. If not provided, a new store will be created.
 * @param {ReturnType<typeof createMemoryHistory>} injectedHistory - An optional injected history object. If not provided, a new memory history object will be created.
 * @return {Object} An object containing the store and history objects.
 */

export const renderWithProviders = (
  component: React.ReactElement,
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ? injectedStore : createStore();
  const history = injectedHistory ? injectedHistory : createMemoryHistory();
  render(
    <Router history={history}>
      <Provider store={store}>{component}</Provider>
    </Router>
  );
  return { store, history };
};
