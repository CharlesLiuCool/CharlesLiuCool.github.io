<script lang="ts">
	import Item from '../StandardItem.svelte';
	import { onMount } from 'svelte';
    import { color } from '../../../styles/colors';

	const experiences = [
		{
			title: 'Software Engineer Intern',
			award_class: 'Schweitzer Engineering Laboratories',
			description: 'Machine learning algorithm using SciKit optimize\'s random forest to predict snow-water equivalent values based on real geospatial and meteorological data with 96%+ NSE.',
			link: '/SAI',
			imageURL: '',
            style: color.azure,
		},
	];

	let titleVisible = false;
	let titleElement: HTMLElement;

	//experiences fade animation
	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				titleVisible = entry.isIntersecting;
			},
			//if 10% or more the word is showing, do animation
			{ threshold: 0.1 }
		);

		if (titleElement) observer.observe(titleElement);

		return () => observer.disconnect(); // Clean up on destroy
	});
</script>

<section id="experience">
	<div class="experience">
		<h1 bind:this={titleElement} class:fade-in-visible={titleVisible}>EXPERIENCE</h1>
		{#each experiences as experience}
			<Item {...experience}/>
		{/each}
	</div>
</section>
