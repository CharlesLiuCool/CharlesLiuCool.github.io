<script lang="ts">
    import { onMount } from 'svelte';
    const pdfUrl = 'CV/CV.pdf';
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

<section id="CV">
    <div class="CV">
      <h1 bind:this={titleElement} class:fade-in-visible={titleVisible}>CV</h1>
      <iframe
        title="CV"
        src={pdfUrl}
        class="pdf-frame"
      ></iframe>
    </div>
  </section>
    