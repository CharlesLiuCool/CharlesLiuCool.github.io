<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

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

		// Cursor elements
		const cursor = document.getElementById("circularcursor") as HTMLElement | null;
		const cursorContainer = document.getElementById("cursor-container") as HTMLElement | null;

		let mouseX = 0;
		let mouseY = 0;
		let currentX = 0;
		let currentY = 0;

		if (cursor) {
			// Animate the custom cursor
			function animate() {
				if (!cursor) return;
				currentX += (mouseX - currentX) * 0.35;
				currentY += (mouseY - currentY) * 0.35;

				cursor.style.left = `${currentX}px`;
				cursor.style.top = `${currentY}px`;

				requestAnimationFrame(animate);
			}

			animate();

			// Mousemove logic
			document.body.addEventListener("mousemove", (e: MouseEvent) => {
				mouseX = e.clientX;
				mouseY = e.clientY;

				document.documentElement.style.setProperty('--x', `${e.clientX}px`);
				document.documentElement.style.setProperty('--y', `${e.clientY}px`);

				const ghost = document.createElement("div");
				ghost.className = "ghost";
				ghost.style.left = `${e.clientX}px`;
				ghost.style.top = `${e.clientY - 20}px`;
				document.body.appendChild(ghost);
				setTimeout(() => ghost.remove(), 700);
			});
		}

		// Scroll-triggered animation
		const target = document.querySelector(".projects h1") as HTMLElement | null;

		const scrollTrigger = () => {
			if (!target) return;

			const triggerY = window.innerHeight * 0.75;
			const targetTop = target.getBoundingClientRect().top;

			if (window.scrollY === 0) {
				target.classList.remove("fade-in-visible");
				target.style.animation = "none";
				void target.offsetWidth;
				target.style.animation = "";
			}

			if (targetTop < triggerY && !target.classList.contains("fade-in-visible")) {
				target.classList.add("fade-in-visible");
			}
		};

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('scroll', scrollTrigger);
		window.addEventListener('resize', updateMaxScroll);

		// Initial check
		scrollTrigger();

		onDestroy(() => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('scroll', scrollTrigger);
			window.removeEventListener('resize', updateMaxScroll);
		});
	});
</script>


<div id="cursor-container">
	<div id="circularcursor"></div>
</div>

<div class = "page-container">
	<section class="background">
		<div 
			class="black-box"
			style="width: {70 * expansionScale - 10}vw;">
		</div>
	
		<div 
			class="center-left"
			style="left: {textLeft}%">

			<h1>CHARLES LIU</h1>
			<p>Computer Science and Mathematics Major<br />at Washington State University</p>
		</div>
	
		<div 
			class="menu-container"
			style="left: {textLeft + 8}%">
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
			<div class="project-item">
				<h2>Project</h2>
				<p>Details</p>
			</div>
		</div>
	</section>
</div>
  