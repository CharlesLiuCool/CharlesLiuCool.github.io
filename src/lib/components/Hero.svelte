<script lang="ts">
	import { onMount } from 'svelte';

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

<section class="background">
	<div 
		class="black-box"
		style="width: {70 * expansionScale - 10}vw;">
	</div>

	<div class="center-left" style="left: {textLeft}%">
		<h1>CHARLES LIU</h1>
		<p>Computer Science and Mathematics Major<br />at Washington State University</p>
	</div>

	<div class="menu-container" style="left: {textLeft + 8}%">
		<a href="#about" class="menu-item">About</a>
		<a href="#projects" class="menu-item">Projects</a>
		<a href="#CV" class="menu-item">CV</a>
	</div>
</section>
