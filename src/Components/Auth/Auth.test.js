import { render as rtlRender, screen } from "@testing-library/react";
import Auth from "./Auth";
import { Provider } from 'react-redux';
import store from "../store/index";

const render = component => rtlRender(
<Provider store={store}>
 {component}
</Provider>
)

describe('Auth component', () => {

 test('renders email text', () => {
  render(<Auth />);
  const placeHolderElement = screen.getByPlaceholderText(/Email/i);
  expect(placeHolderElement).toBeInTheDocument();
});  

test("renders login text", () => {
  render(<Auth />);
  const loginElement = screen.queryByText(/logging/i);
  expect(loginElement).not.toBeInTheDocument();
});

test("renders password text", () => {
  render(<Auth />);
  const placePasswordHolderElement =
    screen.getByPlaceholderText(/Confirm Password/i);
  expect(placePasswordHolderElement).toBeInTheDocument();
}); 

test("renders alt text", () => {
  render(<Auth />);
  const altElement = screen.getByAltText(/mail/i);
  expect(altElement).toBeInTheDocument();
}); 

test("renders login text", () => {
  render(<Auth />);
  const loginTextElement = screen.getByText(/Login/i);
  expect(loginTextElement).toBeInTheDocument();
}); 

test("renders button text", () => {
  render(<Auth />);
  const buttonElement = screen.getByRole("button", {
    name: /sign up/i,
  });
  expect(buttonElement).toBeInTheDocument();
});

test("renders login button text", () => {
  render(<Auth />);
  const loginElement = screen.getByRole("button", {
    name: /login/i,
  });
  expect(loginElement).toBeInTheDocument();
});

test("renders signin text", () => {
  render(<Auth />);
  const loginElement = screen.queryByText(/signin/i);
  expect(loginElement).not.toBeInTheDocument();
});

test("renders password in login text", () => {
  render(<Auth />);
  const passwordLoginElement = screen.getByRole("textbox");
  expect(passwordLoginElement).toBeInTheDocument();
}); 

test("renders password in login text", () => {
  render(<Auth />);
  const passwordLoginElement = screen.getByRole("img", {
  name: /mail/i,
});
  expect(passwordLoginElement).toBeInTheDocument();
}); 


});

