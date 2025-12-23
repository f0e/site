<script lang="ts">
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import RecentTrack from './RecentTrack.svelte';
	import type { Track } from '../utils/lastfm';
	import { fetchRecentTracks, getTrackId } from '../utils/lastfm';

	export let username: string;
	export let apiKey: string;
	export let limit: number = 5;
	export let pollInterval: number = 10000;

	let currentTrack: Track | undefined;
	let tracks: Track[] = [];

	const updateTracks = async () => {
		try {
			const newTracks = await fetchRecentTracks(username, apiKey, limit);

			tracks = newTracks.filter((track) => !track['@attr']?.nowplaying);
			currentTrack = newTracks.find((track) => track['@attr']?.nowplaying);
		} catch (error) {
			console.error('error fetching recent tracks:', error);
		}
	};

	onMount(() => {
		updateTracks();

		const pollTimer = setInterval(updateTracks, pollInterval);
		return () => clearInterval(pollTimer);
	});
</script>

<div>
	{#if currentTrack}
		<RecentTrack track={currentTrack} />
	{/if}

	{#each tracks as track (getTrackId(track))}
		<div in:slide={{ duration: 500 }} out:fade={{ duration: 500 }} animate:flip={{ duration: 300 }}>
			<RecentTrack {track} />
		</div>
	{/each}
</div>
