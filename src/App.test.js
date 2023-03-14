import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: {id: 1, name: 'John'}
    })
  }
}))

test("username should be shown", () => {
  render(<App />)
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl).toBeInTheDocument();
});

test("Input should be shown", () => {
  render(<App />)
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button should be shown", () => {
  render(<App />)
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).toHaveTextContent(/login/i)
});

test("username value should be empty", () => {
  render(<App />)
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl.value).toBe("");
});

test("password value should be empty", () => {
  render(<App />)
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should be disabled", () => {
  render(<App />)
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).toBeDisabled()
});

test("button shouldn't dispaly loading", () => {
  render(<App />)
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).not.toHaveTextContent(/loading/i)
});

test("Error shouldn't be visible", () => {
  render(<App />)
  const errorMsg = screen.getByTestId(/error/i);

  expect(errorMsg).not.toBeVisible();
})

test("username value should change", () => {
  render(<App />)
  const usernameInputEl = screen.getByPlaceholderText(/username/i);

  const textValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: textValue }});
  expect(usernameInputEl.value).toBe(textValue);
});

test("password value should change", () => {
  render(<App />)
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const textValue = "test"

  fireEvent.change(passwordInputEl, { target: { value: textValue}})
  expect(passwordInputEl.value).toBe(textValue);
});

test("button shouldn't be disable", () => {
  render(<App />)
  const buttonEl = screen.getByRole('button');
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);

  const textValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: textValue } })
  fireEvent.change(passwordInputEl, { target: { value: textValue } });
  
  expect(buttonEl).not.toBeDisabled()
});

test("button should dispaly loading", () => {
  render(<App />)
  const buttonEl = screen.getByRole('button');
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);

  const textValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: textValue } })
  fireEvent.change(passwordInputEl, { target: { value: textValue } });
  
    fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent(/loading/i)
});

test("button shouldn't dispaly loading after fetching", async() => {
  render(<App />)
  const buttonEl = screen.getByRole('button');
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);

  const textValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: textValue } })
  fireEvent.change(passwordInputEl, { target: { value: textValue } });
    fireEvent.click(buttonEl);

  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/loading/i))
});

test("user should dispaly after fetching", async() => {
  render(<App />)
  const buttonEl = screen.getByRole('button');
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);

  const textValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: textValue } })
  fireEvent.change(passwordInputEl, { target: { value: textValue } });
    fireEvent.click(buttonEl);


  const userItem = await screen.findByText("John")

  expect(userItem).toBeInTheDocument()
});