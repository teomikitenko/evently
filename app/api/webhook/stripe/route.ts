const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
const endpointSecret = "whsec_77ba44543863e0c12b5515baff68c8a4c35df3b6269f5bd2ddd95a15b49731ea";


export async function POST(request:Request) {
    const sig = request.headers.get('stripe-signature')
    console.log(sig)
    return new Response('Success!', {
        status: 200,
      })
}