<script lang="ts">
	import { onMount } from 'svelte';

	let scrollY = 0;
	let expansionScale = 1;
	let maxScroll = 1;
	const minScale = 1;
	const maxScale = 2.3;

	const maxTextRight = 30;
	let textRight = maxTextRight;

	const maxTextScale = 50;

	function handleScroll() {
		scrollY = window.scrollY;
		const progress = 2 * scrollY / maxScroll;

		expansionScale = Math.min(maxScale, minScale + (maxScale - minScale) * progress);
		// Instead of increasing value like left, decrease right from maxTextRight to minimum
		textRight = Math.max(0, maxTextRight - (maxTextRight * progress));
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

	let titleVisible = false;
	let titleElement: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				titleVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);

		if (titleElement) observer.observe(titleElement);
		return () => observer.disconnect();
	});
</script>


<section id="about">
	<div 
		class="black-box-about"
		style="width: {70 * expansionScale - 10}vw;">
		<div class="about" style="right: {textRight}%">
			<h1 bind:this={titleElement} class:fade-in-visible={titleVisible}>ABOUT</h1>
			<p>Hi, I'm Charles! I am an avid learner interested <br> in computer science and mathematics. <br>In my free time, I enjoy birdwatching, <br>playing chess, and geography.</p>
		</div>
	</div>
</section>
