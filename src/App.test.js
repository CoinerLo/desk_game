import React from 'react';
import './firebaseConfig';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders main element and title', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByTestId('html-element-main')).toBeInTheDocument();
  expect(await screen.findByText('Добро пожаловать!')).toBeVisible();
});
