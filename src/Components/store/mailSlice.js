import { createSlice } from "@reduxjs/toolkit";

const initialMail = {
  sendMessageIsOpen: false,
  mailItem: [],
  openMessage: null,
  openText: true,
  inboxMails: [],
  sentMails: [],
};
export const mailSlice = createSlice({
  name: "mail",
  initialState: initialMail,
  reducers: {
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    addNewMails: (state, action) => {
      state.mailItem = action.payload;
    },
    getDetailOnClick: (state, action) => {
      state.openMessage = action.payload;
    },
    getInboxMails: (state, action) => {
      state.inboxMails = action.payload;
    },
    getSendMails: (state, action) => {
      state.sentMails = action.payload;
    },
  },
});
export const {
  openSendMessage,
  closeSendMessage,
  addNewMails,
  getInboxMails,
  getDetailOnClick,
  getSendMails,
} = mailSlice.actions;

export default mailSlice.reducer;
