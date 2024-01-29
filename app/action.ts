'use server'
import Stripe from 'stripe';
import { revalidatePath } from 'next/cache'
import { addEvent,deleteEvent,updateEvent} from "@/configs/db"
import { redirect } from "next/navigation";
import type { Buyer } from '@/configs/types/types';
import type Event from '@/components/Event';
import { FileObject } from "@supabase/storage-js";


export async function create(formData:FormData) {
  try {
    let result = await addEvent(formData)
     revalidatePath('/')   
     return result 
   
  } catch (error) {
    throw error
  }
}

export async function update({id,form,prevImage,prevImageName}:{id:string,form:FormData,prevImage?:FileObject,prevImageName:string}) {
    await updateEvent(id,form,prevImage,prevImageName)
    revalidatePath('/')   
  }


export async function checkout({event,user}:{event:Event['event'],user:Buyer['name']}){
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

    const {title,category,price,id,free} =  event
    const currentPrice = free?0:Number(price)*100
     try {
       const session = await stripe.checkout.sessions.create({
        line_items:[
          { 
            price_data:{
              currency:'usd',
              unit_amount:currentPrice,
              product_data:{
                name:title!
              }
            },
            quantity:1
          },
        ],
        metadata:{
          id_event:id,
          name:user!
        },  
        mode:'payment',
        success_url:`${process.env.NEXT_PUBLIC_SERVER_URL!}/profile`,
        cancel_url:`${process.env.NEXT_PUBLIC_SERVER_URL!}`,
        }); 
        redirect(session.url!)
  } catch (error) {
 throw error      
  }  

  }
  export async function deleteEventsId(id:string){
  try {
    await deleteEvent(id)
    revalidatePath('/','layout')
  } catch (error) {
    throw error
  }
  }