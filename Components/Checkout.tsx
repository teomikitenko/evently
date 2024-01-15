"use client";
import { loadStripe } from "@stripe/stripe-js";
import type { Event } from "@/configs/types/types";
import { useEffect } from "react";
import { checkout } from "@/app/action";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = ({ event }: { event: Event }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);
  const submitHandler = async () => {
    await checkout(event.event);
  };
  return (
    <form action={submitHandler}>
      <button type="submit">Send</button>
    </form>
  );
};

export default Checkout;
