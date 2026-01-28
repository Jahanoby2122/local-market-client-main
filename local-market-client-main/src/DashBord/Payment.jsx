import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Payment = () => {
  const { id } = useParams();  // প্রোডাক্ট আইডি নেওয়া হলো রাউটার থেকে

  return (
    <div className="">
    
      <Elements stripe={stripePromise}>
        <PaymentForm productId={id} />
      </Elements>
    </div>
  );
};

export default Payment;
