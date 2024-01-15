import {FileObject} from '@supabase/storage-js'
import {Tables} from './supabase'

export type DB = {
    events:Tables<'events'>[],
    storage:FileObject[]
}
export type Event = {
    event:Tables<'events'>,
    storage:FileObject[]|null
}