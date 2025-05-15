<script lang="ts">
	import ProjectItem from './ProjectItem.svelte';
	import { onMount } from 'svelte';

	const projects = [
		{
			title: 'Snowpack-prediction Artificial Intelligence - SAI',
			award_class: '1st place 2025 AgAID Institute Agath0n Winner',
			description: 'Machine learning algorithm using SciKit optimize\'s random forest to predict snow-water equivalent values based on real geospatial and meteorological data with 96%+ NSE.',
			link: '/SAI',
			imageURL: '/images/SAI_cover.jpg'
		},
		{
			title: 'Supply Station Optimizer - Optimizer\'s Inc.',
			award_class: 'WSU MATH 464 - Linear Optimization (Dr. Tom Asaki)',
			description: 'Formulated linear optimization model to optimally place supply stations in Manhattan-style road grid. Factored in neighborhood populations and prevented placement on existing neighborhoods. Used Python, Pandas, and SciPy.',
			link: '/OptimizersInc',
			imageURL: '/images/SAI_cover.jpg'
		},
		{
			title: 'DecoSavvy',
			award_class: '3rd place WSU CrimsonCode Hackathon',
			description: 'Used Unity\'s AR Foundation to build a visual reality mobile application that lets users visualize furniture/decor before in the real world before making purchase decisions. Paired with custom Svelte website that let users shop for goods, mimicking online retail platforms.',
			link: '/DecoSavvy',
			imageURL: '/images/SAI_cover.jpg'
		},
	];

	let titleVisible = false;
	let titleElement: HTMLElement;

	//projects fade animation
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

<section id="projects">
	<div class="projects">
		<h1 bind:this={titleElement} class:fade-in-visible={titleVisible}>PROJECTS</h1>
		{#each projects as project}
			<ProjectItem {...project} />
		{/each}
	</div>
</section>
