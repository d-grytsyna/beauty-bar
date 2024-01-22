import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

//add your stripe public key
const stripePromise = loadStripe('');

root.render(
  <BrowserRouter>
      <Elements stripe={stripePromise}>
      <App />
      </Elements>
  </BrowserRouter>
);

