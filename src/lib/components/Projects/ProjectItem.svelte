<script lang="ts">
	export let title: string;
	export let award_class: string;
	export let description: string;
	export let link: string;
	export let imageURL: string;

	let hovering = false;
</script>

<div 
  class="project-item"
  on:mouseenter={() => hovering = true}
  on:mouseleave={() => hovering = false}
  role="group"
>
	<div class="project-text">
		<h2>{title}</h2>
		<h3>{award_class}</h3>
		<p>{description}</p>
	</div>
	<img
		src={imageURL}
		alt={`Screenshot or image of project titled ${title}`}
		class="hover-image"
		class:visible={hovering}
	/>
</div>