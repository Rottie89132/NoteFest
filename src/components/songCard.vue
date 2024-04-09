<template>
	<div :class="[currentState != 'start' && track && track.title == song.title ? 'bg-blue-700' : 'bg-neutral-900', currentState == 'paused' || (currentState == 'refresh' && track && track.albumId == song.albumId) ? ' bg-indigo-700' : '']" class="p-3 py-1 rounded-xl transition-colors" @click="currentState == 'playing' && track && track.title == song.title ? pauseSong() : currentState == 'paused' && track && track.title == song.title ? resumeSong() : playSong()">
		<div class="flex justify-between">
			<div class="flex gap-4 items-center w-full">
				<div class="my-2 w-full">
					<h2 class="text-lg font-bold leading-4 text-neutral-100 text-balance">{{ song.title }}</h2>
					<p class="text-neutral-100 opacity-80 text-sm text-balance">{{ song.artist }}</p>
				</div>
			</div>
		</div>
		<div>
		</div>
		<div v-if="currentState != 'start' && track && track.title == song.title" class="w-full -mt-2">
			<div class="flex justify-between gap-2 items-center w-full">
				<p>{{ formatTime(progress.currentTime) }}</p>
				<div class="w-full mt-[0.15rem]">
					<div :class="currentState == 'paused' || (currentState == 'refresh' && track && track.albumId == song.albumId) ? ' bg-indigo-900' : 'bg-blue-900'" class="h-2 rounded-full overflow-hidden transition-colors">
						<div class="h-full bg-white" :style="{ width: progressPercentage + '%', transition: 'width 0.3s ease' }"></div>
					</div>
				</div>
				<p>-{{ formatTime(progress.duration - progress.currentTime || 0) }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { usePlayerStore } from "../stores/player";
	import { ref, watchEffect, computed } from "vue";

	const playerStore = usePlayerStore();
	const currentState = ref("start");
	const progress = ref(null);
	const track = ref(null);
	const props = defineProps({
		song: Object,
		album: Object,
	});

	const progressPercentage = computed(() => {
		if (progress.value && progress.value.duration > 0) return (progress.value.currentTime / progress.value.duration) * 100;
		return 0;
	});

	watchEffect(() => {
		track.value = playerStore.currentTrack;
		currentState.value = playerStore.isState;
		progress.value = playerStore.progres;
	});

	const playSong = () => {
		playerStore.play({
			...props.song,
			album: props.album.title,
			artwork: props.album.image,
		});
	};

	const pauseSong = () => {
		playerStore.pause();
		navigator.mediaSession.playbackState = "paused";
	};

	const resumeSong = () => {
		playerStore.resume();
		navigator.mediaSession.playbackState = "playing";
	};

	const forward = () => {
		playerStore.seekForward();
	};

	const backward = () => {
		playerStore.seekBackward();
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};
</script>
