import stripe from 'stripe'
import { NextResponse } from 'next/server'

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

   // Handle the event
   switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      return NextResponse.json({ message: 'OK', data:checkoutSessionCompleted})
    // ... handle other event types
     default:
      console.log(`Unhandled event type ${event.type}`); 
  }

  // Handle the event
/*   console.log(`Unhandled event type ${event.type}`); */
  return new Response('Success!', {
    status: 200,
  })
  
};
