<script lang="ts">
	import Item from '../ProjectItem.svelte';
	import { onMount } from 'svelte';
	import { color } from '../../../styles/colors';

	const projects = [
		{
			title: 'Snowpack AI (SAI)',
			award_class: 'SciKit optimize, TensorFlow, Kamiak HPC, Matplotlib',
			description: '',
			link: '/SAI',
			imageURL: '/images/SAI/SAI_icon.png',
			style: color.red,
		},
		{
			title: 'Optimizer\'s Inc.',
			award_class: 'SciPy, Pandas, Matplotlib',
			description: '',
			link: '/OptimizersInc',
			imageURL: '/images/OptimizersInc/OptimizersInc_icon.png',
			style: color.orange,
		},
		{
			title: 'DecoSavvy',
			award_class: '3rd place WSU CrimsonCode Hackathon',
			description: '',
			link: '/DecoSavvy',
			imageURL: '/images/DecoSavvy/DecoSavvy_icon.png',
			style: color.yellow,
		},
		{
			title: 'Coming Soon!',
			award_class: '',
			description: '',
			link: '/',
			imageURL: '/images/DecoSavvy/DecoSavvy_icon.png',
			style: color.green,
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
		<div class="projects-grid">
			{#each projects as project}
				<Item {...project} />
			{/each}
		</div>
	</div>
</section>