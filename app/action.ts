'use server'
import { revalidatePath } from 'next/cache'
import { addEvent} from "@/configs/db"
import { redirect } from "next/navigation";
import Event from '@/components/Event';
 const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function create(formData:FormData) {
    await addEvent(formData)
    revalidatePath('/') 
}
export async function checkout(event:Event['event']){
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