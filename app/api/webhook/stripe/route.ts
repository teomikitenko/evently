import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { buyers } from "@/configs/db";
import type { Buyer } from '@/configs/types/types';


export  async function POST(request:Request){
  const body = await request.text()
  let event;
  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.NEXT_PUBLIC_WEBHOOK_SECRET as string
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook error: ${err!}`, {
        status: 400,
      })    
  }
   switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      const order:Buyer = {
        event_id:checkoutSessionCompleted.metadata?.id_event as string,
        name:checkoutSessionCompleted.metadata?.name as string,
        order_id:checkoutSessionCompleted.id as string,
      }
      const data = await buyers(order)
      return NextResponse.json({ message: 'OK', data:data})
     default:
      console.log(`Unhandled event type ${event.type}`); 
  }
  return new Response('Success!', {
    status: 200,
  })
  
};


