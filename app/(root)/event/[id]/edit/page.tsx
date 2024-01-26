import React from 'react'
import { getEvent } from '@/configs/db'
import EventForm from '@/components/EventForm'

const Edit = async({params}:{params:{id:string}}) => {
  const event = await getEvent(params.id)
  return (
    <section className="flex flex-col gap-4">
      <div className="dotted-bg py-14 px-10">
          <h3 className="text-4xl font-bold">Edit</h3> 
          </div>
      <div className="px-10 py-9 ">
        <EventForm edit eventEdit = {event} />
      </div>
    </section>
  )
}

export default Edit