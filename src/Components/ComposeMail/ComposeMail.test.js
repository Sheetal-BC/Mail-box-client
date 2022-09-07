import { render as rtlRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ComposeMail from "./ComposeMail";
import store from "../store/index";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("Auth component", () => {
    test('render message text', ()=>{
        render(<ComposeMail />);
        const messageText = screen.getByText(/new message/i);
        expect(messageText).toBeInTheDocument();
    })
     test("render enter message text", () => {
       render(<ComposeMail />);
       const enterText = screen.getByText(/enter message/i);
       expect(enterText).toBeInTheDocument();
     });

    test("render send text", () => {
         render(<ComposeMail />);
         const sendText = screen.getByText(/send/i);
         expect(sendText).toBeInTheDocument();
    });

     test("renders subject text", () => {
          render(<ComposeMail />);
          const placeHolderElement = screen.getByPlaceholderText(/subject/i);
          expect(placeHolderElement).toBeInTheDocument();
    });

    test("renders send button text", () => {
      render(<ComposeMail />);
      const sendElement = screen.getByRole("button", {
        name: /send/i,
      });
      expect(sendElement).toBeInTheDocument();
    });
       
});
