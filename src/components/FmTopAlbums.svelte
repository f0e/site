<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { Album } from "@utils/lastfm";
  import { fetchTopAlbums } from "@utils/lastfm";

  export let username: string;
  export let apiKey: string;
  export let limit: number = 9;

  let albums: Album[] = [];
  let error: string | null = null;
  let loading = true;

  function getAlbumImage(album: Album): string | undefined {
    return (
      album.image.find((img) => img.size === "large")?.["#text"] ||
      album.image[album.image.length - 1]?.["#text"]
    );
  }

  onMount(async () => {
    try {
      albums = await fetchTopAlbums(username, apiKey, limit);
    } catch (e) {
      error = e instanceof Error ? e.message : "Unknown error";
    } finally {
      loading = false;
    }
  });
</script>

<noscript>
  <p class="text-neutral-500">Unavailable (needs JavaScript)</p>
</noscript>

<div class="requires-js">
  {#if error}
    <p class="text-red-600">{error}</p>
  {:else if loading}
    <p class="text-neutral-500">Loading...</p>
  {:else if albums.length === 0}
    <p class="text-neutral-500">No albums found</p>
  {:else}
    <div
      class="not-prose inline-grid place-items-center grid-cols-3 gap-[min(12px,2vw)] w-full"
      in:fade={{ duration: 500 }}
    >
      {#each albums as album}
        {@const image = getAlbumImage(album)}

        <a
          href={album.url}
          target="_blank"
          rel="noopener noreferrer"
          class="relative group aspect-square overflow-hidden w-full"
        >
          {#if image}
            <img
              src={image}
              alt={`${album.name} by ${album.artist.name}`}
              loading="lazy"
              class="w-full h-full object-cover fade-in"
            />
          {:else}
            <div
              class="w-full h-full flex flex-col items-center justify-center text-center text-neutral-300"
            >
              <p>{album.name}</p>
              <p class="opacity-50">{album.artist.name}</p>
            </div>
          {/if}

          <div
            class="absolute inset-0 bg-black opacity-0 group-hover:opacity-90 flex items-center justify-center p-4"
          >
            <div class="text-center text-white pointer-events-none">
              <p class="font-semibold text-sm mb-1">{album.name}</p>
              <p class="text-xs text-neutral-300 mb-1">
                {album.artist.name}
              </p>
              <p class="text-xs text-neutral-400">
                {album.playcount} plays
              </p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>
