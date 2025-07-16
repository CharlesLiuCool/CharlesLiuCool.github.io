<script lang="ts">
	import { onMount } from 'svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Experience from '$lib/components/Experience/Experiences.svelte';
	import Projects from '$lib/components/Projects/Projects.svelte';
	import About from '$lib/components/About/About.svelte';
	import CV from '$lib/components/CV.svelte';

</script>

<Cursor />
<main class="page-container">
	<Hero />
	<Experience />
	<Projects />
	<About />
	<CV />
</main>
