<template>
	<div v-if="!delayload" class="md:flex w-full gap-4 mt-14">
		<div class="w-full xs:w-fit h-fit max-w-96 max-h-96 rounded-lg overflow-hidden">
			<div class="relative rounded-lg border-2 border-neutral-900">
				<div v-if="!loading">
					<img :src="songs[0].image" alt="Album" class="w-full md:w-[21rem] h-[21rem] object-cover z-10 rounded-lg" />
				</div>
				<div v-else>
					<div class="animate-pulse w-full md:w-[21rem] h-[21rem] rounded-lg"></div>
				</div>
				<div class="absolute inset-0 z-20 flex items-center justify-center rounded-lg">
					<div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex items-end rounded-lg">
						<div class="p-4">
							<p class="text-neutral-100 text-2xl font-bold text-balance">{{ album.title }}</p>
							<div class="flex gap-2 items-center">
								<img :src="artist.image" alt="Artist" class="w-5 h-5 rounded-full" />
								<p class="text-neutral-100 text-lg opacity-85 font-semibold text-balance">{{ artist.title }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="md:w-[75%]">
			<div class="grid mt-2 md:mt-0 grid-rows-1 gap-2 overflow-auto">
				<songCard v-for="song in songs" :song="song" :album="album" :key="song.title" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useSongData } from "../../Composables/useSongData";
	import { useAlbumData } from "../../Composables/useAlbumData";
	import { useArtistData } from "../../Composables/useArtistData";
	import { ref, watchEffect, computed } from "vue";
	import { useRoute } from "vue-router";
	import { usePlayerStore } from "../../stores/player.js";

	import songCard from "../../components/songCard.vue";

	const playerStore = usePlayerStore();
	const currentState = ref();

	watchEffect(() => {
		currentState.value = playerStore.currentTrack;
	});

	const songs = ref([]);
	const album = ref([]);
	const artist = ref([]);
	const route = useRoute();
	const loading = ref(true);
	const delayload = ref(true);

	album.value = useAlbumData(route.query.title);
	songs.value = useSongData(album.value.id, album.value.artist);
	artist.value = useArtistData(album.value.artist);

	playerStore.trackList = songs.value.map(song => {
		return {
			...song,
			artwork: album.value.image
		};
	});

	setTimeout(() => {
		delayload.value = false;
		setTimeout(() => {
			loading.value = false;
		}, 200);
	}, 500);
</script>
