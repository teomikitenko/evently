'use server'
import { revalidatePath } from 'next/cache'
import { addEvent} from "@/configs/db"

export async function create(formData:FormData) {
    await addEvent(formData)
    revalidatePath('/') 
}