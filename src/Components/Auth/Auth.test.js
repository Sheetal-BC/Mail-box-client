import { render, screen } from "@testing-library/react";
import Auth from "./Auth";


describe('Auth component', () => {

 test('renders email text', () => {
  render(<Auth />);
  const placeHolderElement = screen.getByPlaceholderText(/Email/i);
  expect(placeHolderElement).toBeInTheDocument();
});  

test("renders login text", () => {
  render(<Auth />);
  const loginElement = screen.queryByText(/login/i);
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

test("renders password text", () => {
  render(<Auth />);
  const textElement = screen.getByText(/SignUp/i);
  expect(textElement).toBeInTheDocument();
}); 

});

