<script>
	import { onMount, onDestroy } from 'svelte';

	let scrollY = 0;
	let expansionScale = 1;
	let maxScroll = 1; // Start with 1 to avoid divide-by-zero errors

	const minScale = 1;
	const maxScale = 2.3;

	function handleScroll() {
		scrollY = window.scrollY;
		const progress = scrollY / maxScroll;
		expansionScale = minScale + (maxScale - minScale) * progress;
		console.log(expansionScale);
	}

	onMount(() => {
		const updateMaxScroll = () => {
			maxScroll = document.documentElement.scrollHeight - window.innerHeight;
		};

		updateMaxScroll();
		handleScroll();

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', updateMaxScroll);

		// Cleanup
		onDestroy(() => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', updateMaxScroll);
		});
	});
</script>

<div class = "page-container">
	<section class="background">
		<div 
			class="black-box"
			style="width: {60 * expansionScale}vw;">
		</div>
	
		<div 
			class="center-left"
			style="left: {21*expansionScale - 15}%">

			<h1>CHARLES LIU</h1>
			<p>Computer Science and Mathematics Major<br />at Washington State University</p>
		</div>
	
		<div class="menu-container">
			<a href="#about" class="menu-item">About</a>
			<a href="#projects" class="menu-item">Projects</a>
			<a href="#CV" class="menu-item">CV</a>
		</div>
	</section>
  
	<section id="about"></section>
	<section id="CV"></section>
	<section id="projects">
	  <div class="projects">
		<h1>PROJECTS</h1>
		<div class="project-item">
		  <h2>Snowpack-Prediction Artificial Intelligence - SAI</h2>
		  <p>Details</p>
		</div>
		<div class="project-item">
		  <h2>DecoSavvy</h2>
		  <p>Details</p>
		</div>
	  </div>
	</section>
</div>
  