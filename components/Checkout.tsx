"use client";
import { loadStripe } from "@stripe/stripe-js";
import type { Event, Buyer } from "@/configs/types/types";
import { useUser } from "@clerk/nextjs";
import { Button } from "@mantine/core";
import { useEffect } from "react";
import { checkout } from "@/app/action";
import { buyers } from "@/configs/db";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = ({ event }: { event: Event }) => {
  const { user } = useUser();
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
    const check = {
      event: event.event,
      user: user?.fullName,
    };
    await checkout(check);
  };
  return (
    <form action={submitHandler}>
      <button className="px-6 py-3 rounded-3xl bg-[rgb(98,76,245)]">
        <p className="text-sm text-white">Buy Ticket</p>
      </button>
    </form>
  );
};

export default Checkout;
