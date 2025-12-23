<script lang="ts">
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition'; // import fade
	import { flip } from 'svelte/animate';
	import RecentTrack from './RecentTrack.svelte';
	import type { Track } from '../utils/lastfm';
	import { fetchRecentTracks, getTrackId } from '../utils/lastfm';

	export let username: string;
	export let apiKey: string;
	export let limit: number = 5;
	export let pollInterval: number = 30000;
	export let initialTracks: Track[] = [];

	let tracks: Track[] = [...initialTracks];

	const updateTracks = async () => {
		try {
			tracks = await fetchRecentTracks(username, apiKey, limit);
			console.log('updated tracks', tracks);
		} catch (error) {
			console.error('Error fetching tracks:', error);
		}
	};

	onMount(() => {
		const pollTimer = setInterval(updateTracks, pollInterval);
		return () => clearInterval(pollTimer);
	});
</script>

<div>
	{#each tracks as track (getTrackId(track))}
		<div in:slide={{ duration: 500 }} out:fade={{ duration: 500 }} animate:flip={{ duration: 300 }}>
			<RecentTrack {track} />
		</div>
	{/each}
</div>
