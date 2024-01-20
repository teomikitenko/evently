'use server'
import { revalidatePath } from 'next/cache'
import { addEvent} from "@/configs/db"
import { redirect } from "next/navigation";
import type { Buyer } from '@/configs/types/types';
import type Event from '@/components/Event';
 const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function create(formData:FormData) {
  try {
    await addEvent(formData)
    revalidatePath('/')  
  } catch (error) {
    throw error
  }
}
export async function checkout({event,user}:{event:Event['event'],user:Buyer['name']}){
    const {title,category,price,id,free} =  event
    const currentPrice = free?'0':Number(price)*100
     try {
      const session = await stripe.checkout.sessions.create({
        success_url:`${process.env.NEXT_PUBLIC_SERVER_URL!}/profile`,
        cancel_url:`${process.env.NEXT_PUBLIC_SERVER_URL!}`,
        mode:'payment',
      line_items:[
        { 
            quantity:1,
          price_data:{
            currency:'usd',
            unit_amount:currentPrice,
            product_data:{
              name:title
            }
          }
        }
      ],
        });
        redirect(session.url!)
  } catch (error) {
 throw error      
  }  

  }