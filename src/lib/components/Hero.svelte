<script lang="ts">
	export let expansionScale: number;
	export let textLeft: number;
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
