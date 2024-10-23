import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders signup and login buttons', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const signupButton = screen.getByText(/SignUp/i);
  const loginButton = screen.getByText(/Login/i);
  expect(signupButton).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});
