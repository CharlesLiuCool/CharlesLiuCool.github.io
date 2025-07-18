<script lang="ts">
	import Item from '../StandardItem.svelte';
	import { onMount } from 'svelte';
    import { color } from '../../../styles/colors';

	const experiences = [
		{
			title: 'Software Engineer Intern',
			award_class: 'Schweitzer Engineering Laboratories',
			description: 'Implemented new features and resolved bugs in a 100,000+ line React/TypeScript codebase for a prototype internal power engineering design software with minimal dependencies to enhance engineer workflow efficiency. Collaborated with team of ~10 engineers on-site through Git and Jira in Agile sprints to deliver features biweekly',
			link: '/SAI',
			imageURL: '../images/SEL_logo.jpg',
			width: 25,
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
