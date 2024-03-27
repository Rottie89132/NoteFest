<template>
	<div>
		<div class="absolute z-30 m-2 bg-neutral-800 border-2 border-neutral-900 rounded-md p-2 flex items-center justify-center">
			<router-link to="/" class="text-neutral-100 text-lg font-bold">
				<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
					<path fill="currentColor" d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875q-.375.375-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75q0-.375.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388q.375.375.375.875t-.375.875z" />
				</svg>
			</router-link>
		</div>
		<div class="w-full xs:w-fit h-fit max-w-96 max-h-96 rounded-lg overflow-hidden">
			<div class="relative rounded-lg border-2 border-neutral-900">
				<div v-if="!loading">
					<img :src="songs[0].image" alt="Album" class="w-full h-[21rem] object-cover z-10 rounded-lg" />
				</div>
				<div v-else>
					<div class="animate-pulse w-full h-[21rem] rounded-lg"></div>
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
		<div class="grid mt-2 grid-rows-1 gap-2 overflow-auto">
			<songCard v-for="song in songs" :song="song" :album="album" :key="song.title" />
		</div>
		<!-- <div v-if="!load">
			<activeAlbum v-if="currentState.albumId != songs[0].albumId" />
		</div> -->
	</div>
</template>

<script setup>
	import { useSongData } from "../../Composables/useSongData";
	import { useAlbumData } from "../../Composables/useAlbumData";
	import { useArtistData } from "../../Composables/useArtistData";
	import { ref, watchEffect } from "vue";
	import { useRoute } from "vue-router";
	import { usePlayerStore } from "../../stores/player.js";

	import songCard from "../../components/songCard.vue";

	const playerStore = usePlayerStore();
	const currentState = ref();

	watchEffect(() => {
		currentState.value = playerStore.currentTrack;
	});

	const songs = ref([]);
	const album = ref(null);
	const artist = ref(null);
	const route = useRoute();
	const loading = ref(true);

	album.value = useAlbumData(route.query.title);
	songs.value = useSongData(false, album.value.artist);
	artist.value = useArtistData(album.value.artist);

	setTimeout(() => {
		loading.value = false;
	}, 200);
</script>
