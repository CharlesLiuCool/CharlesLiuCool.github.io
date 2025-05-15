<script lang="ts">
	import { onMount } from 'svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects/Projects.svelte';

	let scrollY = 0;
	let expansionScale = 1;
	let maxScroll = 1;
	const maxTextScale = 50;
	let textLeft = 21 * expansionScale - 15;
	const minScale = 1;
	const maxScale = 2.3;

	function handleScroll() {
		scrollY = window.scrollY;
		const progress = 2 * scrollY / maxScroll;
		expansionScale = Math.min(maxScale, minScale + (maxScale - minScale) * progress);
		textLeft = Math.min(maxTextScale, 21 * expansionScale - 15);
	}

	onMount(() => {
		const updateMaxScroll = () => {
			maxScroll = document.documentElement.scrollHeight - window.innerHeight;
		};

		updateMaxScroll();
		handleScroll();

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', updateMaxScroll);
	});
</script>

<Cursor />
<main class="page-container">
	<Hero {expansionScale} {textLeft} />
	<section id="about"></section>
	<section id="CV"></section>
	<Projects />
</main>
