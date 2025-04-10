/* Component for making project searches faster and easier. Returns dictionary/hash of projects by their IDs */
import { getCollection } from 'astro:content';

const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;

// Fetch the projects and build the tech counts
const students = await getCollection('students');
let studentIds = {};

// Build tech counts from the projects
students.forEach(student => {
  // Add the computed slug here
  student.data.slug = `${base}/students/${student.data.id}`;
  studentIds[student.data.id] = student;
});

export default { studentIds}