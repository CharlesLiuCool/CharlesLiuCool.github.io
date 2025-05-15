<script lang="ts">
	export let title: string;
	export let award_class: string;
	export let description: string;
	export let link: string;
</script>

<div class="project-item">
	<h2>{title}</h2>
	<!--Award/Class-->
	<h3>{award_class}</h3>
	<p>{description}</p>
	{#if link}
		<div class="project-details">
			<a href={link}>More Details...</a>
		</div>
	{/if}
</div>