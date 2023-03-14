import React from 'react'
import EventItem from '../components/EventItem';
import { json, redirect, useRouteLoaderData } from 'react-router-dom';

const EventDetailPage = () => {
  const data = useRouteLoaderData('event-detail');

  return (
    <>
      <EventItem event={data.event}/>
    </>
  )
}

export default EventDetailPage;

export async function loader({request, params}) {
  const res = await fetch(`http://localhost:8080/events/${params.eventId}`);

  if(!res.ok) {
    throw json({message: 'Could not fetch details for event.'}, {status: 500});
  } else {
    return res;
  }
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