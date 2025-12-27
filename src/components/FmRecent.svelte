<script lang="ts">
	import { onMount } from "svelte";
	import { slide, fade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import RecentTrack from "./RecentTrack.svelte";
	import type { Track } from "../utils/lastfm";
	import { fetchRecentTracks, getTrackId } from "../utils/lastfm";

	export let username: string;
	export let apiKey: string;
	export let limit: number = 5;
	export let pollInterval: number = 10000;

	let currentTrack: Track | undefined;
	let tracks: Track[] = [];

	let loading = true;
	let error: string | null = null;
	let loadedOnce = false;

	const updateTracks = async () => {
		if (!loadedOnce) {
			loading = true;
			error = null;
		}

		try {
			const newTracks = await fetchRecentTracks(username, apiKey, limit);

			tracks = newTracks.filter((track) => !track["@attr"]?.nowplaying);
			currentTrack = newTracks.find(
				(track) => track["@attr"]?.nowplaying,
			);

			loadedOnce = true;
		} catch (e) {
			error = e instanceof Error ? e.message : "Unknown error";
			console.error("Error fetching recent tracks:", e);
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		updateTracks();
		const pollTimer = setInterval(updateTracks, pollInterval);
		return () => clearInterval(pollTimer);
	});
</script>

<noscript>
	<p class="text-neutral-500">Unavailable (needs JavaScript)</p>
</noscript>

<div class="requires-js">
	{#if loading}
		<p class="text-neutral-500">Loading...</p>
	{:else if error}
		<p class="text-red-600">{error}</p>
	{:else}
		<div in:fade={{ duration: 500 }}>
			{#if currentTrack}
				<RecentTrack track={currentTrack} />
			{/if}

			{#each tracks as track (getTrackId(track))}
				<div
					in:slide={{ duration: 500 }}
					out:fade={{ duration: 500 }}
					animate:flip={{ duration: 300 }}
				>
					<RecentTrack {track} />
				</div>
			{/each}

			{#if tracks.length === 0 && !currentTrack}
				<p class="text-neutral-500">No recent tracks found.</p>
			{/if}
		</div>
	{/if}
</div>
