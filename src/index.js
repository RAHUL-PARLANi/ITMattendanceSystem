import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import usersReducer from "./features/user";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { GoogleOAuthProvider } from '@react-oauth/google';
import attendanceAdmin from './features/attendanceAdmin';

const store = configureStore({
  reducer: {
    users: usersReducer,
    attendanceMod:attendanceAdmin
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='634927151835-vqs5lvcit044kv34im1brabdjrr78voi.apps.googleusercontent.com'>
    <Provider store={store}>
    <App />
   </Provider>
   </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
