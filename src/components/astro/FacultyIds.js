/* Component for making project searches faster and easier. Returns dictionary/hash of projects by their IDs */
import { getCollection } from 'astro:content';

const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;

// Fetch the projects and build the tech counts
const instructors = await getCollection('instructors');
let facultyIds = {};

// Build tech counts from the projects
instructors.forEach(instructor => {
  // Add the computed slug here
  instructor.data.slug = `${base}/instructors/${instructor.data.id}`;
  facultyIds[instructor.data.id] = instructor;
});

export default facultyIds;