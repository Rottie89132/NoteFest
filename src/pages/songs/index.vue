<template>
	<div v-if="!delayload">
		<div v-if="songs.length > 0" class="grid md:mt-0 grid-rows-1 gap-2 overflow-auto mt-14">
			<songCard v-for="song in songs" :song="song" :album="getAlbum(song.albumId)" :key="song.title" />
		</div>
		<div v-else class="flex justify-center items-center h-[calc(100vh-4rem)]">
			<p class="text-lg text-neutral-100">Geen nummers gevonden</p>
		</div>
	</div>
</template>

<script setup>
	import { ref, watch, computed } from "vue";
	import { useSongData } from "../../Composables/useSongData";
	import { useAlbumData } from "../../Composables/useAlbumData";
	import { useRoute } from "vue-router";

	import songCard from "../../components/songCard.vue";

	const invoer = ref("");
	const route = useRoute();
	const songs = ref([]);
	const albums = ref([]);
	const delayload = ref(true);

	invoer.value = route.query.title;
	let songData = useSongData(false, false, invoer.value);
	songs.value = songData;

	const albumData = useAlbumData();
	albums.value = albumData;

	const getAlbum = computed(() => (albumId) => albums.value.find((album) => album.id === albumId));

	const loading = () => {
		delayload.value = true;
		setTimeout(() => {
			delayload.value = false;
		}, 700);
	};

	watch(
		() => route.query.title,
		(newTitle) => {
			invoer.value = newTitle;
			songData = useSongData(false, false, invoer.value);
			songs.value = songData;
			loading();
		}
	);

	loading();
</script>
