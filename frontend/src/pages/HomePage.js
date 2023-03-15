import React, {Suspense} from 'react'
import { useLoaderData, json, defer, Await } from 'react-router-dom'
import PageContent from '../components/PageContent'
import EventsList from '../components/EventsList'

const HomePage = () => {
  const {events} = useLoaderData();
  
  return (
    <PageContent title={'Welcome!'}>
      <Suspense fallback={<p style={{ textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents}/>}
        </Await>
      </Suspense>
    </PageContent>
  )
}

export default HomePage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

   if (!response.ok) {
    throw json({ message: 'Could Not Fetch Events'}, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }  
}

export function loader() {
  return defer({
    events: loadEvents()
  })
}


