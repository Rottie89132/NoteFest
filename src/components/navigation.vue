<template>
	<div>
		<div class="p-3 bg-neutral-900 fixed top-0 px-7 w-full z-50">
			<div class="flex justify-between z-50 items-center">
				<div>
					<h1 class="text-lg font-semibold">{{ $route.name === "zoeken" ? "Zoeken" : $route.path == "/songs" ? "Nummers" : $route.query.title ? "Album" : "Albums" }}</h1>
					<p v-if="$route.path == '/songs'" class="-mt-1 text-sm opacity-70">Alle nummers gefilterd op "{{ $route.query.title }}"</p>
					<p v-else class="-mt-1 text-sm opacity-70">{{ $route.query.title ? "Alle nummers van " + $route.query.title : "Overzicht met alle albums" }}</p>
				</div>
				<div class="flex items-center gap-2">
					<div @click="ToonZoekbalk" class="bg-indigo-600 p-2 rounded-2xl">
						<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" /></svg>
					</div>
					<router-link to="/" class="bg-indigo-600 p-2 rounded-2xl opacity-50">
						<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" /></svg>
					</router-link>
				</div>
			</div>
		</div>
		<Transition name="fade">
			<div class="fixed w-full top-0 z-40 mt-14 bg-neutral-900 px-7 p-3" v-if="toonbalk">
				<form @submit.prevent="Zoeken">
					<input type="text" v-model="invoer" class="w-full bg-neutral-800 text-neutral-100 p-2 px-3 mt-2 rounded-2xl outline-none appearance-none" placeholder="Zoeken..." />
				</form>
			</div>
		</Transition>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useRouter } from "vue-router";

	const router = useRouter();
	const toonbalk = ref(false);
	const invoer = ref("");

	const ToonZoekbalk = () => {
		toonbalk.value = !toonbalk.value;
	};

	const Zoeken = (event) => {
		router.push({ name: "songs", query: { title: invoer.value || null } });
		event.target.reset();
		invoer.value = "";
		toonbalk.value = false;
	};
</script>

<style scoped>
	.router-link-active {
		@apply opacity-100;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.8s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		transform: translateY(-4em);
	}
</style>
