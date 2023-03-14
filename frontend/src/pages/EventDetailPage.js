import React, { Suspense } from 'react'
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { Await, defer, json, redirect, useRouteLoaderData } from 'react-router-dom';

const EventDetailPage = () => {
  const {event, events} = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense>
        <Await resolve={event}>
          {loadedEvent => <EventItem event={loadedEvent}/> }
          
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={events}>
          {loadedEvents => <EventsList events={loadedEvents}/>}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetailPage;

async function loadEvent(id) {
  const res = await fetch(`http://localhost:8080/events/${id}`);

  if(!res.ok) {
    throw json({message: 'Could not fetch details for event.'}, {status: 500});
  } else {
    const resData = await res.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

   if (!response.ok) {
    throw json({ message: 'Could Not Fetch Events'}, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }  
}

export async function loader({request, params}) {
  const res = await fetch(`http://localhost:8080/events/${params.eventId}`);

  return defer({
    event: loadEvent(params.eventId),
    events: loadEvents()
  })
};

export async function action({request, params}) {
  const eventId = params.eventId;

  const res = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method
  });

  if(!res.ok) {
    throw json({message: 'Could not delete event.'}, {status: 500});
  } 

  return redirect('/events');
};