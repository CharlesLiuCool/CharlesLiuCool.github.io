<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let mouseX = 0;
	let mouseY = 0;
	let currentX = 0;
	let currentY = 0;
	let cursor: HTMLElement | null;

	onMount(() => {
		const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
		if (isTouchDevice) return;

		cursor = document.getElementById("circularcursor");

		function animate() {
			if (!cursor) return;
			currentX += (mouseX - currentX) * 0.35;
			currentY += (mouseY - currentY) * 0.35;

			cursor.style.left = `${currentX}px`;
			cursor.style.top = `${currentY}px`;

			requestAnimationFrame(animate);
		}

		document.body.addEventListener("mousemove", (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;

			const ghost = document.createElement("div");
			ghost.className = "ghost";
			ghost.style.left = `${e.clientX}px`;
			ghost.style.top = `${e.clientY - 20}px`;
			ghost.addEventListener("animationend", () => ghost.remove());

			document.body.appendChild(ghost);
		});

		animate();
	});
</script>

<div id="cursor-container">
	<div id="circularcursor"></div>
</div>