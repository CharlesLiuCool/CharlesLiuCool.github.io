<script>
    export let title;
    export let link;
    export let description;
    export let style;
    export let imageURL;
    export let width;

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
            <img src={imageURL} alt="icon" class="hover-icon" style={`width: ${width}vmin;`}/>
            <p>{@html description.replace(/\n/g, '<br>')}</p>
        </div>
    </div>
</div>