import { getCollection } from 'astro:content';

const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;

// Fetch the projects and build the tech counts
const events = await getCollection('events');
let eventIds = {};

// Build tech counts from the events
events.forEach(event => {
  // Add the computed slug here
  event.data.slug = `${base}/events/${event.data.year}/${event.data.semester}/${event.data.id}`;
  eventIds[event.data.id] = event;
});

export default eventIds;