<template>
	<Transition name="fade">
		<div v-if="currentState != 'start' && track" class="fixed w-full left-0 bottom-0 p-2">
			<div :class="currentState == 'paused' || currentState == 'refresh' ? ' bg-indigo-700' : 'bg-blue-700'"
				class=" rounded-lg pt-1 p-2 transition-colors">
				<div class="flex justify-between">
					<div class="flex gap-4 items-center">
						<div class="w-10 h-10 rounded-sm overflow-hidden">
							<img :src="track.image" alt="Album" class="w-full h-full object-cover" />
						</div>
						<div class="my-2">
							<h2 class="text-lg font-bold leading-4 text-neutral-100 text-balance">{{ track.title }}</h2>
							<p class="text-neutral-100 opacity-80 text-sm text-balance">{{ track.artist }}</p>
						</div>
					</div>
					<div>
						<button v-if="currentState == 'paused'"
							class="h-full w-16 flex justify-end items-center rounded-lg" @click="resumeSong">
							<svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
								viewBox="0 0 24 24">
								<path fill="currentColor"
									d="M10 15.577L15.577 12L10 8.423zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21" />
							</svg>
						</button>
						<button v-else-if="currentState == 'playing'"
							class="h-full w-16 flex justify-end items-center rounded-lg" @click="pauseSong">
							<svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
								viewBox="0 0 24 24">
								<path fill="currentColor"
									d="M9 16h2V8H9zm4 0h2V8h-2zm-1 6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22" />
							</svg>
						</button>
						<button v-else class="h-full w-16 flex justify-end items-center rounded-lg" @click="playSong">
							<svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
								viewBox="0 0 24 24">
								<path fill="currentColor"
									d="M10 15.577L15.577 12L10 8.423zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21" />
							</svg>
						</button>
					</div>
				</div>
				<div class="relative -mb-1 w-full">
					<div class="flex items-center justify-between w-full">
						<div class="flex justify-between gap-2 items-center w-full">
							<div class="relative w-full">
								<div :class="currentState == 'paused' || currentState == 'refresh' ? ' bg-indigo-900' : 'bg-blue-900'"
									class="overflow-hidden h-1 rounded-md text-xs flex transition-colors">
									<div :style="{ width: progressPercentage + '%', transition: 'width 0.3s ease' }"
										class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
	import { usePlayerStore } from "../stores/player";
	import { ref, watchEffect, computed } from "vue";

	const playerStore = usePlayerStore();
	const currentState = ref("start");
	const progress = ref(null);
	const track = ref(null);

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
		playerStore.play(track.value);
	};

	const pauseSong = () => {
		playerStore.pause();
	};

	const resumeSong = () => {
		playerStore.resume();
	};

</script>

<style scoped>

	.fade-enter-active,
	.fade-leave-active {
		transition: all 1s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		transform: translateY(12em);
	}
</style>
