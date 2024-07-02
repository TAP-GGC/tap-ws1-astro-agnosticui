import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import agnosticAstro from 'agnosticui-astro';
import mdx from '@astrojs/mdx';


export default defineConfig({
	integrations: [vue(), agnosticAstro(),mdx()],
});
