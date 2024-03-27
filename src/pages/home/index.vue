<template>
	<div v-if="!delayload">
		<div :class="currentState != 'start' ? ' mb-16' : ''"
			class="grid grid-rows-2 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 overflow-auto">
			<div v-for="(album, index) in albums">
				<albumCard :album="album" :loading="loading" :key="album.title" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, watchEffect } from "vue";
	import { useAlbumData } from "../../Composables/useAlbumData.js";
	import { usePlayerStore } from "../../stores/player.js";

	import albumCard from "../../components/albumCard.vue";

	const albums = ref([]);
	albums.value = useAlbumData();

	const playerStore = usePlayerStore();
	const currentState = ref("start");
	const loading = ref(true);
	const delayload = ref(true);

	watchEffect(() => {
		currentState.value = playerStore.isState;
	});

	setTimeout(() => {
		delayload.value = false;
		setTimeout(() => {
			loading.value = false;
		}, 500);
	}, 350);
</script>
