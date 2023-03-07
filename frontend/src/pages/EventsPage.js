import React from 'react'
import { Link } from 'react-router-dom';

const Events = [
    {id: 'e1', title: 'Event 1'},
    {id: 'e2', title: 'Event 2'},
    {id: 'e3', title: 'Event 3'},
]

const EventsPage = () => {
  return (
    <>
        <h1>EventsPage</h1>
        <div>
            <ul>
                {Events.map(event => <li key={event.id}><Link to={event.id}>{event.title}</Link></li>)}
            </ul>
        </div>
    </>
  )
}

export default EventsPage;