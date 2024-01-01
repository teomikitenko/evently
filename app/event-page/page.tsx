import React from 'react'
import Event from '@/Components/Event'
import { getImage,getDataEvent } from '@/configs/db'

const EventPage = async() => {
  const img = await getImage() 
 const data = await getDataEvent() 
  return (
    <section className=' px-10  py-9'>
      <Event image={img}/>
    </section>
  )
}

export default EventPage