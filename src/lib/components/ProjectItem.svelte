<script lang="ts">
	export let title: string;
	export let award_class: string;
	export let description: string;
	export let link: string;
	export let imageURL: string;
    export let style: string;

	let hovering = false;
</script>

<div class="item-wrapper">
    <div
    class="item"
    on:mouseenter={() => hovering = true}
    on:mouseleave={() => hovering = false}
    role="group"
    style={`--shadow-color: ${style}; border: 2px solid ${style};`}
    >
        <div class="item-text">
            <a href={link}>
                <h2>{title}</h2>
            </a>
            <img src={imageURL} alt="Project Image" class="item-image" style="width: 150px; height: auto;"/>
            <h3>{award_class}</h3>
            <p>{description}</p>
        </div>
    </div>
</div>