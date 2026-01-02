<script lang="ts">
import { getImageData, getTimeAgo, type Track } from "@utils/lastfm";
import FadingImage from "./FadingImage.svelte";

export let track: Track;

$: isNowPlaying = track["@attr"]?.nowplaying === "true";
$: ({ srcset } = getImageData(track));

$: artistName = track.artist["#text"];
$: albumName = track.album["#text"];
$: artist_url = `https://www.last.fm/music/${artistName.replace(/ /g, "+")}`;
</script>

<div
  class={`not-prose flex items-center gap-4 text-xs p-2 outline-black/20 dark:outline-white/20 ${isNowPlaying ? "outline-2 mb-1" : ""}`}
>
  {#if track.image.length}
    <div class="w-16 h-16 overflow-hidden">
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        class="no-underline"
      >
        <FadingImage
          image={track.image.at(-1)["#text"]}
          alt={`Cover art for ${artistName} - ${track.name}`}
        />
      </a>
    </div>
  {/if}

  <div class="flex-1">
    <p>
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
      >
        {track.name}
      </a>
    </p>

    <p class="opacity-60">
      <a
        href={artist_url}
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
      >
        {artistName}
      </a>
    </p>

    <p class="opacity-42">
      {isNowPlaying
        ? "Now playing"
        : track.date
          ? getTimeAgo(track.date.uts)
          : ""}
    </p>
  </div>
</div>
