<script lang="ts">
	import Item from '../StandardItem.svelte';
	import { onMount } from 'svelte';
    import { color } from '../../../styles/colors';
	let titleVisible = false;
	let titleElement: HTMLElement;

	const about = {
		title: 'Hi, I\'m Charles!',
		award_class: '',
		description: 'I am an incoming freshman at Washington State University studying computer science and mathematics. \nI\'m passionate about cryptography, software engineering, and mathematics. In my free time, I love birdwatching!',
		link: '/',
		imageURL: '../images/profile_picture.jpg',
		width: 20,
		style: color.azure,
	};

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

<section id="about">
	<div class="about">
		<h1 bind:this={titleElement} class:fade-in-visible={titleVisible}>ABOUT</h1>
			<Item {...about}/>
	</div>
</section>
