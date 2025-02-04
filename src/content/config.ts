// 1. Import utilities from `astro:content`
import { z, defineCollection, getCollection } from 'astro:content';
import AboutTAP from '../pages/aboutTAP.astro';

// 2. Define your collection(s)
const eventCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: ({ image }) => z.object({
    title: z.string(),
    id: z.string(),
    tags: z.array(z.string()),
    semester: z.string(),
    year: z.number(),
    eventDate: z.string().datetime().transform((str) => new Date(str)),
    students: z.array(z.string()).optional(), /* do a refine check like in projects */
    instructors: z.array(z.string()).optional(), /* do a refine check like in projects */
    projects: z.array(z.string().refine(
      async (projectId) => {
        const projects = await getCollection('projects');

        return projects.some(project => project.data.id.toLowerCase() == projectId)        
      },
      (projectId) => ({ message: `Project ID '${projectId}' not found.` }))).optional(),
    image: z.string().optional(),
    images: z.array(z.object({
      src: image().refine((img) => img.width <= 1500, {
          message: "Image too large! Convert images to be less than 1500 pixels wide.",
        }), 
      alt: z.string() })).optional(),
  }),
});
const imageLogoValidator = (img) => Math.abs(img.width / img.height - 1) < 0.2;
const imageLogoValidatorMsg = (img) => ({
  message: `Logo image must be close to square aspect ratio!\n${img.src} is ${img.width}x${img.height}.`,
});
const projectCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema:({ image }) => z.object({
    shortTitle: z.string().optional(),
    title: z.string(),
    id: z.string(),
    desc: z.string(),
    github: z.string().optional(),
    students: z.array(z.string()),
    instructors: z.array(z.string()),
    curator: z.array(z.string()).optional(),
    techs: z.array(z.string()),
    videos: z.array(z.object({
      src: z.string(), 
      caption: z.string() }).optional()).optional(),
    tags: z.array(z.string()).optional(),
    levels: z.array(z.string()),      // most projects will be appropriate for all audiences, but otherwise it could be specified
    difficulty: z.array(z.string()), // project could be set up to be at different difficulties
    durationMins: z.array(z.number()),
    events: z.array(z.string()).optional(),
    semester: z.string(),
    year: z.number(),
    publishedDate: z.date(),
    relatedIds: z.array(z.string()).optional(),
    imageLogoLight: image().refine(imageLogoValidator, imageLogoValidatorMsg), // mandatory
    imageLogoDark: image().refine(imageLogoValidator, imageLogoValidatorMsg).optional(),
    imageLogoTrans: image().refine(imageLogoValidator, imageLogoValidatorMsg).optional(), // In case older project does not have logos
    imageTeam: image().refine((img) => img.width >= 500, {
      message: "Cover image must be at least 500 pixels wide!",
      // This part of the config file needs to be reviewed and changed at a later date.
    }).optional(),
    videoAd: z.string().optional(),
    images: z.array(z.object({
      src: image().refine((img) => img.width <= 1500, {
          message: "Image too large! Convert images to be less than 1500 pixels wide.",
        }), 
      alt: z.string() })).optional(),
  }),
});

const studentCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: ({ image }) => z.object({
    id: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    title: z.string().optional().nullable(),
    email: z.string().email().nullable(),
    phone: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    website: z.string().url().optional().nullable(),
    linkedin: z.string().url().optional().nullable(),
    github: z.string().url().optional().nullable(),
    image: image().refine(imageLogoValidator, imageLogoValidatorMsg).optional().nullable(),
    desc: z.string().optional().nullable(),
    graduationYear: z.string().nullable(),
    relatedProjectIds: z.array(z.string()).optional().nullable(),
    projects: z.array(z.string().refine(
      async (projectId) => {
        const projects = await getCollection('projects');

        return projects.some(project => project.data.id.toLowerCase() == projectId)        
      },
      (projectId) => ({ message: `Project ID '${projectId}' not found.` }))).optional().nullable(),
  }),
});

// Define faculty collection
const facultyCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    name: z.string().optional().nullable(),
    id: z.string().optional().nullable(),
    affiliation: z.string().optional().nullable(),
    title: z.string().optional().nullable(),
    email: z.string().email({ message: "Invalid email address" }).optional().nullable(),
    phone: z.string().optional().nullable(),
    website: z.string().url().optional().nullable(),
    linkedin: z.string().url().optional().nullable(),
    github: z.string().url().optional().nullable(),
    image: image().refine(imageLogoValidator, imageLogoValidatorMsg).optional().nullable(),
    desc: z.string().optional().nullable(),
    projects: z.array(z.string().refine(
      async (projectId) => {
        const projects = await getCollection('projects');

        return projects.some(project => project.data.id.toLowerCase() == projectId)        
      },
      (projectId) => ({ message: `Project ID '${projectId}' not found.` }))).optional().nullable(),
  }),
});

const aboutTAP = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    id: z.string(),
  })
})
const testCollection = defineCollection({
  type:'content',
  schema: z.object({
    title: z.string(),
    id:z.string(),
    publishedDate: z.date(),
  })
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'events': eventCollection,
  'projects': projectCollection,
  'students': studentCollection,
  'instructors': facultyCollection,
  'about': aboutTAP,
};
