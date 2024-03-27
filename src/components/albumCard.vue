<template>
	<div v-if="!loading">
		<router-link :to="{ name: 'album', query: { title: album.title } }">
			<div class="bg-neutral-900 p-3 rounded-lg">
				<div class="">
					<img :src="album.image" :alt="album.title" class="w-full h-40 object-cover rounded-sm" />
				</div>
				<div class="my-2">
					<h2 class="text-lg font-bold leading-4 text-neutral-100 truncate">{{ album.title }}</h2>
					<p class="text-neutral-100 text-sm truncate">{{ album.artist }}</p>
				</div>
			</div>
		</router-link>
	</div>
	<div v-else>
		<div class="bg-neutral-900 p-3 rounded-lg">
			<div class="animate-pulse">
				<div class="bg-neutral-800 w-full h-40 rounded-sm"></div>
				<div class="my-2">
					<div class="bg-neutral-800 w-3/4 h-4 rounded-sm"></div>
					<div class="bg-neutral-800 w-1/2 h-4 rounded-sm"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		album: Object,
		loading: Boolean,
	});
</script>
