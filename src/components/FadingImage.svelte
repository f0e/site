<script lang="ts">
  export let image: string = "";
  export let alt: string = "";
  export let className: string = "";

  interface Image {
    src: string;
    opacity: number;
  }

  let images: Image[] = [];

  function setImageLoaded(image: Image) {
    if (images.indexOf(image) != images.length - 1) {
      return;
    }

    image.opacity = 1;
    images = images; // trigger re-render
  }

  function removeImage(image: Image) {
    images = images.filter((img) => img !== image);
  }

  $: if (image) {
    if (images.at(-1)?.src !== image) {
      for (const image of images) {
        image.opacity = 0;
      }

      images.push({ src: image, opacity: 0 });
      images = images; // trigger re-render
    }
  }
</script>

<div class="relative">
  {#each images as image, i (image.src)}
    <img
      src={image.src}
      {alt}
      loading="lazy"
      on:load|once={() => setImageLoaded(image)}
      on:transitionend={(e) => {
        if (image.opacity === 0) {
          removeImage(image);
        }
      }}
      class={`${i > 0 ? "absolute inset-0" : ""} transition-opacity duration-500 ${className}`}
      style:opacity={image.opacity}
    />
  {/each}
</div>
