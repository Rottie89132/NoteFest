<script setup>
	import navigation from "./components/navigation.vue";
	import mainContent from "./components/mainContent.vue";
	import activeAlbum from "./components/activeAlbum.vue";

	import { ref } from "vue";
	const fade = ref(null);
</script>

<template>
	<div>
		<mainContent>
			<router-view v-slot="{ Component }">
				<transition name="fade">
					<component :is="Component" />
				</transition>
			</router-view>
		</mainContent>
		<activeAlbum />
	</div>
</template>

<style>
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
