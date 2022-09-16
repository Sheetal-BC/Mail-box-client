import { createSlice } from "@reduxjs/toolkit";

const initialMail = {
  sendMessageIsOpen: false,
  mailItem: [],
  openMessage: null,
};
export const mailSlice = createSlice({
    name : 'mail',
    initialState: initialMail,
    reducers: {
        openSendMessage : state => {
            state.sendMessageIsOpen = true;
        },
        closeSendMessage : state => {
            state.sendMessageIsOpen = false
        },
        addNewMails : (state , action) => {
                state.mailItem = action.payload;
        },
        getDetailOnClick : (state , action) => {
                state.openMessage = action.payload
        }

    },
});
export const { openSendMessage, closeSendMessage, addNewMails, getDetailOnClick } =
  mailSlice.actions;

export default mailSlice.reducer