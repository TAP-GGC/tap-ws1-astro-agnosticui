/* Component for making project searches faster and easier. Returns dictionary/hash of projects by their IDs */
import { getCollection } from 'astro:content';

const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;

// Fetch the projects and build the tech counts
const faculty = await getCollection('instructors');
let facultyIds = {};

// Build tech counts from the projects
faculty.forEach(instructors => {
  // Add the computed slug here
  instructors.data.slug = `${base}/instructors/${instructors.data.id}`;
  facultyIds[instructors.data.id] = faculty;
});

export default facultyIds;