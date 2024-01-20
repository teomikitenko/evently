export const dynamic = 'force-dynamic'
const stripe = require('stripe')('sk_test_...');

export async function POST(request:Request){
  const sig = await request.text()

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, process.env.NEXT_PUBLIC_WEBHOOK_SECRET!);
  } catch (err) {
    return new Response(`Webhook error: ${err!}`, {
        status: 400,
      })    
  }

   // Handle the event
   switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      console.log(`Checkout session completed ${checkoutSessionCompleted}`);
      // Then define and call a function to handle the event checkout.session.completed
      break;
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
